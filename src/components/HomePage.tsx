import React, { useState } from 'react';
import { Search, Camera, Utensils, Sparkles, Plus, X, RefreshCw, Upload } from 'lucide-react';

interface HomePageProps {
  onSearch: (ingredients: string[], cuisine: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

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

  const alternativeIngredients = [
    'Salmon', 'Quinoa', 'Spinach', 'Avocado', 'Lemon', 'Ginger',
    'Broccoli', 'Sweet Potato', 'Black Beans', 'Coconut Milk', 'Tofu', 'Carrots'
  ];

  const [currentPopularIngredients, setCurrentPopularIngredients] = useState(popularIngredients);
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
    setCurrentPopularIngredients(
      currentPopularIngredients === popularIngredients 
        ? alternativeIngredients 
        : popularIngredients
    );
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
        <h1 className="text-5xl font-bold text-white mb-4">
          What's in your kitchen?
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Turn your available ingredients into delicious recipes with AI-powered suggestions. 
          Just tell us what you have, and we'll create magic!
        </p>
      </div>

      {/* Main Input Section */}
      <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-700">
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
                className="w-full px-4 py-3 text-lg border-2 border-slate-600 rounded-xl focus:border-orange-400 focus:outline-none transition-colors duration-200 bg-slate-700 text-white placeholder-slate-400"
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
              className="w-full py-4 border-2 border-dashed border-slate-600 rounded-xl hover:border-orange-400 hover:bg-slate-700 transition-all duration-200 flex items-center justify-center gap-3 text-slate-300 hover:text-orange-400 cursor-pointer"
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

        {/* Quick Add Popular Ingredients */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-lg font-semibold text-white">
              Quick add popular ingredients
            </label>
            <button
              onClick={refreshPopularIngredients}
              className="flex items-center gap-2 px-3 py-1 text-sm text-slate-300 hover:text-orange-400 transition-colors duration-200"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {currentPopularIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => addPopularIngredient(ingredient)}
                disabled={ingredients.includes(ingredient)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  ingredients.includes(ingredient)
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700 text-slate-300 hover:bg-orange-600 hover:text-white'
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
            className="w-full px-4 py-3 text-lg border-2 border-slate-600 rounded-xl focus:border-orange-400 focus:outline-none transition-colors duration-200 bg-slate-700 text-white"
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
        <div className="text-center p-6 bg-slate-800 rounded-xl shadow-md border border-slate-700">
          <div className="w-12 h-12 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Smart Matching</h3>
          <p className="text-slate-300">AI finds the perfect recipes using your available ingredients</p>
        </div>
        
        <div className="text-center p-6 bg-slate-800 rounded-xl shadow-md border border-slate-700">
          <div className="w-12 h-12 bg-emerald-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils size={24} className="text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Step-by-Step</h3>
          <p className="text-slate-300">Clear instructions and cooking tips for perfect results</p>
        </div>
        
        <div className="text-center p-6 bg-slate-800 rounded-xl shadow-md border border-slate-700">
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