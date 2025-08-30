import { useState, useEffect } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { User } from '../types/User'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        if (session?.user) {
          await loadUserProfile(session.user)
        }
      } catch (err) {
        console.error('Error getting initial session:', err)
        setError(err instanceof Error ? err.message : 'Failed to load session')
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
        await loadUserProfile(session.user)
        setLoading(false)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Check if user profile exists
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      if (!profile) {
        // Create new user profile
        const newProfile = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
          plan: 'free' as const,
          recipes_generated_this_month: 0,
          last_reset_date: new Date().toISOString()
        }

        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert(newProfile)

        if (insertError) throw insertError

        setUser({
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
        })
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

        setUser({
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
        })
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to load user profile')
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined,
          data: {
            name: name
          }
        }
      })
      
      if (error) throw error
      
      // Show success message for email confirmation
      setError('Please check your email and click the confirmation link to complete registration.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up')
    } finally {
      setLoading(false)
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
      setError(err instanceof Error ? err.message : 'Failed to sign out')
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
      console.error('Error updating usage stats:', err)
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
      console.error('Error upgrading to pro:', err)
      setError(err instanceof Error ? err.message : 'Failed to upgrade plan')
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