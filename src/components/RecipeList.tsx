import React, { useState } from 'react';
import { Filter, Clock, Users, TrendingUp, Menu } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  searchIngredients: string[];
  selectedCuisine: string;
  onToggleSidebar: () => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  onRecipeSelect, 
  searchIngredients,
  selectedCuisine,
  onToggleSidebar
}) => {
  const [sortBy, setSortBy] = useState<'time' | 'difficulty' | 'calories'>('time');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const sortedAndFilteredRecipes = Array.isArray(recipes) ? recipes
    .filter(recipe => 
      filterDifficulty === 'all' || recipe.difficulty.toLowerCase() === filterDifficulty
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return (a.cookingTime + a.prepTime) - (b.cookingTime + b.prepTime);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'calories':
          return a.nutrition.calories - b.nutrition.calories;
        default:
          return 0;
      }
    }) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-slate-900/95 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
        </div>
        <h1 className="text-lg font-bold gradient-text-primary">Recipe Results</h1>
        <div className="w-10"></div>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 hidden lg:flex">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Recipe Suggestions
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <TrendingUp size={16} />
          <span>AI-powered matches</span>
        </div>
      </div>
        
        {/* Recipe Count and Disclaimer */}
        <div className="mb-4">
          <p className="text-slate-300 mb-3 text-sm lg:text-base">
            Found {Array.isArray(recipes) ? recipes.length : 0} recipes using your ingredients
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 lg:px-4 py-3">
            <p className="text-yellow-400 text-sm">
              <strong>Disclaimer:</strong> Recipe photos may not match the actual recipe. Still working on it. Thanks!
            </p>
          </div>
        </div>

        {/* Search Summary */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-3 lg:p-4 shadow-sm border border-indigo-500/30 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-sm font-medium text-slate-300">Your ingredients:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {searchIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs lg:text-sm"
                  >
                    {typeof ingredient === 'string' ? ingredient : ingredient.name}
                  </span>
                ))}
              </div>
            </div>
            {selectedCuisine !== 'all' && (
              <div>
                <span className="text-sm font-medium text-slate-300">Cuisine:</span>
                <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs lg:text-sm capitalize">
                  {selectedCuisine}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-indigo-500/30 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-slate-400" />
            <span className="font-medium text-slate-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'time' | 'difficulty' | 'calories')}
              className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-400 bg-slate-700/80 text-white text-sm lg:text-base"
            >
              <option value="time">Cooking Time</option>
              <option value="difficulty">Difficulty</option>
              <option value="calories">Calories</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">Difficulty:</span>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-400 bg-slate-700/80 text-white text-sm lg:text-base"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

      {/* Recipe Grid */}
      {sortedAndFilteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {sortedAndFilteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={() => onRecipeSelect(recipe)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍳</div>
          <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">
            No recipes found
          </h3>
          <p className="text-slate-400 text-sm lg:text-base">
            Try adjusting your filters or adding different ingredients
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;