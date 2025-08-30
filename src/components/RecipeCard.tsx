import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div
      onClick={() => onSelect(recipe)}
      className="bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/30 hover:border-indigo-400/50 transition-colors duration-200 cursor-pointer"
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {recipe.nutrition.calories} cal
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {recipe.name}
        </h3>
        
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
          A delicious {recipe.cuisine} dish that serves {recipe.servings} people
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-slate-400 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{recipe.cookingTime + recipe.prepTime}m</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{recipe.servings}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full text-xs border border-indigo-500/30"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="bg-slate-600/50 text-slate-400 px-2 py-1 rounded-full text-xs">
              +{recipe.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}