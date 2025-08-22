import React, { useState } from 'react';
import { Clock, Users, ChefHat, Flame, Heart, Share, CheckCircle2, Circle } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleStep = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(i => i !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

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
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isFavorited ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-100 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-blue-50 hover:text-blue-500 transition-colors duration-200">
                  <Share size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
            <p className="text-gray-600 mb-6">{recipe.cuisine} cuisine</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-orange-500" />
                <div>
                  <div className="text-sm text-gray-500">Total Time</div>
                  <div className="font-semibold">{recipe.cookingTime + recipe.prepTime} min</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-emerald-500" />
                <div>
                  <div className="text-sm text-gray-500">Servings</div>
                  <div className="font-semibold">{recipe.servings}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat size={20} className="text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500">Prep Time</div>
                  <div className="font-semibold">{recipe.prepTime} min</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-red-500" />
                <div>
                  <div className="text-sm text-gray-500">Cook Time</div>
                  <div className="font-semibold">{recipe.cookingTime} min</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ingredients & Nutrition */}
        <div className="lg:col-span-1 space-y-6">
          {/* Ingredients */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nutrition (per serving)</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calories</span>
                <span className="font-semibold text-lg">{recipe.nutrition.calories}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Protein</span>
                <span className="font-semibold">{recipe.nutrition.protein}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Carbohydrates</span>
                <span className="font-semibold">{recipe.nutrition.carbs}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fat</span>
                <span className="font-semibold">{recipe.nutrition.fat}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fiber</span>
                <span className="font-semibold">{recipe.nutrition.fiber}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Instructions</h2>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-lg border-2 transition-all duration-200 ${
                    completedSteps.includes(index)
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                  }`}
                >
                  <button
                    onClick={() => toggleStep(index)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      completedSteps.includes(index)
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle2 size={20} className="w-full h-full" />
                    ) : (
                      <Circle size={20} className="w-full h-full" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-orange-600">Step {index + 1}</span>
                    </div>
                    <p className={`text-gray-700 leading-relaxed ${
                      completedSteps.includes(index) ? 'line-through text-gray-500' : ''
                    }`}>
                      {instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Completion Progress */}
            {completedSteps.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-medium">
                    Progress: {completedSteps.length} of {recipe.instructions.length} steps completed
                  </span>
                  <span className="text-green-600">
                    {Math.round((completedSteps.length / recipe.instructions.length) * 100)}%
                  </span>
                </div>
                <div className="mt-2 bg-green-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSteps.length / recipe.instructions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;