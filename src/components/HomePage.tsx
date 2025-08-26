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
    if (ingredients.length > 0) {
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
          ingredients,
          cuisine: selectedCuisine,
          skillLevel,
          servings: 4
        });
        
        // Pass the AI-generated recipes to the parent component
        onSearch(ingredients, selectedCuisine, aiRecipes);
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
          <img 
            src="/An_AI_chef_with_a_spoon_and_a_fork_in_the_background-removebg-preview.png" 
            alt="Nutriloom AI Chef" 
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="mb-4">
          <span className="text-lg text-slate-400">Welcome back, </span>
          <span className="text-2xl font-semibold text-orange-400">{user.name}!</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          What's in your kitchen?
        </h1>
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
        <div className="mb-6">
          <label className="block text-lg font-semibold text-white mb-3">
            Add your ingredients
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type an ingredient (e.g., chicken, rice, tomatoes)"
                className="w-full px-4 py-3 text-lg border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 bg-slate-700/80 text-white placeholder-slate-400"
              />
            </div>
            <button
              onClick={addIngredient}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

        {/* Upload Photo Option */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="w-full py-4 border-2 border-dashed border-slate-600 rounded-xl hover:border-indigo-400 hover:bg-slate-700/50 transition-all duration-200 flex items-center justify-center gap-3 text-slate-300 hover:text-indigo-400 cursor-pointer"
            >
              {uploadedImage ? <Upload size={24} /> : <Camera size={24} />}
              <span className="text-lg">
                {uploadedImage ? `Uploaded: ${uploadedImage.name}` : 'Or upload a photo of your ingredients'}
              </span>
            </label>
          </div>
        </div>

        {/* Selected Ingredients */}
        {ingredients.length > 0 && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-3">
              Your ingredients ({ingredients.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="text-emerald-600 hover:text-emerald-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skill Level Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-white mb-3">
            Cooking skill level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {skillLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setSkillLevel(level.value as 'beginner' | 'pro' | 'legendary')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  skillLevel === level.value
                    ? 'border-indigo-400 bg-indigo-500 bg-opacity-20 text-indigo-400'
                    : 'border-slate-600 bg-slate-700/80 text-slate-300 hover:border-indigo-400 hover:bg-indigo-500 hover:bg-opacity-10'
                }`}
              >
                <div className="font-semibold">{level.label}</div>
                <div className="text-sm opacity-80">{level.description}</div>
                {level.value === 'legendary' && (
                  <div className={`text-xs mt-1 ${
                    user.plan === 'pro' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {user.plan === 'pro' ? '✅ Available' : '⭐ Pro Plan Required'}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Add Popular Ingredients */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-lg font-semibold text-white">
              Quick add popular ingredients
            </label>
            <button
              onClick={refreshPopularIngredients}
              className="flex items-center gap-2 px-3 py-1 text-sm text-slate-300 hover:text-indigo-400 transition-colors duration-200"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {currentIngredientSet.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => addPopularIngredient(ingredient)}
                disabled={ingredients.includes(ingredient)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  ingredients.includes(ingredient)
                    ? 'bg-slate-700/80 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700/80 text-slate-300 hover:bg-indigo-600 hover:text-white'
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine Filter */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-white mb-3">
            Preferred cuisine (optional)
          </label>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 bg-slate-700/80 text-white"
          >
            {cuisines.map((cuisine) => (
              <option key={cuisine.value} value={cuisine.value}>
                {cuisine.label}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Recipes Button */}
        <button
          onClick={handleSearch}
          disabled={ingredients.length === 0 || isGenerating}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
            ingredients.length > 0 && !isGenerating
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={24} className="animate-spin" />
              Generating Recipes...
            </>
          ) : (
            <>
              <Sparkles size={24} />
              Generate Amazing Recipes
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