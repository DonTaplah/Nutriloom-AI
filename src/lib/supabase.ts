import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please connect to Supabase using the button in the top right.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

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