/*
  # Fix Database Security Issues

  ## Overview
  This migration addresses critical security and performance issues identified by Supabase security scan.

  ## Changes Made

  ### 1. Performance Optimizations
  
  #### Add Missing Index
  - Add index on `saved_recipes.user_id` foreign key column
  - Improves query performance for foreign key lookups
  - Essential for JOIN operations and CASCADE deletes
  
  #### Optimize RLS Policies
  - Wrap all `auth.uid()` calls with `(select auth.uid())`
  - Prevents re-evaluation of auth function for each row
  - Significantly improves query performance at scale
  - Applied to all policies on both `saved_recipes` and `user_profiles` tables

  ### 2. Tables Modified
  
  #### saved_recipes
  - Added index: `idx_saved_recipes_user_id`
  - Updated 3 RLS policies (SELECT, INSERT, DELETE)
  
  #### user_profiles
  - Updated 4 RLS policies (SELECT, INSERT, UPDATE, DELETE)

  ## Performance Impact
  - Index addition: Faster foreign key lookups and JOINs
  - RLS optimization: Auth function evaluated once per query instead of per row
  - Expected 10-100x performance improvement for queries on large datasets

  ## Security Impact
  - No security regression - same security model maintained
  - All policies remain restrictive and user-scoped
  - Better performance = better user experience
*/

-- =====================================================
-- 1. ADD MISSING INDEX FOR FOREIGN KEY
-- =====================================================

-- Add index on saved_recipes.user_id foreign key
-- This improves performance for queries filtering by user_id and JOIN operations
CREATE INDEX IF NOT EXISTS idx_saved_recipes_user_id 
  ON public.saved_recipes(user_id);

-- =====================================================
-- 2. OPTIMIZE RLS POLICIES - SAVED_RECIPES TABLE
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own saved recipes" ON public.saved_recipes;
DROP POLICY IF EXISTS "Users can insert their own saved recipes" ON public.saved_recipes;
DROP POLICY IF EXISTS "Users can delete their own saved recipes" ON public.saved_recipes;

-- Recreate with optimized auth.uid() calls wrapped in SELECT
CREATE POLICY "Users can view their own saved recipes"
  ON public.saved_recipes
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own saved recipes"
  ON public.saved_recipes
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own saved recipes"
  ON public.saved_recipes
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- =====================================================
-- 3. OPTIMIZE RLS POLICIES - USER_PROFILES TABLE
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can create own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.user_profiles;

-- Recreate with optimized auth.uid() calls wrapped in SELECT
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can create own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can delete own profile"
  ON public.user_profiles
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = id);
