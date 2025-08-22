import React, { useState } from 'react';
import { Search, Camera, Utensils, Sparkles, Plus, X } from 'lucide-react';

interface HomePageProps {
  onSearch: (ingredients: string[], cuisine: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('all');

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

  const popularIngredients = [
    'Chicken', 'Rice', 'Tomatoes', 'Onions', 'Garlic', 'Olive Oil',
    'Pasta', 'Cheese', 'Bell Peppers', 'Mushrooms', 'Eggs', 'Potatoes'
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients, selectedCuisine);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-4">
            <Utensils size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          What's in your kitchen?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Turn your available ingredients into delicious recipes with AI-powered suggestions. 
          Just tell us what you have, and we'll create magic!
        </p>
      </div>

      {/* Main Input Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
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
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
              />
            </div>
            <button
              onClick={addIngredient}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

        {/* Upload Photo Option */}
        <div className="mb-6">
          <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 flex items-center justify-center gap-3 text-gray-600 hover:text-orange-600">
            <Camera size={24} />
            <span className="text-lg">Or upload a photo of your ingredients</span>
          </button>
        </div>

        {/* Selected Ingredients */}
        {ingredients.length > 0 && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
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

        {/* Quick Add Popular Ingredients */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Quick add popular ingredients
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {popularIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => addPopularIngredient(ingredient)}
                disabled={ingredients.includes(ingredient)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  ingredients.includes(ingredient)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine Filter */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Preferred cuisine (optional)
          </label>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
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
          disabled={ingredients.length === 0}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
            ingredients.length > 0
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Sparkles size={24} />
          Generate Amazing Recipes
        </button>
      </div>

      {/* Features Preview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Matching</h3>
          <p className="text-gray-600">AI finds the perfect recipes using your available ingredients</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils size={24} className="text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Step-by-Step</h3>
          <p className="text-gray-600">Clear instructions and cooking tips for perfect results</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Nutrition Info</h3>
          <p className="text-gray-600">Get detailed nutritional breakdown for every recipe</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;