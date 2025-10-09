import { useState, useEffect } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { User } from '../types/User'
import { createAuthError, createAPIError, handleGlobalError } from '../utils/errorHandler'
import { useErrorHandler } from './useErrorHandler'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addError } = useErrorHandler()

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      // Skip session check if Supabase is not configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        if (mounted) setLoading(false)
        return
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        if (session?.user && mounted) {
          await loadUserProfile(session.user)
        }
      } catch (err) {
        console.warn('Failed to get initial session:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    // Set loading to false immediately if no config, otherwise check session
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setLoading(false)
    } else {
      getInitialSession()
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user)
        setLoading(false)
        setError(null)
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        await loadUserProfile(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setLoading(false)
        setError(null)
      } else if (event === 'INITIAL_SESSION') {
        if (session?.user) {
          await loadUserProfile(session.user)
        }
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Loading user profile for:', supabaseUser.id);
      // Check if user profile exists
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle()

      console.log('Profile query result:', { profile, profileError });

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      if (!profile) {
        // Create new user profile with Pro plan by default
        const newProfile = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
          plan: 'pro' as const,
          recipes_generated_this_month: 0,
          last_reset_date: new Date().toISOString()
        }

        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert(newProfile)

        console.log('Profile insert result:', { insertError });

        if (insertError) throw insertError

        const userState = {
          id: newProfile.id,
          email: newProfile.email,
          name: newProfile.name,
          plan: newProfile.plan,
          createdAt: new Date(newProfile.last_reset_date),
          isAuthenticated: true,
          usageStats: {
            recipesGeneratedThisMonth: newProfile.recipes_generated_this_month,
            lastResetDate: new Date(newProfile.last_reset_date)
          }
        };
        console.log('Setting user state to:', userState);
        setUser(userState)
      } else {
        // Check if we need to reset monthly usage
        const now = new Date()
        const lastReset = new Date(profile.last_reset_date)
        
        let updatedProfile = profile
        if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
          // Reset monthly usage
          const { data: resetProfile, error: resetError } = await supabase
            .from('user_profiles')
            .update({
              recipes_generated_this_month: 0,
              last_reset_date: now.toISOString()
            })
            .eq('id', profile.id)
            .select()
            .single()

          if (resetError) throw resetError
          updatedProfile = resetProfile
        }

        const userState = {
          id: updatedProfile.id,
          email: updatedProfile.email,
          name: updatedProfile.name,
          plan: updatedProfile.plan,
          createdAt: new Date(updatedProfile.created_at),
          isAuthenticated: true,
          usageStats: {
            recipesGeneratedThisMonth: updatedProfile.recipes_generated_this_month,
            lastResetDate: new Date(updatedProfile.last_reset_date)
          }
        };
        console.log('Setting user state to:', userState);
        setUser(userState)
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
      const profileError = createAPIError(
        `Failed to load user profile: ${err}`,
        500,
        { action: 'loadUserProfile', userId: supabaseUser.id }
      )
      addError(profileError)
      setError(profileError.userMessage)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setError('Please connect to Supabase to enable authentication. Click the settings button to configure.')
        setLoading(false)
        return { success: false }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Load user profile immediately after sign in
      if (data.user) {
        await loadUserProfile(data.user)
      }

      setLoading(false)
      return { success: true }
    } catch (err) {
      let userMessage = "Authentication failed. Please check your credentials and try again.";

      if (err instanceof Error && err.message.includes('Invalid login credentials')) {
        userMessage = "Invalid email or password. Please try again.";
      }

      const signInError = createAuthError(
        `Sign in failed: ${err instanceof Error ? err.message : String(err)}`,
        { action: 'signIn', email },
        userMessage
      )
      addError(signInError)
      setError(signInError.userMessage)
      setLoading(false)
      return { success: false }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)

    try {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setError('Please connect to Supabase to enable authentication. Click the settings button to configure.')
        setLoading(false)
        return { success: false }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name: name,
            full_name: name
          }
        }
      })

      if (error) throw error

      // Check if user was created and signed in automatically (email confirmation disabled)
      if (data.user && data.session) {
        // User is signed in immediately - email confirmation is disabled
        await loadUserProfile(data.user)
        setLoading(false)
        return { success: true, autoSignedIn: true }
      }

      // Email confirmation required
      setError('Account created successfully! Please check your email for confirmation, then sign in.')
      setLoading(false)
      return { success: true, autoSignedIn: false }
    } catch (err) {
      let userMessage = "Sign up failed. Please try again.";

      if (err instanceof Error) {
        if (err.message.includes('Password should contain')) {
          userMessage = err.message;
        } else if (err.message.includes('User already registered')) {
          userMessage = "This email is already registered. Please sign in instead.";
        }
      }

      const signUpError = createAuthError(
        `Sign up failed: ${err}`,
        { action: 'signUp', email },
        userMessage
      )
      addError(signUpError)
      setError(signUpError.userMessage)
      setLoading(false)
      return { success: false }
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
    } catch (err) {
      const signOutError = createAuthError(
        `Sign out failed: ${err instanceof Error ? err.message : String(err)}`,
        { action: 'signOut' }
      )
      addError(signOutError)
      setError(signOutError.userMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateUsageStats = async (recipesGenerated: number) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          recipes_generated_this_month: recipesGenerated
        })
        .eq('id', user.id)

      if (error) throw error

      setUser({
        ...user,
        usageStats: {
          ...user.usageStats,
          recipesGeneratedThisMonth: recipesGenerated
        }
      })
    } catch (err) {
      const usageError = createAPIError(
        `Failed to update usage stats: ${err}`,
        500,
        { action: 'updateUsageStats', userId: user.id, recipesGenerated }
      )
      addError(usageError)
    }
  }

  const upgradeToPro = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ plan: 'pro' })
        .eq('id', user.id)

      if (error) throw error

      setUser({
        ...user,
        plan: 'pro'
      })
    } catch (err) {
      const upgradeError = createAPIError(
        `Failed to upgrade to pro: ${err}`,
        500,
        { action: 'upgradeToPro', userId: user.id }
      )
      addError(upgradeError)
      setError(upgradeError.userMessage)
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateUsageStats,
    upgradeToPro,
    setError
  }
}