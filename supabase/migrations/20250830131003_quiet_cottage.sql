/*
  # Create user profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `name` (text, not null)
      - `plan` (text, default 'free')
      - `created_at` (timestamp with timezone, default now)
      - `recipes_generated_this_month` (integer, default 0)
      - `last_reset_date` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for users to view and update their own profile
*/

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  plan text DEFAULT 'free'::text NOT NULL CHECK (plan IN ('free', 'pro')),
  created_at timestamptz DEFAULT now() NOT NULL,
  recipes_generated_this_month integer DEFAULT 0 NOT NULL,
  last_reset_date timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update their own profile"
  ON public.user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);