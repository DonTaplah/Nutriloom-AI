import React from 'react';
import { ChefHat, ArrowLeft, Home } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onBack: () => void;
  onHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onBack, onHome }) => {
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
              <ChefHat size={28} />
              <h1 className="text-xl font-bold hidden sm:block text-white">Nutriloom</h1>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onHome}
              className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors duration-200"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;