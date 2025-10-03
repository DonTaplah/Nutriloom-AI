import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase configuration:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyPrefix: supabaseAnonKey?.substring(0, 20)
})

// Check if Supabase is properly configured with real values
const isSupabaseConfigured = supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your_supabase_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co')

if (!isSupabaseConfigured) {
  console.warn('Supabase not configured. Please connect to Supabase using the button in the top right.')
} else {
  console.log('Supabase is configured correctly')
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
    }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    refreshSession: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
    setSession: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
    updateUser: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
    resetPasswordForEmail: () => Promise.resolve({ data: {}, error: { message: 'Supabase not configured' } }),
    exchangeCodeForSession: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
    resend: () => Promise.resolve({ data: {}, error: { message: 'Supabase not configured' } }),
    initialize: () => Promise.resolve(),
    startAutoRefresh: () => {},
    stopAutoRefresh: () => {}
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
        limit: (count: number) => Promise.resolve({ data: [], error: null }),
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null })
      }),
      order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
      limit: (count: number) => Promise.resolve({ data: [], error: null }),
      range: (from: number, to: number) => Promise.resolve({ data: [], error: null })
    }),
    insert: (values: any) => ({
      select: (columns?: string) => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured. Data not saved.' } }),
        maybeSingle: () => Promise.resolve({ data: null, error: null })
      }),
      then: (callback: any) => Promise.resolve({ 
        data: null, 
        error: { message: 'Supabase not configured. Data not saved.' } 
      }).then(callback)
    }),
    update: (values: any) => ({
      eq: (column: string, value: any) => ({
        select: (columns?: string) => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
          maybeSingle: () => Promise.resolve({ data: null, error: null })
        }),
        then: (callback: any) => Promise.resolve({ 
          data: null, 
          error: { message: 'Supabase not configured' } 
        }).then(callback)
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ 
        data: null, 
        error: { message: 'Supabase not configured' } 
      })
    }),
    upsert: (values: any) => ({
      select: (columns?: string) => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        maybeSingle: () => Promise.resolve({ data: null, error: null })
      })
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      download: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      list: () => Promise.resolve({ data: [], error: null }),
      remove: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  },
  functions: {
    invoke: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  },
  channel: () => ({
    on: () => ({ subscribe: () => {} }),
    subscribe: () => {},
    unsubscribe: () => Promise.resolve('ok')
  }),
  removeChannel: () => Promise.resolve('ok'),
  removeAllChannels: () => Promise.resolve([]),
  getChannels: () => []
})

// Use real Supabase client if configured, otherwise use mock
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient()

// Export configuration status for components that need to check
export { isSupabaseConfigured }

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