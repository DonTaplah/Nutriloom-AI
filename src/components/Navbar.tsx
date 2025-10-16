import React from 'react';
import { ArrowLeft, Home, CreditCard, User, LogOut, Scan, BookOpen } from 'lucide-react';
import { User as UserType } from '../types/User';

interface NavbarProps {
  currentView: string;
  onBack: () => void;
  onHome: () => void;
  user: UserType | null;
  onPricing: () => void;
  onLogout: () => Promise<void>;
  onVideoUpload: () => void;
  onRecipeGenerator: () => void;
  setUser: (user: UserType | null) => void;
  onAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onBack, onHome, user, onPricing, onLogout, onVideoUpload, onRecipeGenerator, setUser, onAuth }) => {
  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-indigo-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onHome}
              className="flex items-center space-x-3 gradient-text-white hover:text-indigo-300 transition-colors duration-200"
            >
              <h1 className="text-xl font-bold gradient-text-primary">NUTRILOOM AI</h1>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            <button
              onClick={onHome}
              className="px-4 py-2 gradient-text-slate hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </button>
            
            <button
              onClick={onRecipeGenerator}
              className="hidden sm:block px-4 py-2 gradient-text-slate hover:text-white transition-colors duration-200 font-medium"
            >
              Recipe Generator
            </button>
            
            <button
              onClick={() => {/* Navigate to My Recipes */}}
              className="hidden sm:block px-4 py-2 gradient-text-slate hover:text-white transition-colors duration-200 font-medium"
            >
              My Recipes
            </button>
            
            <button
              onClick={onPricing}
              className="hidden sm:block px-4 py-2 gradient-text-slate hover:gradient-text-white transition-colors duration-200 font-medium"
            >
              Pricing
            </button>
            
            <button
              onClick={user?.isAuthenticated ? onVideoUpload : onAuth}
              className="px-3 py-2 transition-colors duration-200 font-medium text-sm sm:text-base gradient-text-slate hover:gradient-text-white"
            >
              SYD {!user?.isAuthenticated && '(Login)'}
            </button>
            
            {user?.isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-indigo-500/30">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span className="text-white text-sm font-medium">{user.name || user.email}</span>
                  <span className="text-xs text-indigo-300 font-semibold uppercase px-2 py-1 bg-indigo-500/20 rounded">
                    {user.plan}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuth}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;