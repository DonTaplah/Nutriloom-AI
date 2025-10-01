import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key'

if (!isSupabaseConfigured) {
  console.warn('Supabase not configured. Please connect to Supabase using the button in the top right.')
}

// Create a complete mock client that prevents all network requests
const createMockSupabaseClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (callback: any) => {
      // Call callback immediately with no session to prevent waiting
      setTimeout(() => callback('INITIAL_SESSION', null), 0)
      return { 
        data: { 
          subscription: { 
            unsubscribe: () => {} 
          } 
        } 
      }
    },
    signInWithPassword: () => Promise.resolve({ 
      data: { user: null, session: null }, 
      error: { message: 'Supabase not configured. Please connect to Supabase to enable authentication.' } 
    }),
    signUp: () => Promise.resolve({ 
      data: { user: null, session: null }, 
      error: { message: 'Supabase not configured. Please connect to Supabase to enable authentication.' } 
    }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithOAuth: () => Promise.resolve({ 
      data: { url: null, provider: null }, 
      error: { message: 'Supabase not configured. Please connect to Supabase to enable authentication.' } 
    })
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
      }),
      order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
    }),
    insert: (values: any) => Promise.resolve({ 
      data: null, 
      error: { message: 'Supabase not configured. Data not saved.' } 
    }),
    update: (values: any) => ({
      eq: (column: string, value: any) => ({
        select: (columns?: string) => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
        })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ 
        data: null, 
        error: { message: 'Supabase not configured' } 
      })
    })
  })
})

// Export the appropriate client
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  : createMockSupabaseClient()

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