import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { createAuthError } from '../utils/errorHandler';
import { useErrorHandler } from './useErrorHandler';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  recipes_generated_this_month: number;
  last_reset_date: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        if (!isSupabaseConfigured) {
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      if (!isSupabaseConfigured) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signIn = async (password: string) => {
    if (!isSupabaseConfigured) {
      throw createAuthError('SUPABASE_NOT_CONFIGURED', 'Database not connected. Please contact support.');
    }

    setAuthLoading(true);
    try {
      // Use a default email for password-only authentication
      const email = 'user@nutriloom.ai';
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Email logins are disabled') || 
            error.message.includes('email_provider_disabled')) {
          throw createAuthError('EMAIL_AUTH_DISABLED', 'Email authentication is not enabled. Please contact support or try signing in with Google.');
        }
        throw createAuthError('SIGN_IN_FAILED', error.message);
      }

      if (data.user) {
        setUser(data.user);
        await fetchUserProfile(data.user.id);
      }

      return data;
    } catch (error) {
      handleError(error, 'signIn', { email: 'user@nutriloom.ai' });
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signUp = async (password: string, name?: string) => {
    if (!isSupabaseConfigured) {
      throw createAuthError('SUPABASE_NOT_CONFIGURED', 'Database not connected. Please contact support.');
    }

    setAuthLoading(true);
    try {
      // Generate a unique email for each user
      const email = `user_${Date.now()}@nutriloom.ai`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || 'User',
          },
        },
      });

      if (error) {
        if (error.message.includes('Email logins are disabled') || 
            error.message.includes('email_provider_disabled')) {
          throw createAuthError('EMAIL_AUTH_DISABLED', 'Email authentication is not enabled. Please contact support or try signing in with Google.');
        }
        throw createAuthError('SIGN_UP_FAILED', error.message);
      }

      return data;
    } catch (error) {
      handleError(error, 'signUp', { email: '[REDACTED]' });
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      throw createAuthError('SUPABASE_NOT_CONFIGURED', 'Database not connected. Please contact support.');
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw createAuthError('GOOGLE_SIGN_IN_FAILED', error.message);
      }

      return data;
    } catch (error) {
      handleError(error, 'signInWithGoogle');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (!isSupabaseConfigured) {
        setUser(null);
        setUserProfile(null);
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
      
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUsageStats = async (increment: number = 1) => {
    if (!user || !userProfile || !isSupabaseConfigured) return;

    try {
      const now = new Date();
      const lastReset = new Date(userProfile.last_reset_date);
      const isNewMonth = now.getMonth() !== lastReset.getMonth() || 
                        now.getFullYear() !== lastReset.getFullYear();

      const newCount = isNewMonth ? increment : userProfile.recipes_generated_this_month + increment;
      const resetDate = isNewMonth ? now.toISOString() : userProfile.last_reset_date;

      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          recipes_generated_this_month: newCount,
          last_reset_date: resetDate,
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating usage stats:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error updating usage stats:', error);
    }
  };

  const upgradeToPro = async () => {
    if (!user || !isSupabaseConfigured) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ plan: 'pro' })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error upgrading to pro:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error upgrading to pro:', error);
    }
  };

  return {
    user,
    userProfile,
    loading,
    authLoading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateUsageStats,
    upgradeToPro,
  };
}