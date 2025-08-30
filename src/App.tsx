import React, { useState } from 'react';
import { Instagram, Twitter, Mail } from 'lucide-react';
import AuthPage from './components/AuthPage';
import PricingPage from './components/PricingPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeGenerator from './components/RecipeGenerator';
import ScanYourDishPage from './components/VideoUploadPage';
import { Recipe } from './types/Recipe';
import { User } from './types/User';

type View = 'auth' | 'home' | 'recipes' | 'detail' | 'pricing' | 'scan-dish' | 'generator' | 'my-recipes';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'demo@nutriloom.ai',
    name: 'Demo User',
    plan: 'free',
    createdAt: new Date(),
    isAuthenticated: false
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');

  // Mock authentication functions
  const handleLogin = async (email: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        plan: 'free',
        createdAt: new Date(),
        isAuthenticated: true
      };
      
      setUser(mockUser);
      setCurrentView('home');
    } catch (error) {
      setAuthError('Invalid credentials. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        email,
        name,
        plan: 'free',
        createdAt: new Date(),
        isAuthenticated: true
      };
      
      setUser(mockUser);
      setCurrentView('home');
    } catch (error) {
      setAuthError('Failed to create account. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSelectPlan = (plan: 'free' | 'pro') => {
    if (user) {
      setUser({ ...user, plan });
      setCurrentView('home');
    }
  };

  const handleSearch = (ingredients: string[], cuisine: string, aiRecipes?: Recipe[]) => {
    setSearchIngredients(ingredients);
    setSelectedCuisine(cuisine);
    
    if (aiRecipes) {
      // Use AI-generated recipes
      setRecipes(aiRecipes);
    } else {
      // Fallback to mock recipes
      const generatedRecipes = generateRecipes(ingredients, cuisine);
      setRecipes(generatedRecipes);
    }
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
      setCurrentView('generator');
    } else if (currentView === 'generator') {
      setCurrentView('home');
    } else if (currentView === 'pricing') {
      setCurrentView('home');
    } else if (currentView === 'scan-dish') {
      setCurrentView('home');
    } else if (currentView === 'my-recipes') {
      setCurrentView('home');
    }
  };

  const handleMyRecipes = () => {
    // For now, just show a placeholder - you can implement this later
    setCurrentView('my-recipes');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onHome={() => setCurrentView('home')}
        onRecipeGenerator={() => setCurrentView('generator')}
        onMyRecipes={handleMyRecipes}
        onPricing={() => setCurrentView('pricing')}
        onScanDish={() => setCurrentView('scan-dish')}
        user={user}
        onAuth={() => setCurrentView('auth')}
      />
      
      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {currentView === 'home' && (
          <HomePage 
            onSearch={handleSearch} 
            user={user} 
            onRecipeGenerator={() => setCurrentView('generator')}
            onScanDish={() => setCurrentView('scan-dish')}
            onPricing={() => setCurrentView('pricing')}
            onAuth={() => setCurrentView('auth')}
          />
        )}
        
        {currentView === 'generator' && (
          <RecipeGenerator 
            onRecipesGenerated={handleSearch}
            user={user}
            onPricing={() => setCurrentView('pricing')}
            onAuth={() => setCurrentView('auth')}
          />
        )}
        
        {currentView === 'pricing' && (
          <PricingPage 
            onSelectPlan={handleSelectPlan}
            currentPlan={user.plan}
          />
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
        
        {currentView === 'scan-dish' && (
          <ScanYourDishPage 
            onBack={handleBack} 
            user={user}
            onPricing={() => setCurrentView('pricing')}
          />
        )}
        
        {currentView === 'my-recipes' && (
          <div className="container mx-auto px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">My Recipes</h1>
              <p className="text-slate-300 text-lg mb-8">
                Your saved and created recipes will appear here.
              </p>
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No recipes saved yet
                </h3>
                <p className="text-slate-400 mb-6">
                  Start creating recipes to build your personal collection
                </p>
                <button
                  onClick={() => setCurrentView('generator')}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Create Your First Recipe
                </button>
              </div>
            </div>
          </div>
        )}
        
        {currentView === 'auth' && (
          <AuthPage
            onLogin={handleLogin}
            onSignup={handleSignup}
            isLoading={authLoading}
            error={authError}
          />
        )}
      
        {/* Footer */}
        <footer className="bg-slate-900/95 backdrop-blur-sm border-t border-indigo-500/20 py-4">
          <div className="container mx-auto px-8 text-center">
            <p className="text-slate-400 text-sm">
              Nutriloom AI @2025🖤🤍RT
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <a 
                href="https://www.instagram.com/nutriloomai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://x.com/NutriloomAI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:nutriloomai@gmail.com" 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nutriloomai@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-400 transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;