import React, { useState } from 'react';
import { Search, Camera, Utensils, Sparkles, Plus, X, RefreshCw, Upload } from 'lucide-react';
import { generateRecipesWithAI } from '../services/openai';
import { getRandomIngredientSet, getShuffledIngredients } from '../data/ingredients';
import { User } from '../types/User';

interface HomePageProps {
  onSearch: (ingredients: string[], cuisine: string) => void;
  user: User;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch, user }) => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'pro' | 'legendary'>('beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIngredientSet, setCurrentIngredientSet] = useState(getRandomIngredientSet());

  const cuisines = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'italian', label: 'Italian' },
    { value: 'thai', label: 'Thai' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'indian', label: 'Indian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' }
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Simple, easy recipes' },
    { value: 'pro', label: 'Pro', description: 'Advanced techniques' },
    { value: 'legendary', label: 'Legendary', description: 'Master chef level (Pro Plan)' }
  ];

  const addIngredient = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput.trim())) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const addPopularIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      // Here you would typically send the image to an AI service to extract ingredients
      // For now, we'll just show a placeholder message
    }
  };

  const refreshPopularIngredients = () => {
    // Get a completely new random set of ingredients
    let newSet = getRandomIngredientSet();
    // Ensure it's different from current set
    while (JSON.stringify(newSet) === JSON.stringify(currentIngredientSet)) {
      newSet = getRandomIngredientSet();
    }
    // Shuffle the new set for extra randomness
    setCurrentIngredientSet(getShuffledIngredients(newSet));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  const handleSearch = async () => {
    if (ingredientInput.trim()) {
      // Convert textarea input to ingredients array
      const ingredientsArray = ingredientInput
        .split(/[,\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      setIsGenerating(true);
      try {
        // For legendary level, check if user has pro plan (mock check)
        if (skillLevel === 'legendary') {
          if (user.plan !== 'pro') {
            alert('Legendary recipes require a Pro Plan subscription. Please upgrade to access master chef level recipes.');
            setIsGenerating(false);
            return;
          }
        }

        const aiRecipes = await generateRecipesWithAI({
          ingredients: ingredientsArray,
          cuisine: selectedCuisine,
          skillLevel,
          servings: 4
        });
        
        // Pass the AI-generated recipes to the parent component
        onSearch(ingredientsArray, selectedCuisine, aiRecipes);
      } catch (error) {
        console.error('Error generating recipes:', error);
        alert('Failed to generate recipes. Please check your OpenAI API key and try again.');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center gap-4">
            <img 
              src="/An_AI_chef_with_a_spoon_and_a_fork_in_the_background-removebg-preview.png" 
              alt="Nutriloom AI Chef" 
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-5xl font-bold text-white">
              What's in your kitchen?
            </h1>
          </div>
        </div>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Turn your available ingredients into delicious recipes with AI-powered suggestions. 
          Just tell us what you have, and we'll create magic!
        </p>
        {user.plan === 'free' && (
          <div className="mt-4 p-3 bg-indigo-500 bg-opacity-20 border border-indigo-500 rounded-lg max-w-md mx-auto">
            <p className="text-indigo-400 text-sm">
              🆓 Free Plan: Up to 5 recipes per day • Upgrade for unlimited generations
            </p>
          </div>
        )}
      </div>

      {/* Main Input Section */}
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-indigo-500/30">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Ingredient Inventory & Preferences
          </h2>
          <p className="text-slate-300 mb-4">
            List your ingredients, optionally specify cuisine, skill level, and dish type, and our AI will design a bespoke recipe.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Log in or Sign up to use the Recipe AI generator.</span>
          </div>
        </div>

        {/* Available Ingredients */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-white mb-3">
            Available Ingredients
          </label>
          <textarea
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="e.g., chicken breast, wild mushrooms, truffle oil, arborio rice, fresh thyme"
            className="w-full px-4 py-4 text-base border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 bg-slate-700/80 text-white placeholder-slate-400 min-h-[100px] resize-none"
          />
          <p className="text-sm text-slate-400 mt-2">
            Separate ingredients by commas or new lines.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Cuisine Culture */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Optional: Cuisine Culture
            </label>
            <input
              type="text"
              placeholder="e.g., Italian, Thai"
              className="w-full px-4 py-3 text-base border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 bg-slate-700/80 text-white placeholder-slate-400"
            />
            <p className="text-sm text-slate-400 mt-2">
              Leave blank for AI to decide.
            </p>
          </div>

          {/* Dish Type */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Optional: Dish Type
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-4 py-3 text-base border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 bg-slate-700/80 text-white"
            >
              <option value="all">Any (Let AI Decide)</option>
              <option value="appetizer">Appetizer</option>
              <option value="main">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="soup">Soup</option>
              <option value="salad">Salad</option>
            </select>
            <p className="text-sm text-slate-400 mt-2">
              Select a desired dish category.
            </p>
          </div>
        </div>

        {/* Recipe Skill Level */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-white mb-3">
            Recipe Skill Level
          </label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as 'beginner' | 'pro' | 'legendary')}
            className="w-full px-4 py-3 text-base border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 bg-slate-700/80 text-white"
          >
            <option value="beginner">Amateur (Default)</option>
            <option value="pro">Professional</option>
            <option value="legendary">Legendary</option>
          </select>
          <p className="text-sm text-slate-400 mt-2">
            Choose the complexity of the recipe.
          </p>
        </div>

        {/* Premium Recipe Checkbox */}
        <div className="mb-8">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="premium-recipe"
              className="mt-1 w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500"
            />
            <div>
              <label htmlFor="premium-recipe" className="text-white font-medium flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400" />
                Generate Premium (Legendary) Recipe
                <span className="text-blue-400 text-sm">(Pro Only - Login Required)</span>
              </label>
              <p className="text-slate-400 text-sm mt-1">
                Unlock "Five Stars Diner" level recipes. Login or Sign Up to access Pro.
              </p>
            </div>
          </div>
        </div>

        {/* Generate Recipes Button */}
        <button
          onClick={handleSearch}
          disabled={!ingredientInput.trim() || isGenerating}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
            ingredientInput.trim() && !isGenerating
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={24} className="animate-spin" />
              Generating Amateur Recipe...
            </>
          ) : (
            <>
              <Search size={24} />
              Generate Amateur Recipe
            </>
          )}
        </button>
      </div>

      {/* Features Preview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-500/30">
          <div className="w-12 h-12 bg-indigo-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Smart Matching</h3>
          <p className="text-slate-300">AI finds the perfect recipes using your available ingredients</p>
        </div>
        
        <div className="text-center p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-500/30">
          <div className="w-12 h-12 bg-emerald-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils size={24} className="text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Step-by-Step</h3>
          <p className="text-slate-300">Clear instructions and cooking tips for perfect results</p>
        </div>
        
        <div className="text-center p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-500/30">
          <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Nutrition Info</h3>
          <p className="text-slate-300">Get detailed nutritional breakdown for every recipe</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;