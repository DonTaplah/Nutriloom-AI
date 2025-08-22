import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import { Recipe } from './types/Recipe';

type View = 'home' | 'recipes' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');

  const handleSearch = (ingredients: string[], cuisine: string) => {
    setSearchIngredients(ingredients);
    setSelectedCuisine(cuisine);
    // This would normally call your AI API
    const generatedRecipes = generateRecipes(ingredients, cuisine);
    setRecipes(generatedRecipes);
    setCurrentView('recipes');
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('detail');
  };

  const handleBack = () => {
    if (currentView === 'detail') {
      setCurrentView('recipes');
    } else if (currentView === 'recipes') {
      setCurrentView('home');
    }
  };

  // Mock AI recipe generation
  const generateRecipes = (ingredients: string[], cuisine: string): Recipe[] => {
    const mockRecipes: Recipe[] = [
      {
        id: '1',
        name: 'Mediterranean Herb Chicken',
        cookingTime: 25,
        prepTime: 10,
        servings: 4,
        cuisine: 'Mediterranean',
        difficulty: 'Easy',
        image: 'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: [
          '4 chicken breasts',
          '2 tbsp olive oil',
          '1 lemon (juiced)',
          '2 cloves garlic (minced)',
          '1 tsp oregano',
          '1 tsp thyme',
          'Salt and pepper to taste'
        ],
        instructions: [
          'Preheat oven to 400°F (200°C).',
          'In a bowl, mix olive oil, lemon juice, garlic, oregano, and thyme.',
          'Season chicken breasts with salt and pepper.',
          'Place chicken in a baking dish and pour the herb mixture over it.',
          'Bake for 20-25 minutes until internal temperature reaches 165°F.',
          'Let rest for 5 minutes before serving.'
        ],
        nutrition: {
          calories: 285,
          protein: 42,
          carbs: 3,
          fat: 11,
          fiber: 1
        },
        tags: ['High Protein', 'Low Carb', 'Gluten Free']
      },
      {
        id: '2',
        name: 'Spicy Thai Basil Stir Fry',
        cookingTime: 15,
        prepTime: 10,
        servings: 2,
        cuisine: 'Thai',
        difficulty: 'Medium',
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: [
          '1 lb ground chicken',
          '3 cloves garlic (minced)',
          '2 Thai chilies (minced)',
          '1 cup Thai basil leaves',
          '2 tbsp fish sauce',
          '1 tbsp soy sauce',
          '1 tsp sugar',
          '2 tbsp vegetable oil'
        ],
        instructions: [
          'Heat oil in a large wok or skillet over high heat.',
          'Add garlic and chilies, stir-fry for 30 seconds until fragrant.',
          'Add ground chicken and break it up with a spatula.',
          'Cook for 5-7 minutes until chicken is almost cooked through.',
          'Add fish sauce, soy sauce, and sugar. Stir well.',
          'Add Thai basil and stir-fry for 1-2 minutes until wilted.',
          'Serve immediately over jasmine rice.'
        ],
        nutrition: {
          calories: 320,
          protein: 35,
          carbs: 8,
          fat: 16,
          fiber: 2
        },
        tags: ['Spicy', 'Quick & Easy', 'Asian']
      },
      {
        id: '3',
        name: 'Creamy Mushroom Risotto',
        cookingTime: 30,
        prepTime: 15,
        servings: 4,
        cuisine: 'Italian',
        difficulty: 'Medium',
        image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: [
          '1½ cups Arborio rice',
          '4 cups warm chicken broth',
          '1 cup mixed mushrooms (sliced)',
          '½ cup white wine',
          '1 medium onion (diced)',
          '3 cloves garlic (minced)',
          '½ cup Parmesan cheese',
          '2 tbsp butter',
          '2 tbsp olive oil'
        ],
        instructions: [
          'Heat olive oil in a large pan and sauté mushrooms until golden. Set aside.',
          'In the same pan, melt 1 tbsp butter and sauté onion until translucent.',
          'Add garlic and rice, stirring for 2 minutes until rice is lightly toasted.',
          'Pour in wine and stir until absorbed.',
          'Add warm broth one ladle at a time, stirring constantly until absorbed.',
          'Continue for 18-20 minutes until rice is creamy and al dente.',
          'Stir in mushrooms, remaining butter, and Parmesan cheese.',
          'Season with salt and pepper, serve immediately.'
        ],
        nutrition: {
          calories: 380,
          protein: 12,
          carbs: 58,
          fat: 12,
          fiber: 2
        },
        tags: ['Comfort Food', 'Vegetarian', 'Creamy']
      }
    ];

    // Filter by cuisine if not 'all'
    if (cuisine !== 'all') {
      return mockRecipes.filter(recipe => 
        recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
      );
    }

    return mockRecipes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navbar 
        currentView={currentView} 
        onBack={handleBack}
        onHome={() => setCurrentView('home')}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <HomePage onSearch={handleSearch} />
        )}
        
        {currentView === 'recipes' && (
          <RecipeList 
            recipes={recipes}
            onRecipeSelect={handleRecipeSelect}
            searchIngredients={searchIngredients}
            selectedCuisine={selectedCuisine}
          />
        )}
        
        {currentView === 'detail' && selectedRecipe && (
          <RecipeDetail recipe={selectedRecipe} />
        )}
      </main>
    </div>
  );
}

export default App;