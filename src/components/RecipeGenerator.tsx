import React, { useState } from 'react';
import { ChefHat, Sparkles, RefreshCw, Crown, Zap, Clock, Users, Star } from 'lucide-react';
import { generateRecipesWithAI, RecipeGenerationParams } from '../services/openai';
import { getRandomIngredientSet } from '../data/ingredients';
import { Recipe } from '../types/Recipe';
import { User } from '../types/User';

interface RecipeGeneratorProps {
  onRecipesGenerated: (recipes: Recipe[], ingredients: string[], cuisine: string) => void;
  user: User;
  onPricing: () => void;
  onAuth: () => void;
}

const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ onRecipesGenerated, user, onPricing, onAuth }) => {
  const [ingredientsText, setIngredientsText] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [selectedDishType, setSelectedDishType] = useState<string>('any');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'pro' | 'legendary'>('beginner');
  const [generatePremium, setGeneratePremium] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>(() => getRandomIngredientSet());

  const refreshIngredients = () => {
    setSuggestedIngredients(getRandomIngredientSet());
  };

  const addIngredient = (ingredient: string) => {
    const currentIngredients = parseIngredients(ingredientsText);
    if (!currentIngredients.includes(ingredient)) {
      const newIngredients = currentIngredients.length > 0 
        ? `${ingredientsText}, ${ingredient}`
        : ingredient;
      setIngredientsText(newIngredients);
    }
  };

  const dishTypes = [
    { value: 'any', label: 'Any (Let AI Decide)' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'soup', label: 'Soup' },
    { value: 'salad', label: 'Salad' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'side-dish', label: 'Side Dish' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'rice-dish', label: 'Rice Dish' },
    { value: 'stir-fry', label: 'Stir Fry' },
    { value: 'casserole', label: 'Casserole' },
    { value: 'sandwich', label: 'Sandwich' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'burger', label: 'Burger' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'brunch', label: 'Brunch' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'snack', label: 'Snack' },
    { value: 'smoothie', label: 'Smoothie' },
    { value: 'beverage', label: 'Beverage' }
  ];

  const parseIngredients = (text: string): string[] => {
    return text
      .split(/[,\n]/)
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);
  };

  const generateRecipes = async () => {
    if (!user.isAuthenticated) {
      setError('Please sign in to generate recipes');
      return;
    }

    const ingredients = parseIngredients(ingredientsText);
    
    if (ingredients.length === 0) {
      setError('Please enter at least one ingredient');
      return;
    }

    if (generatePremium && (!user.isAuthenticated || user.plan === 'free')) {
      setError('Premium recipes require a Pro subscription');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const params: RecipeGenerationParams = {
        ingredients: ingredients,
        cuisine: selectedCuisine || 'all',
        dishType: selectedDishType,
        skillLevel: generatePremium ? 'legendary' : skillLevel,
        servings: 4
      };

      const recipes = await generateRecipesWithAI(params);
      onRecipesGenerated(recipes, ingredients, selectedCuisine || 'all');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipes');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Ingredient Inventory & Preferences
          </h1>
          <p className="text-slate-300 text-lg mb-4">
            List your ingredients, optionally specify cuisine, skill level, and dish type, and our AI will design a bespoke recipe.
          </p>
          {!user.isAuthenticated && (
            <div className="text-slate-400">
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer" onClick={onAuth}>Log In</span>
              <span className="mx-2">or</span>
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer" onClick={onAuth}>Sign Up</span>
              <span className="ml-2">to use the Recipe AI generator.</span>
            </div>
          )}
        </div>

        {/* Main Form */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Available Ingredients */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Available Ingredients</h2>
              <textarea
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                placeholder="e.g., chicken breast, wild mushrooms, truffle oil, arborio rice, fresh thyme"
                className="w-full h-24 px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
              />
              <p className="text-slate-400 text-sm mt-2">
                Separate ingredients by commas or new lines.
              </p>
              
              {/* Suggested Ingredients */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-slate-300">Suggested Ingredients</h4>
                  <button
                    onClick={refreshIngredients}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-700/60 text-slate-300 rounded-lg text-sm hover:bg-slate-600/60 hover:text-white transition-all duration-200"
                  >
                    <RefreshCw size={14} />
                    Refresh
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedIngredients.map((ingredient, index) => (
                    <button
                      key={index}
                      onClick={() => addIngredient(ingredient)}
                      className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30 hover:bg-indigo-500/30 hover:text-indigo-200 transition-all duration-200"
                    >
                      + {ingredient}
                    </button>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Click any ingredient to add it to your list
                </p>
              </div>
            </div>

            {/* Cuisine and Dish Type Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Optional Cuisine Culture */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Optional: Cuisine Culture
                </h3>
                <input
                  type="text"
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  placeholder="e.g., Italian, Thai"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <p className="text-slate-400 text-sm mt-2">
                  Leave blank for AI to decide.
                </p>
              </div>

              {/* Optional Dish Type */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Optional: Dish Type
                </h3>
                <select
                  value={selectedDishType}
                  onChange={(e) => setSelectedDishType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  {dishTypes.map((dishType) => (
                    <option key={dishType.value} value={dishType.value} className="bg-slate-800">
                      {dishType.label}
                    </option>
                  ))}
                </select>
                <p className="text-slate-400 text-sm mt-2">
                  Select a desired dish category.
                </p>
              </div>
            </div>

            {/* Recipe Skill Level */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Recipe Skill Level</h3>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as 'beginner' | 'pro' | 'legendary')}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="beginner" className="bg-slate-800">Amateur (Default)</option>
                <option value="pro" className="bg-slate-800">Professional</option>
                <option value="legendary" className="bg-slate-800" disabled={!user.isAuthenticated || user.plan === 'free'}>
                  Legendary {(!user.isAuthenticated || user.plan === 'free') ? '(Pro Only)' : ''}
                </option>
              </select>
              <p className="text-slate-400 text-sm mt-2">
                Choose the complexity of the recipe.
              </p>
            </div>

            {/* Premium Recipe Checkbox */}
            <div className="border-t border-slate-700 pt-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="premium-recipe"
                  checked={generatePremium}
                  onChange={(e) => setGeneratePremium(e.target.checked)}
                  disabled={!user.isAuthenticated || user.plan === 'free'}
                  className="mt-1 w-4 h-4 text-indigo-600 bg-slate-900 border-slate-600 rounded focus:ring-indigo-500 focus:ring-2 disabled:opacity-50"
                />
                <div className="flex-1">
                  <label htmlFor="premium-recipe" className="flex items-center gap-2 text-white font-medium cursor-pointer">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Generate Premium (Legendary) Recipe
                    {(!user.isAuthenticated || user.plan === 'free') && (
                      <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">
                        Pro Only - Login Required
                      </span>
                    )}
                  </label>
                  <p className="text-slate-400 text-sm mt-1">
                    Unlock "Five Stars Diner" level recipes. 
                    {!user.isAuthenticated ? (
                      <>
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1" onClick={onAuth}>
                          Login
                        </span>
                        <span className="mx-1">or</span>
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer" onClick={onAuth}>
                          Sign Up
                        </span>
                        <span className="ml-1">to access Pro.</span>
                      </>
                    ) : user.plan === 'free' ? (
                      <>
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1" onClick={onPricing}>
                          Upgrade to Pro
                        </span>
                        <span className="ml-1">to access Legendary recipes.</span>
                      </>
                    ) : (
                      'Restaurant-quality techniques and sophisticated culinary artistry.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <div className="border-t border-slate-700 pt-6">
              <button
                onClick={generateRecipes}
                disabled={isGenerating || ingredientsText.trim().length === 0}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isGenerating || ingredientsText.trim().length === 0
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : generatePremium && user.isAuthenticated && user.plan === 'pro'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Recipe...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    <span>
                      {generatePremium && user.isAuthenticated && user.plan === 'pro' 
                        ? 'Generate Premium Recipe' 
                        : `Generate ${skillLevel === 'beginner' ? 'Amateur' : skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Recipe`
                      }
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Pro Upgrade Section */}
        {(!user.isAuthenticated || user.plan === 'free') && (
          <div className="mt-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Unlock Premium Features</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Upgrade to Pro for Legendary recipes, SYD dish scanning, unlimited generations, 
                and advanced culinary techniques that transform your cooking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user.isAuthenticated ? (
                  <button 
                    onClick={onPricing}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Upgrade to Pro
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={onAuth}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={onPricing}
                      className="px-8 py-3 bg-slate-700/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-600/60 hover:text-white transition-all duration-200"
                    >
                      View Pricing
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-indigo-400" />
              AI Recipe Generation
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our advanced AI analyzes your ingredients and preferences to create personalized recipes 
              tailored to your taste and cooking skill level.
            </p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Premium Quality
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Premium recipes feature restaurant-quality techniques, sophisticated flavor profiles, 
              and detailed instructions for culinary excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;