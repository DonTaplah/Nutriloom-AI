import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  created_at: string;
  recipes_generated_this_month: number;
  last_reset_date: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          // Clear corrupted session data
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sb:') || key.includes('supabase.auth.token')) {
              localStorage.removeItem(key);
            }
          });
        } else if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (err) {
        console.error('Session initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null);
          setUserProfile(null);
        } else if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  const signIn = async (password: string): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      setError('Supabase not configured. Please connect to Supabase to enable authentication.');
      return false;
    }

    setError(null);
    setLoading(true);

    try {
      const email = 'user@nutriloom.ai';
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message === 'Invalid login credentials' 
          ? 'Invalid password. Please try again.' 
          : error.message);
        return false;
      }

      if (data.user) {
        setUser(data.user);
        await fetchUserProfile(data.user.id);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (password: string, name?: string): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      setError('Supabase not configured. Please connect to Supabase to enable authentication.');
      return false;
    }

    setError(null);
    setLoading(true);

    try {
      const email = `user_${Date.now()}@nutriloom.ai`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined,
          data: {
            name: name || 'User'
          }
        }
      });

      if (error) {
        setError(error.message);
        return false;
      }

      if (data.user) {
        setUser(data.user);
        
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: email,
            name: name || 'User',
            plan: 'free'
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
        } else {
          await fetchUserProfile(data.user.id);
        }
        
        return true;
      }

      return false;
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      
      // Clear any remaining session data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb:') || key.includes('supabase.auth.token')) {
          localStorage.removeItem(key);
        }
      });
      
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user
  };
}