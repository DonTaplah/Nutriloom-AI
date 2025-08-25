import React from 'react';
import { ChefHat, ArrowLeft, Home, CreditCard, User, LogOut } from 'lucide-react';
import { User as UserType } from '../types/User';

interface NavbarProps {
  currentView: string;
  onBack: () => void;
  onHome: () => void;
  user: UserType;
  onPricing: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onBack, onHome, user, onPricing, onLogout }) => {
  return (
    <nav className="bg-slate-900 shadow-lg border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {currentView !== 'home' && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            
            <button
              onClick={onHome}
              className="flex items-center space-x-3 text-orange-400 hover:text-orange-300 transition-colors duration-200"
            >
              <h1 className="text-xl font-bold hidden sm:block text-white">Nutriloom AI</h1>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Plan Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              user.plan === 'pro' 
                ? 'bg-amber-500 bg-opacity-20 text-amber-400 border border-amber-500' 
                : 'bg-emerald-500 bg-opacity-20 text-emerald-400 border border-emerald-500'
            }`}>
              {user.plan === 'pro' ? '⭐ Pro' : '🆓 Free'}
            </div>
            
            {/* Navigation Links */}
            <button
              onClick={onHome}
              className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors duration-200"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </button>
            
            <button
              onClick={onPricing}
              className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors duration-200"
            >
              <CreditCard size={20} />
              <span className="hidden sm:inline">Pricing</span>
            </button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-2 text-slate-300">
              <User size={20} />
              <span className="hidden sm:inline">{user.name}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-slate-300 hover:text-red-400 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;