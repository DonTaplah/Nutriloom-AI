import React, { useState } from 'react';
import { ChefHat, Sparkles, RefreshCw, Crown, Zap, Clock, Users } from 'lucide-react';
import { generateRecipesWithAI, RecipeGenerationParams } from '../services/openai';
import { getRandomIngredientSet, getShuffledIngredients } from '../data/ingredients';
import { Recipe } from '../types/Recipe';
import { User } from '../types/User';

interface RecipeGeneratorProps {
  onRecipesGenerated: (recipes: Recipe[], ingredients: string[], cuisine: string) => void;
  user: User;
  onPricing: () => void;
}

const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ onRecipesGenerated, user, onPricing }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState<string>('');
  const [availableIngredients, setAvailableIngredients] = useState<string[]>(
    getShuffledIngredients(getRandomIngredientSet())
  );
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedDishType, setSelectedDishType] = useState<string>('any');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'pro' | 'legendary'>('beginner');
  const [servings, setServings] = useState<number>(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cuisines = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'american', label: 'American' },
    { value: 'argentinian', label: 'Argentinian' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'asian', label: 'Asian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'thai', label: 'Thai' },
    { value: 'vietnamese', label: 'Vietnamese' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'greek', label: 'Greek' },
    { value: 'turkish', label: 'Turkish' },
    { value: 'indian', label: 'Indian' },
    { value: 'french', label: 'French' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'german', label: 'German' },
    { value: 'british', label: 'British' },
    { value: 'russian', label: 'Russian' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'moroccan', label: 'Moroccan' },
    { value: 'ethiopian', label: 'Ethiopian' },
    { value: 'brazilian', label: 'Brazilian' },
    { value: 'peruvian', label: 'Peruvian' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'african', label: 'African' },
    { value: 'scandinavian', label: 'Scandinavian' },
    { value: 'eastern-european', label: 'Eastern European' }
  ];

  const dishTypes = [
    { value: 'any', label: 'Any Dish' },
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

  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  const handleCustomIngredientKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCustomIngredient();
    }
  };

  const refreshIngredients = () => {
    const newIngredients = getShuffledIngredients(getRandomIngredientSet());
    setAvailableIngredients(newIngredients);
  };

  const handleSkillLevelChange = (level: 'beginner' | 'pro' | 'legendary') => {
    if (level === 'legendary' && user.plan === 'free') {
      // Don't change to legendary for free users
      return;
    }
    setSkillLevel(level);
  };

  const generateRecipes = async () => {
    if (selectedIngredients.length === 0) {
      setError('Please select at least one ingredient');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const params: RecipeGenerationParams = {
        ingredients: selectedIngredients,
        cuisine: selectedCuisine,
        dishType: selectedDishType,
        skillLevel: skillLevel,
        servings: servings
      };

      const recipes = await generateRecipesWithAI(params);
      onRecipesGenerated(recipes, selectedIngredients, selectedCuisine);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipes');
    } finally {
      setIsGenerating(false);
    }
  };

  const getSkillLevelDescription = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Simple, easy-to-follow recipes perfect for cooking novices';
      case 'pro':
        return 'Intermediate recipes with more complex techniques and flavors';
      case 'legendary':
        return 'Advanced culinary masterpieces with restaurant-quality techniques';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-6">
          <ChefHat size={16} className="text-indigo-400" />
          <span className="text-indigo-300 text-sm font-medium">AI Recipe Generator</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6">
          <span className="gradient-text-primary">Create Your</span> <span className="gradient-text-secondary">Perfect Recipe</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
          Select your ingredients, choose your cuisine, and let our AI create personalized recipes 
          tailored to your taste and cooking skill level.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Ingredients */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Ingredients Selection */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Select Ingredients</h2>
              <button
                onClick={refreshIngredients}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-700/80 text-slate-300 rounded-lg hover:bg-slate-600/80 hover:text-white transition-all duration-200 text-sm sm:text-base"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {/* Custom Ingredient Input */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Add Custom Ingredient</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                  onKeyPress={handleCustomIngredientKeyPress}
                  placeholder="Enter ingredient name..."
                  className="flex-1 px-4 py-2 bg-slate-700/80 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:outline-none"
                />
                <button 
                  onClick={addCustomIngredient}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {availableIngredients.map((ingredient, index) => (
                <button
                  key={index}
                  onClick={() => toggleIngredient(ingredient)}
                  className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedIngredients.includes(ingredient)
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 hover:text-white'
                  }`}
                >
                  {ingredient}
                </button>
              ))}
            </div>

            {selectedIngredients.length > 0 && (
              <div className="mt-6 p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
                <h3 className="text-indigo-300 font-medium mb-2">Selected Ingredients ({selectedIngredients.length}):</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cuisine Selection */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Cuisine</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
              {cuisines.map((cuisine) => (
                <button
                  key={cuisine.value}
                  onClick={() => setSelectedCuisine(cuisine.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCuisine === cuisine.value
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 hover:text-white'
                  }`}
                >
                  {cuisine.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dish Type Selection */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Dish Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              {dishTypes.map((dishType) => (
                <button
                  key={dishType.value}
                  onClick={() => setSelectedDishType(dishType.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedDishType === dishType.value
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 hover:text-white'
                  }`}
                >
                  {dishType.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-8">
          {/* Skill Level */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Skill Level</h2>
            <div className="space-y-3">
              <button
                onClick={() => handleSkillLevelChange('beginner')}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  skillLevel === 'beginner'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <ChefHat size={20} />
                  <span className="font-semibold">Beginner</span>
                </div>
                <p className="text-sm opacity-90">{getSkillLevelDescription('beginner')}</p>
              </button>

              <button
                onClick={() => handleSkillLevelChange('pro')}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  skillLevel === 'pro'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles size={20} />
                  <span className="font-semibold">Pro</span>
                </div>
                <p className="text-sm opacity-90">{getSkillLevelDescription('pro')}</p>
              </button>

              <button
                onClick={() => handleSkillLevelChange('legendary')}
                disabled={user.plan === 'free'}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 relative ${
                  skillLevel === 'legendary'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : user.plan === 'free'
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Crown size={20} />
                  <span className="font-semibold">Legendary</span>
                  {user.plan === 'free' && (
                    <span className="ml-auto px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                      Pro Only
                    </span>
                  )}
                </div>
                <p className="text-sm opacity-90">{getSkillLevelDescription('legendary')}</p>
              </button>
            </div>

            {user.plan === 'free' && skillLevel === 'legendary' && (
              <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl">
                <h3 className="text-2xl font-bold gradient-text-white mb-2">
                  {user.plan === 'free' ? 'Unlock Premium Features' : 'Unlock Legendary Recipes'}
                </h3>
                <p className="text-purple-300 mb-4">
                  {user.plan === 'free' 
                    ? 'Upgrade to Pro for Legendary recipes, SYD dish scanning, unlimited generations, and advanced culinary techniques.'
                    : 'Upgrade to Pro for advanced culinary techniques, sophisticated flavor profiles, and restaurant-quality presentations.'
                  }
                </p>
                <button 
                  onClick={onPricing}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 gradient-text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                >
                  Upgrade Now
                </button>
              </div>
            )}
          </div>

          {/* Servings */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Servings</h2>
            <div className="flex items-center gap-4">
              <Users size={20} className="text-slate-400" />
              <input
                type="range"
                min="1"
                max="12"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white font-semibold text-lg w-8 text-center">{servings}</span>
            </div>
            <p className="text-slate-400 text-sm mt-2">Perfect for {servings} {servings === 1 ? 'person' : 'people'}</p>
          </div>

          {/* Generate Button */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30">
            <button
              onClick={generateRecipes}
              disabled={isGenerating || selectedIngredients.length === 0}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isGenerating || selectedIngredients.length === 0
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Recipes...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Zap size={20} />
                  <span>Generate Recipes</span>
                </div>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
              <Clock size={16} />
              <span>Usually takes 10-30 seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Upgrade Prompt */}
      {user.plan === 'free' && (
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text-white mb-2">Unlock Legendary Recipes</h3>
            <p className="gradient-text-purple mb-6">
              Upgrade to Pro for advanced culinary techniques, sophisticated flavor profiles, 
              and restaurant-quality presentations.
            </p>
            <button 
              onClick={onPricing}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 gradient-text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;