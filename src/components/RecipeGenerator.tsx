import React, { useState } from 'react';
import { ChefHat, Sparkles, RefreshCw, Crown, Zap, Clock, Users, Star } from 'lucide-react';
import { generateRecipesWithAI, RecipeGenerationParams } from '../services/openai';
import { getRandomIngredientSet } from '../data/ingredients';
import { Recipe } from '../types/Recipe';
import { User } from '../types/User';

interface RecipeGeneratorProps {
  onRecipesGenerated: (ingredients: string[], cuisine: string, recipes: Recipe[]) => void;
  user: User;
  onPricing: () => void;
  onAuth: () => void;
  onToggleSidebar: () => void;
}

const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ onRecipesGenerated, user, onPricing, onAuth, onToggleSidebar }) => {
  const [ingredientsText, setIngredientsText] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [selectedDishType, setSelectedDishType] = useState<string>('any');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'pro' | 'legendary'>('beginner');
  const [generatePremium, setGeneratePremium] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedIngredients, setSuggestedIngredients] = useState<string[]>(() => getRandomIngredientSet());

  // Check if it's a new month and reset usage if needed
  React.useEffect(() => {
    if (user.isAuthenticated && user.plan === 'free') {
      const now = new Date();
      const lastReset = new Date(user.usageStats.lastResetDate);
      
      // Check if we're in a new month
      if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
        const updatedUser = {
          ...user,
          usageStats: {
            recipesGeneratedThisMonth: 0,
            lastResetDate: now
          }
        };
        // This would normally be handled by the parent component
        // For now, we'll just check in the generate function
      }
    }
  }, [user]);

  const getRemainingGenerations = () => {
    if (!user.isAuthenticated || user.plan === 'pro') return null;
    
    const now = new Date();
    const lastReset = new Date(user.usageStats.lastResetDate);
    
    // Check if we're in a new month
    if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
      return 5; // Reset to full limit for new month
    }
    
    return Math.max(0, 5 - user.usageStats.recipesGeneratedThisMonth);
  };

  const getNextResetDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
    { value: 'dip', label: 'Dip' },
    { value: 'finger-food', label: 'Finger Food' },
    { value: 'soup', label: 'Soup' },
    { value: 'stew', label: 'Stew' },
    { value: 'chili', label: 'Chili' },
    { value: 'broth', label: 'Broth' },
    { value: 'salad', label: 'Salad' },
    { value: 'wrap', label: 'Wrap' },
    { value: 'bowl', label: 'Bowl' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'entree', label: 'Entree' },
    { value: 'protein', label: 'Protein Dish' },
    { value: 'side-dish', label: 'Side Dish' },
    { value: 'vegetable', label: 'Vegetable Dish' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'noodles', label: 'Noodles' },
    { value: 'ramen', label: 'Ramen' },
    { value: 'rice-dish', label: 'Rice Dish' },
    { value: 'risotto', label: 'Risotto' },
    { value: 'fried-rice', label: 'Fried Rice' },
    { value: 'stir-fry', label: 'Stir Fry' },
    { value: 'curry', label: 'Curry' },
    { value: 'tagine', label: 'Tagine' },
    { value: 'casserole', label: 'Casserole' },
    { value: 'baked-dish', label: 'Baked Dish' },
    { value: 'grilled', label: 'Grilled' },
    { value: 'roasted', label: 'Roasted' },
    { value: 'braised', label: 'Braised' },
    { value: 'sandwich', label: 'Sandwich' },
    { value: 'panini', label: 'Panini' },
    { value: 'sub', label: 'Sub/Hoagie' },
    { value: 'taco', label: 'Taco' },
    { value: 'burrito', label: 'Burrito' },
    { value: 'quesadilla', label: 'Quesadilla' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'flatbread', label: 'Flatbread' },
    { value: 'burger', label: 'Burger' },
    { value: 'hot-dog', label: 'Hot Dog' },
    { value: 'sushi', label: 'Sushi' },
    { value: 'poke', label: 'Poke Bowl' },
    { value: 'ceviche', label: 'Ceviche' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'pancakes', label: 'Pancakes' },
    { value: 'waffles', label: 'Waffles' },
    { value: 'omelette', label: 'Omelette' },
    { value: 'toast', label: 'Toast' },
    { value: 'cereal', label: 'Cereal' },
    { value: 'brunch', label: 'Brunch' },
    { value: 'quiche', label: 'Quiche' },
    { value: 'frittata', label: 'Frittata' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'cake', label: 'Cake' },
    { value: 'cookies', label: 'Cookies' },
    { value: 'pie', label: 'Pie' },
    { value: 'ice-cream', label: 'Ice Cream' },
    { value: 'pudding', label: 'Pudding' },
    { value: 'mousse', label: 'Mousse' },
    { value: 'tart', label: 'Tart' },
    { value: 'snack', label: 'Snack' },
    { value: 'trail-mix', label: 'Trail Mix' },
    { value: 'energy-bar', label: 'Energy Bar' },
    { value: 'smoothie', label: 'Smoothie' },
    { value: 'juice', label: 'Juice' },
    { value: 'shake', label: 'Shake' },
    { value: 'beverage', label: 'Beverage' }
  ];

  const cuisines = [
    { value: '', label: 'Any (Let AI Decide)' },
    { value: 'Italian', label: 'Italian' },
    { value: 'French', label: 'French' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'Greek', label: 'Greek' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'American', label: 'American' },
    { value: 'British', label: 'British' },
    { value: 'German', label: 'German' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Lebanese', label: 'Lebanese' },
    { value: 'Moroccan', label: 'Moroccan' },
    { value: 'Ethiopian', label: 'Ethiopian' },
    { value: 'Brazilian', label: 'Brazilian' },
    { value: 'Argentinian', label: 'Argentinian' },
    { value: 'Peruvian', label: 'Peruvian' },
    { value: 'Caribbean', label: 'Caribbean' },
    { value: 'Jamaican', label: 'Jamaican' },
    { value: 'Cuban', label: 'Cuban' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Polish', label: 'Polish' },
    { value: 'Hungarian', label: 'Hungarian' },
    { value: 'Czech', label: 'Czech' },
    { value: 'Scandinavian', label: 'Scandinavian' },
    { value: 'Nordic', label: 'Nordic' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Belgian', label: 'Belgian' },
    { value: 'Swiss', label: 'Swiss' },
    { value: 'Austrian', label: 'Austrian' },
    { value: 'Israeli', label: 'Israeli' },
    { value: 'Persian', label: 'Persian' },
    { value: 'Pakistani', label: 'Pakistani' },
    { value: 'Bangladeshi', label: 'Bangladeshi' },
    { value: 'Sri Lankan', label: 'Sri Lankan' },
    { value: 'Nepalese', label: 'Nepalese' },
    { value: 'Tibetan', label: 'Tibetan' },
    { value: 'Malaysian', label: 'Malaysian' },
    { value: 'Indonesian', label: 'Indonesian' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'Singaporean', label: 'Singaporean' },
    { value: 'Burmese', label: 'Burmese' },
    { value: 'Cambodian', label: 'Cambodian' },
    { value: 'Laotian', label: 'Laotian' },
    { value: 'Mongolian', label: 'Mongolian' },
    { value: 'Georgian', label: 'Georgian' },
    { value: 'Armenian', label: 'Armenian' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Romanian', label: 'Romanian' },
    { value: 'Bulgarian', label: 'Bulgarian' },
    { value: 'Croatian', label: 'Croatian' },
    { value: 'Serbian', label: 'Serbian' },
    { value: 'Bosnian', label: 'Bosnian' },
    { value: 'Albanian', label: 'Albanian' },
    { value: 'Macedonian', label: 'Macedonian' },
    { value: 'Slovenian', label: 'Slovenian' },
    { value: 'Slovak', label: 'Slovak' },
    { value: 'Lithuanian', label: 'Lithuanian' },
    { value: 'Latvian', label: 'Latvian' },
    { value: 'Estonian', label: 'Estonian' },
    { value: 'Finnish', label: 'Finnish' },
    { value: 'Icelandic', label: 'Icelandic' },
    { value: 'Irish', label: 'Irish' },
    { value: 'Scottish', label: 'Scottish' },
    { value: 'Welsh', label: 'Welsh' },
    { value: 'Cajun', label: 'Cajun' },
    { value: 'Creole', label: 'Creole' },
    { value: 'Soul Food', label: 'Soul Food' },
    { value: 'Tex-Mex', label: 'Tex-Mex' },
    { value: 'Southwestern', label: 'Southwestern' },
    { value: 'California', label: 'California' },
    { value: 'Hawaiian', label: 'Hawaiian' },
    { value: 'Fusion', label: 'Fusion' }
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

    // Check usage limits for free users
    if (user.plan === 'free') {
      const remaining = getRemainingGenerations();
      if (remaining !== null && remaining <= 0) {
        setError(`You've reached your monthly limit of 5 recipe generations. Your limit resets on ${getNextResetDate()}. Upgrade to Pro for unlimited generations.`);
        return;
      }
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
        cuisine: selectedCuisine || '',
        dishType: selectedDishType,
        skillLevel: generatePremium ? 'legendary' : skillLevel,
        servings: 4
      };

      const recipes = await generateRecipesWithAI(params);
      onRecipesGenerated(ingredients, selectedCuisine || '', recipes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipes');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-4 lg:py-8">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-sm border-b border-indigo-500/20">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold gradient-text-primary">Recipe Generator</h1>
        <div className="w-10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 hidden lg:block">
            Ingredient Inventory & Preferences
          </h1>
          <p className="text-slate-300 text-base lg:text-lg mb-4">
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
          <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
            {/* Available Ingredients */}
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-white mb-3">Available Ingredients</h2>
              <textarea
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                placeholder="e.g., chicken breast, wild mushrooms, truffle oil, arborio rice, fresh thyme"
                className="w-full h-20 lg:h-24 px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none text-sm lg:text-base"
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
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedIngredients.map((ingredient, index) => (
                    <button
                      key={index}
                      onClick={() => addIngredient(ingredient)}
                      className="px-2 lg:px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs lg:text-sm border border-indigo-500/30 hover:bg-indigo-500/30 hover:text-indigo-200 transition-all duration-200"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Optional Cuisine Culture */}
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-white mb-3">
                  Optional: Cuisine Culture
                </h3>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm lg:text-base"
                >
                  {cuisines.map((cuisine) => (
                    <option key={cuisine.value} value={cuisine.value} className="bg-slate-800">
                      {cuisine.label}
                    </option>
                  ))}
                </select>
                <p className="text-slate-400 text-sm mt-2">
                  Select a cuisine style or let AI decide.
                </p>
              </div>

              {/* Optional Dish Type */}
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-white mb-3">
                  Optional: Dish Type
                </h3>
                <select
                  value={selectedDishType}
                  onChange={(e) => setSelectedDishType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm lg:text-base"
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
              <h3 className="text-base lg:text-lg font-semibold text-white mb-3">Recipe Skill Level</h3>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as 'beginner' | 'pro' | 'legendary')}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm lg:text-base"
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
            <div className="border-t border-slate-700 pt-4 lg:pt-6">
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
                  <label htmlFor="premium-recipe" className="flex items-center gap-2 text-white font-medium cursor-pointer text-sm lg:text-base">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="hidden sm:inline">Generate Premium (Legendary) Recipe</span>
                    <span className="sm:hidden">Premium Recipe</span>
                    {(!user.isAuthenticated || user.plan === 'free') && (
                      <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-full whitespace-nowrap">
                        <span className="hidden sm:inline">Pro Only - Login Required</span>
                        <span className="sm:hidden">Pro Only</span>
                      </span>
                    )}
                  </label>
                  <p className="text-slate-400 text-sm mt-1">
                    <span className="hidden sm:inline">Unlock "Five Stars Diner" level recipes.</span>
                    <span className="sm:hidden">Unlock premium recipes.</span>
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
                      <span className="hidden sm:inline">Restaurant-quality techniques and sophisticated culinary artistry.</span>
                      <span className="sm:hidden">Restaurant-quality techniques.</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm leading-relaxed">
                {error}
              </div>
            )}

            {/* Usage Stats for Free Users */}
            {user.isAuthenticated && user.plan === 'free' && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-300 font-medium">Monthly Usage</span>
                  <span className="text-blue-400 text-sm">Free Plan</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-200">Recipes Generated:</span>
                  <span className="text-blue-100 font-semibold">
                    {getRemainingGenerations() !== null ? 5 - getRemainingGenerations()! : user.usageStats.recipesGeneratedThisMonth} / 5
                  </span>
                </div>
                <div className="w-full bg-blue-900/50 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${getRemainingGenerations() !== null 
                        ? ((5 - getRemainingGenerations()!) / 5) * 100 
                        : (user.usageStats.recipesGeneratedThisMonth / 5) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-300">
                    {getRemainingGenerations() !== null && getRemainingGenerations()! > 0 
                      ? `${getRemainingGenerations()} generations remaining`
                      : getRemainingGenerations() === 0
                      ? 'Monthly limit reached'
                      : `${getRemainingGenerations() || 0} remaining`
                    }
                  </span>
                  <span className="text-blue-400">
                    Resets: {getNextResetDate()}
                  </span>
                </div>
                {getRemainingGenerations() === 0 && (
                  <div className="mt-3 pt-3 border-t border-blue-500/30">
                    <button
                      onClick={onPricing}
                      className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm lg:text-base"
                    >
                      <span className="hidden sm:inline">Upgrade to Pro for Unlimited Generations</span>
                      <span className="sm:hidden">Upgrade to Pro</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Generate Button */}
            <div className="border-t border-slate-700 pt-4 lg:pt-6">
              <button
                onClick={generateRecipes}
                disabled={
                  isGenerating || 
                  ingredientsText.trim().length === 0 || 
                  (user.isAuthenticated && user.plan === 'free' && getRemainingGenerations() === 0)
                }
                className={`w-full py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all duration-200 ${
                  isGenerating || 
                  ingredientsText.trim().length === 0 || 
                  (user.isAuthenticated && user.plan === 'free' && getRemainingGenerations() === 0)
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : generatePremium && user.isAuthenticated && user.plan === 'pro'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm lg:text-base">Generating Recipe...</span>
                  </div>
                ) : user.isAuthenticated && user.plan === 'free' && getRemainingGenerations() === 0 ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm lg:text-base">
                      <span className="hidden sm:inline">Monthly Limit Reached - Upgrade to Pro</span>
                      <span className="sm:hidden">Limit Reached - Upgrade</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    <span className="text-sm lg:text-base">
                      {generatePremium && user.isAuthenticated && user.plan === 'pro' 
                        ? (
                          <>
                            <span className="hidden sm:inline">Generate Premium Recipe</span>
                            <span className="sm:hidden">Generate Premium</span>
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">{`Generate ${skillLevel === 'beginner' ? 'Amateur' : skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Recipe`}</span>
                            <span className="sm:hidden">Generate Recipe</span>
                          </>
                        )
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
          <div className="mt-6 lg:mt-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6 lg:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown size={32} className="text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Unlock Premium Features</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm lg:text-base">
                Upgrade to Pro for Legendary recipes, SYD dish scanning, unlimited generations, 
                and advanced culinary techniques that transform your cooking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user.isAuthenticated ? (
                  <button 
                    onClick={onPricing}
                    className="px-6 lg:px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
                  >
                    Upgrade to Pro
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={onAuth}
                      className="px-6 lg:px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={onPricing}
                      className="px-6 lg:px-8 py-3 bg-slate-700/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-600/60 hover:text-white transition-all duration-200 text-sm lg:text-base"
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
        <div className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-700/50">
            <h3 className="text-base lg:text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-indigo-400" />
              AI Recipe Generation
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our advanced AI analyzes your ingredients and preferences to create personalized recipes 
              tailored to your taste and cooking skill level.
            </p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-700/50">
            <h3 className="text-base lg:text-lg font-semibold text-white mb-3 flex items-center gap-2">
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