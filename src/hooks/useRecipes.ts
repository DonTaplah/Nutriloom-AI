import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Recipe } from '../types/Recipe'
import { User } from '../types/User'

export const useRecipes = (user: User | null) => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.isAuthenticated) {
      loadSavedRecipes()
    } else {
      setSavedRecipes([])
    }
  }, [user])

  const loadSavedRecipes = async () => {
    if (!user?.isAuthenticated) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('saved_recipes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      const recipes = data.map(item => ({
        ...item.recipe_data,
        id: item.id
      }))

      setSavedRecipes(recipes)
    } catch (err) {
      console.error('Error loading saved recipes:', err)
      setError(err instanceof Error ? err.message : 'Failed to load saved recipes')
    } finally {
      setLoading(false)
    }
  }

  const saveRecipe = async (recipe: Recipe) => {
    if (!user?.isAuthenticated) return

    try {
      const { error } = await supabase
        .from('saved_recipes')
        .insert({
          user_id: user.id,
          recipe_data: recipe
        })

      if (error) throw error

      setSavedRecipes(prev => [recipe, ...prev])
    } catch (err) {
      console.error('Error saving recipe:', err)
      setError(err instanceof Error ? err.message : 'Failed to save recipe')
    }
  }

  const removeRecipe = async (recipeId: string) => {
    if (!user?.isAuthenticated) return

    try {
      const { error } = await supabase
        .from('saved_recipes')
        .delete()
        .eq('id', recipeId)
        .eq('user_id', user.id)

      if (error) throw error

      setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId))
    } catch (err) {
      console.error('Error removing recipe:', err)
      setError(err instanceof Error ? err.message : 'Failed to remove recipe')
    }
  }

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some(recipe => recipe.id === recipeId)
  }

  return {
    savedRecipes,
    loading,
    error,
    saveRecipe,
    removeRecipe,
    isRecipeSaved,
    loadSavedRecipes
  }
}