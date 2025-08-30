/*
  # Create saved recipes table

  1. New Tables
    - `saved_recipes`
      - `id` (uuid, primary key, auto-generated)
      - `user_id` (uuid, references auth.users, not null)
      - `recipe_data` (jsonb, not null)
      - `created_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on `saved_recipes` table
    - Add policies for users to view, insert, and delete their own saved recipes
*/

CREATE TABLE IF NOT EXISTS public.saved_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved recipes"
  ON public.saved_recipes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved recipes"
  ON public.saved_recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved recipes"
  ON public.saved_recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);