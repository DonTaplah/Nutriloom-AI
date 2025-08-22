import React from 'react';
import { Clock, Users, Flame, Star } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-700 bg-green-100';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-100';
      case 'Hard':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div
      onClick={onSelect}
      className="bg-slate-800 border border-slate-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] overflow-hidden group"
    >
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-50 text-white">
            {recipe.cuisine}
          </span>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
          {recipe.name}
        </h3>

        {/* Recipe Stats */}
        <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.cookingTime + recipe.prepTime}min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} />
            <span>{recipe.nutrition.calories} cal</span>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-center">
            <div className="text-xs text-slate-500">Protein</div>
            <div className="text-sm font-semibold text-white">{recipe.nutrition.protein}g</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">Carbs</div>
            <div className="text-sm font-semibold text-white">{recipe.nutrition.carbs}g</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">Fat</div>
            <div className="text-sm font-semibold text-white">{recipe.nutrition.fat}g</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">Fiber</div>
            <div className="text-sm font-semibold text-white">{recipe.nutrition.fiber}g</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Recipe Button */}
        <button className="w-full py-2 bg-orange-500 bg-opacity-20 text-orange-400 rounded-lg font-medium hover:bg-orange-500 hover:bg-opacity-30 transition-colors duration-200 group-hover:bg-orange-500 group-hover:text-white">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;