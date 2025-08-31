import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Recipe } from '../types/Recipe'
import { User } from '../types/User'
import { createAPIError, handleGlobalError } from '../utils/errorHandler'
import { useErrorHandler } from './useErrorHandler'
import { useOfflineSupport } from './useOfflineSupport'

export const useRecipes = (user: User | null) => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addError } = useErrorHandler()
  const { isOnline, addToOfflineQueue } = useOfflineSupport()

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
      const loadError = createAPIError(
        `Failed to load saved recipes: ${err}`,
        500,
        { action: 'loadSavedRecipes', userId: user.id }
      )
      addError(loadError)
      setError(loadError.userMessage)
    } finally {
      setLoading(false)
    }
  }

  const saveRecipe = async (recipe: Recipe) => {
    if (!user?.isAuthenticated) return

    // Handle offline scenario
    if (!isOnline) {
      addToOfflineQueue(
        () => saveRecipe(recipe),
        `Save recipe: ${recipe.name}`
      )
      setSavedRecipes(prev => [recipe, ...prev])
      return
    }
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
      const saveError = createAPIError(
        `Failed to save recipe: ${err}`,
        500,
        { action: 'saveRecipe', userId: user.id, recipeId: recipe.id }
      )
      addError(saveError)
      setError(saveError.userMessage)
    }
  }

  const removeRecipe = async (recipeId: string) => {
    if (!user?.isAuthenticated) return

    // Handle offline scenario
    if (!isOnline) {
      addToOfflineQueue(
        () => removeRecipe(recipeId),
        `Remove recipe: ${recipeId}`
      )
      setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId))
      return
    }
    try {
      const { error } = await supabase
        .from('saved_recipes')
        .delete()
        .eq('id', recipeId)
        .eq('user_id', user.id)

      if (error) throw error

      setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId))
    } catch (err) {
      const removeError = createAPIError(
        `Failed to remove recipe: ${err}`,
        500,
        { action: 'removeRecipe', userId: user.id, recipeId }
      )
      addError(removeError)
      setError(removeError.userMessage)
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