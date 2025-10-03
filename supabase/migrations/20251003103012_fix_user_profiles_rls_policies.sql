/*
  # Fix User Profiles RLS Policies

  1. Changes
    - Drop existing overly broad policy
    - Create separate policies for SELECT, INSERT, UPDATE, DELETE
    - Allow users to insert their own profile on signup
    - Allow users to read and update their own profile
    - Allow users to delete their own profile

  2. Security
    - Restrictive RLS policies following best practices
    - Each operation has its own policy with specific checks
*/

-- Drop the existing broad policy
DROP POLICY IF EXISTS "Users can view and update their own profile" ON public.user_profiles;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to create their own profile on signup
CREATE POLICY "Users can create own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "Users can delete own profile"
  ON public.user_profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);
