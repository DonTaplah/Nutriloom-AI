import React, { useState } from 'react';
import { Instagram, Twitter, Mail, Heart, Menu, X } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useRecipes } from './hooks/useRecipes';
import { useErrorHandler } from './hooks/useErrorHandler';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorToastContainer from './components/ErrorToastContainer';
import OfflineIndicator from './components/OfflineIndicator';
import NetworkStatus from './components/NetworkStatus';
import LoadingFallback from './components/LoadingFallback';
import AuthPage from './components/AuthPage';
import PricingPage from './components/PricingPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeGenerator from './components/RecipeGenerator';
import ScanYourDishPage from './components/VideoUploadPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import LocalBusinessSchema from './components/SEO/LocalBusinessSchema';
import LocalSEOHead from './components/SEO/LocalSEOHead';
import { Recipe } from './types/Recipe';

type View = 'auth' | 'home' | 'recipes' | 'detail' | 'pricing' | 'scan-dish' | 'generator' | 'my-recipes' | 'contact' | 'privacy';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading: authLoading, error: authError, signIn, signUp, signOut, updateUsageStats, upgradeToPro, setError: setAuthError } = useAuth();
  const { savedRecipes, saveRecipe, removeRecipe, isRecipeSaved } = useRecipes(user);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const { errorState, removeError, retryAction } = useErrorHandler();

  // Authentication handlers
  const handleLogin = async (email: string, password: string) => {
    setAuthError(null);
    await signIn(email, password);
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    setAuthError(null);
    await signUp(email, password, name);
  };

  const handleSelectPlan = (plan: 'free' | 'pro') => {
    if (plan === 'pro') {
      upgradeToPro();
    }
    setCurrentView('home');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentView('home');
  };

  const handleSetUser = (newUser: any) => {
    if (newUser === null || !newUser.isAuthenticated) {
      signOut();
    }
  };

  // Create a user object that matches the expected interface
  const appUser = user || {
    id: '',
    email: '',
    name: '',
    plan: 'free' as const,
    createdAt: new Date(),
    isAuthenticated: false,
    usageStats: {
      recipesGeneratedThisMonth: 0,
      lastResetDate: new Date()
    }
  };

  const handleGeneratedRecipes = async (ingredients: string[], cuisine: string, aiRecipes: Recipe[]) => {
    setSearchIngredients(ingredients);
    setSelectedCuisine(cuisine);
    setRecipes(aiRecipes);
    
    // Update usage stats for free users
    if (user && user.plan === 'free') {
      await updateUsageStats(user.usageStats.recipesGeneratedThisMonth + 1);
    }
    
    setCurrentView('recipes');
  };

  const handleLikeRecipe = async (recipe: Recipe) => {
    if (!user?.isAuthenticated) return;
    
    const isAlreadySaved = isRecipeSaved(recipe.id);
    
    if (isAlreadySaved) {
      await removeRecipe(recipe.id);
    } else {
      await saveRecipe(recipe);
    }
  };

  const isRecipeLiked = (recipeId: string) => {
    return isRecipeSaved(recipeId);
  };

  // Show loading screen while checking authentication
  if (authLoading) {
    return <LoadingFallback message="Loading your culinary experience..." size="lg" fullScreen />;
  }

  const handleHomePageSearch = (ingredients: string[], cuisine: string) => {
    setSearchIngredients(ingredients);
    setSelectedCuisine(cuisine);
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
      setCurrentView('generator');
    } else if (currentView === 'generator') {
      setCurrentView('home');
    } else if (currentView === 'pricing') {
      setCurrentView('home');
    } else if (currentView === 'scan-dish') {
      setCurrentView('home');
    } else if (currentView === 'my-recipes') {
      setCurrentView('home');
    } else if (currentView === 'contact') {
      setCurrentView('home');
    }
  };

  const handleMyRecipes = () => {
    setCurrentView('my-recipes');
  };

  // Mock AI recipe generation (keeping existing logic)
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
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
        {/* Global SEO and Schema Markup */}
        <LocalSEOHead />
        <LocalBusinessSchema />
        
        {/* Network Status Indicator */}
        <NetworkStatus />
        
        {/* Offline Indicator */}
        <OfflineIndicator />
        
        {/* Error Toast Container */}
        <ErrorToastContainer
          errors={errorState.errors}
          onDismiss={removeError}
          onRetry={(errorId) => {
            const error = errorState.errors.find(e => e.id === errorId);
            if (error?.retryable) {
              retryAction(async () => {
                // Implement retry logic based on error context
                if (error.context?.action === 'generateRecipes') {
                  // Retry recipe generation
                  window.location.reload();
                }
              }, errorId);
            }
          }}
        />
        
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onHome={() => setCurrentView('home')}
          onRecipeGenerator={() => setCurrentView('generator')}
          onMyRecipes={handleMyRecipes}
          onPricing={() => setCurrentView('pricing')}
          onScanDish={() => setCurrentView('scan-dish')}
          onContact={() => setCurrentView('contact')}
          user={appUser}
          onAuth={() => setCurrentView('auth')}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content */}
        <main className="lg:ml-64 min-h-screen">
          <ErrorBoundary fallback={
            <LoadingFallback 
              message="Something went wrong loading this page. Please try refreshing." 
              fullScreen 
            />
          }>
            {currentView === 'home' && (
              <HomePage 
                onSearch={handleHomePageSearch} 
                user={appUser} 
                onRecipeGenerator={() => setCurrentView('generator')}
                onScanDish={() => setCurrentView('scan-dish')}
                onPricing={() => setCurrentView('pricing')}
                onAuth={() => setCurrentView('auth')}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
            
            {currentView === 'generator' && (
              <RecipeGenerator 
                onRecipesGenerated={handleGeneratedRecipes}
                user={appUser}
                onPricing={() => setCurrentView('pricing')}
                onAuth={() => setCurrentView('auth')}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
            
            {currentView === 'pricing' && (
              <PricingPage 
                onSelectPlan={handleSelectPlan}
                currentPlan={appUser?.plan}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
            
            {currentView === 'recipes' && (
              <RecipeList 
                recipes={recipes}
                onRecipeSelect={handleRecipeSelect}
                searchIngredients={searchIngredients}
                selectedCuisine={selectedCuisine}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
            
            {currentView === 'detail' && selectedRecipe && (
              <div className="container mx-auto px-4 lg:px-8 py-8">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors duration-200 mb-6"
                >
                  ← Back to Recipes
                </button>
                <RecipeDetail 
                  recipe={selectedRecipe} 
                  onLike={handleLikeRecipe}
                  isLiked={isRecipeLiked(selectedRecipe.id)}
                  onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
              </div>
            )}
            
            {currentView === 'scan-dish' && (
              <ScanYourDishPage 
                onBack={handleBack} 
                user={appUser}
                onPricing={() => setCurrentView('pricing')}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
            
            {currentView === 'my-recipes' && (
              <div className="container mx-auto px-4 lg:px-8 py-8">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between mb-6 bg-slate-900/95 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      <Menu size={24} />
                    </button>
                  </div>
                  <h1 className="text-lg font-bold gradient-text-primary">My Recipes</h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentView('home')}
                      className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-8">My Recipes</h1>
                
                {savedRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        onClick={() => handleRecipeSelect(recipe)}
                        className="bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/30 hover:border-indigo-400/50 transition-colors duration-300 cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                          />
                          <div className="absolute top-3 right-3">
                            <Heart size={20} className="text-red-400" fill="currentColor" />
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">{recipe.name}</h3>
                          <p className="text-slate-300 text-sm mb-4">{recipe.cuisine} cuisine</p>
                          <div className="flex items-center justify-between text-slate-400 text-sm">
                            <span>{recipe.cookingTime + recipe.prepTime}m</span>
                            <span>{recipe.servings} servings</span>
                            <span>{recipe.nutrition.calories} cal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No recipes saved yet
                      </h3>
                      <p className="text-slate-400 mb-6">
                        Like recipes to add them to your personal collection
                      </p>
                      <button
                        onClick={() => setCurrentView('generator')}
                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200"
                      >
                        Create Your First Recipe
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {currentView === 'contact' && (
              <ContactPage onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            )}
            
            {currentView === 'privacy' && (
              <PrivacyPolicyPage 
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onBack={() => setCurrentView('home')}
              />
            )}
            
            {currentView === 'auth' && (
              <AuthPage
                onLogin={handleLogin}
                onSignup={handleSignup}
                isLoading={authLoading}
                error={authError}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <footer className="lg:ml-64 bg-slate-900/95 backdrop-blur-sm border-t border-indigo-500/20 py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center space-y-6">
              <div className="text-white font-semibold text-lg">
                NutriloomAI@2025 🖤🤍RT
              </div>
              
              <div className="flex items-center justify-center gap-6">
                <a href="https://www.instagram.com/nutriloomai" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://x.com/NutriloomAI" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="mailto:nutriloomai@gmail.com" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
              
              {/* Footer Links */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <button
                  onClick={() => setCurrentView('privacy')}
                  className="text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;