import React, { useState } from 'react';
import { Filter, Clock, Users, TrendingUp } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  searchIngredients: string[];
  selectedCuisine: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  onRecipeSelect, 
  searchIngredients,
  selectedCuisine 
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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <TrendingUp size={16} />
            <span>AI-powered matches</span>
          </div>
        </div>
        
        {/* Recipe Count and Disclaimer */}
        <div className="mb-4">
          <p className="text-slate-300 mb-3">
            Found {Array.isArray(recipes) ? recipes.length : 0} recipes using your ingredients
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3">
            <p className="text-yellow-400 text-sm">
              <strong>Disclaimer:</strong> Recipe photos may not match the actual recipe. Still working on it. Thanks!
            </p>
          </div>
        </div>

        {/* Search Summary */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-indigo-500/30 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-sm font-medium text-slate-300">Your ingredients:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {searchIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs"
                  >
                    {typeof ingredient === 'string' ? ingredient : ingredient.name}
                  </span>
                ))}
              </div>
            </div>
            {selectedCuisine !== 'all' && (
              <div>
                <span className="text-sm font-medium text-slate-300">Cuisine:</span>
                <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs capitalize">
                  {selectedCuisine}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-indigo-500/30">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-slate-400" />
            <span className="font-medium text-slate-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'time' | 'difficulty' | 'calories')}
              className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-400 bg-slate-700/80 text-white"
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
              className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-400 bg-slate-700/80 text-white"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      {sortedAndFilteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <h3 className="text-xl font-semibold text-white mb-2">
            No recipes found
          </h3>
          <p className="text-slate-400">
            Try adjusting your filters or adding different ingredients
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;