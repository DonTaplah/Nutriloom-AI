import React from 'react';
import { Home, BookOpen, Archive, CreditCard, Scan, Crown } from 'lucide-react';
import { User } from '../types/User';

interface SidebarProps {
  currentView: string;
  onHome: () => void;
  onRecipeGenerator: () => void;
  onMyRecipes: () => void;
  onPricing: () => void;
  onScanDish: () => void;
  user: User | null;
  onAuth: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onHome,
  onRecipeGenerator,
  onMyRecipes,
  onPricing,
  onScanDish,
  user,
  onAuth
}) => {
  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      onClick: onHome,
      active: currentView === 'home'
    },
    {
      id: 'generator',
      label: 'Recipe Generator',
      icon: BookOpen,
      onClick: onRecipeGenerator,
      active: currentView === 'generator'
    },
    {
      id: 'my-recipes',
      label: 'My Recipes',
      icon: Archive,
      onClick: onMyRecipes,
      active: currentView === 'my-recipes'
    },
    {
      id: 'pricing',
      label: 'Pricing',
      icon: CreditCard,
      onClick: onPricing,
      active: currentView === 'pricing'
    },
    {
      id: 'syd',
      label: 'SYD',
      icon: Scan,
      onClick: user?.isAuthenticated ? (user.plan === 'pro' ? onScanDish : onPricing) : onAuth,
      active: currentView === 'scan-dish',
      isPro: true,
      disabled: !user?.isAuthenticated || user.plan !== 'pro'
    }
  ];

  return (
    <div className="w-64 bg-slate-900/95 backdrop-blur-sm border-r border-indigo-500/20 h-screen fixed left-0 top-0 z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <img 
            src="/An_AI_chef_with_a_spoon_and_a_fork_in_the_background-removebg-preview.png" 
            alt="Nutriloom AI" 
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-bold gradient-text-primary">NUTRILOOM AI</h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">Weaving nutrition into every meal</p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : item.disabled
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
                disabled={item.disabled}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {item.isPro && (
                  <div className="ml-auto flex items-center gap-1">
                    <Crown size={14} className="text-yellow-400" />
                    <span className="text-xs text-yellow-400">Pro</span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
        {user?.isAuthenticated ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/60 rounded-lg">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  {user.plan === 'pro' ? (
                    <>
                      <Crown size={12} className="text-yellow-400" />
                      Pro Plan
                    </>
                  ) : (
                    'Free Plan'
                  )}
                </p>
              </div>
            </div>
            {user?.plan === 'free' && (
              <button
                onClick={onPricing}
                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Upgrade to Pro
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={onAuth}
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;