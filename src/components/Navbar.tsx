import React from 'react';
import { ArrowLeft, Home, CreditCard, User, LogOut, Scan, BookOpen } from 'lucide-react';
import { User as UserType } from '../types/User';

interface NavbarProps {
  currentView: string;
  onBack: () => void;
  onHome: () => void;
  user: UserType;
  onPricing: () => void;
  onLogout: () => void;
  onVideoUpload: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onBack, onHome, user, onPricing, onLogout, onVideoUpload }) => {
  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-indigo-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {currentView !== 'home' && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-slate-300 hover:text-indigo-400 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            
            <button
              onClick={onHome}
              className="flex items-center space-x-3 text-white hover:text-indigo-300 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <img 
                  src="/An_AI_chef_with_a_spoon_and_a_fork_in_the_background-removebg-preview.png" 
                  alt="Nutriloom AI Chef" 
                  className="w-8 h-8 object-contain"
                />
                <h1 className="text-xl font-bold text-white">NUTRILOOM AI</h1>
              </div>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            <button
              onClick={onHome}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </button>
            
            <button
              onClick={() => {/* Navigate to Story Generator */}}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Recipe Generator
            </button>
            
            <button
              onClick={() => {/* Navigate to My Recipes */}}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              My Recipes
            </button>
            
            <button
              onClick={onPricing}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Pricing
            </button>
            
            <button
              onClick={onVideoUpload}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Sign In
            </button>
            
            <button
              onClick={() => {/* Handle Sign Up */}}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;