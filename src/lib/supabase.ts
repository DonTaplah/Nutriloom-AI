import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please connect to Supabase using the button in the top right.')
}

// Create a mock client when environment variables are missing
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client that doesn't make network requests
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        signOut: () => Promise.resolve({ error: null }),
        signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
      },
      from: () => ({
        select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }) }),
        insert: () => Promise.resolve({ error: null }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: null }) })
      })
    }
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  })
}

export const supabase = createSupabaseClient() as any

// Original client creation for when env vars are available
const originalClient = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
}) : null

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          name: string
          plan: 'free' | 'pro'
          created_at: string
          recipes_generated_this_month: number
          last_reset_date: string
        }
        Insert: {
          id: string
          email: string
          name: string
          plan?: 'free' | 'pro'
          created_at?: string
          recipes_generated_this_month?: number
          last_reset_date?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          plan?: 'free' | 'pro'
          created_at?: string
          recipes_generated_this_month?: number
          last_reset_date?: string
        }
      }
      saved_recipes: {
        Row: {
          id: string
          user_id: string
          recipe_data: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recipe_data: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recipe_data?: any
          created_at?: string
        }
      }
    }
  }
}