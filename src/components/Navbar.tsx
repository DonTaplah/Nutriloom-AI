import React from 'react';
import { ChefHat, ArrowLeft, Home } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onBack: () => void;
  onHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onBack, onHome }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-orange-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {currentView !== 'home' && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            
            <button
              onClick={onHome}
              className="flex items-center space-x-3 text-orange-600 hover:text-orange-700 transition-colors duration-200"
            >
              <ChefHat size={28} />
              <h1 className="text-xl font-bold hidden sm:block">Nutriloom</h1>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
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