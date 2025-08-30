import React from 'react';
import { Check, X, Star, Zap, Menu } from 'lucide-react';

interface PricingPageProps {
  onSelectPlan: (plan: 'free' | 'pro') => void;
  currentPlan?: string;
  onToggleSidebar: () => void;
}

export default function PricingPage({ onSelectPlan, currentPlan, onToggleSidebar }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-8 lg:py-16 px-4">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-slate-900/95 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
        </div>
        <h1 className="text-lg font-bold gradient-text-primary">Pricing</h1>
        <div className="w-10"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 hidden lg:block">
            <span className="gradient-text-primary">Find Your</span> <span className="gradient-text-secondary">Perfect Plan</span>
          </h1>
          <p className="text-base lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
            Unlock the full potential of Nutriloom AI. Choose the plan that fits your culinary aspirations and cooking journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-600/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-white">Basic</h3>
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 lg:mb-8 text-base lg:text-lg">
              Perfect for getting started and casual recipe exploration.
            </p>
            
            <div className="mb-6 lg:mb-8">
              <div className="text-4xl lg:text-6xl font-bold text-white mb-2">Free</div>
            </div>

            <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">5 recipe generations per month</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">Standard recipe complexity</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">Community support</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm lg:text-lg">
                  <span className="hidden sm:inline">SYD - Scan Your Dish (AI Image Analysis)</span>
                  <span className="sm:hidden">SYD - Dish Scanning</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm lg:text-lg">
                  <span className="hidden sm:inline">AI Voice Assistant (Text-to-Speech)</span>
                  <span className="sm:hidden">AI Voice Assistant</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm lg:text-lg">Unlimited recipe generations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm lg:text-lg">Legendary skill level recipes</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm lg:text-lg">Advanced nutritional analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm lg:text-lg">
                  <span className="hidden sm:inline">Recipe complexity & sophistication</span>
                  <span className="sm:hidden">Recipe complexity</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm lg:text-lg">Priority customer support</span>
              </li>
            </ul>

            <button
              onClick={() => onSelectPlan('free')}
              className={`w-full py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg transition-all ${
                currentPlan === 'free'
                  ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              disabled={currentPlan === 'free'}
            >
              {currentPlan === 'free' ? 'Currently Active' : 'Get Started'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border-2 border-blue-500/50 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold gradient-text-blue">Pro</h3>
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <p className="gradient-text-slate mb-6 lg:mb-8 text-base lg:text-lg">
              For the passionate cook seeking unlimited creativity and advanced features.
            </p>
            
            <div className="mb-6 lg:mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl lg:text-6xl font-bold gradient-text-blue">$4.99</span>
                <span className="gradient-text-slate text-lg lg:text-xl">/month</span>
              </div>
            </div>

            <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">Everything in Basic, plus:</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">
                  <span className="hidden sm:inline">SYD - Scan Your Dish (AI Image Analysis)</span>
                  <span className="sm:hidden">SYD - Dish Scanning</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300 text-sm lg:text-lg">
                    <span className="hidden sm:inline">Complete nutritional breakdown & health scoring</span>
                    <span className="sm:hidden">Nutritional analysis & health scoring</span>
                  </span>
                  <span className="text-slate-400 text-sm">(Ingredient identification, dietary flags, allergens)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">
                  <span className="hidden sm:inline">AI Voice Assistant (Text-to-Speech for recipes)</span>
                  <span className="sm:hidden">AI Voice Assistant</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">
                  <span className="hidden sm:inline">Unlimited recipe generations (no daily limits)</span>
                  <span className="sm:hidden">Unlimited recipe generations</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300 text-sm lg:text-lg">Legendary skill level recipes</span>
                  <span className="text-slate-400 text-sm">(Restaurant-quality techniques & sophisticated culinary artistry)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300 text-sm lg:text-lg">
                    <span className="hidden sm:inline">Advanced recipe complexity & detail</span>
                    <span className="sm:hidden">Advanced recipe complexity</span>
                  </span>
                  <span className="text-slate-400 text-sm">(3x more detailed instructions & professional techniques)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-sm lg:text-lg">Priority customer support</span>
              </li>
            </ul>

            <button
              onClick={() => onSelectPlan('pro')}
              className="w-full py-3 lg:py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold text-base lg:text-lg hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl lg:text-5xl font-bold gradient-text-white">1M+</div>
            <div className="gradient-text-slate text-base lg:text-lg">Recipes Created</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-5xl font-bold gradient-text-white">100k+</div>
            <div className="gradient-text-slate text-base lg:text-lg">Happy Chef</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-5xl font-bold gradient-text-white">4.2★</div>
            <div className="gradient-text-slate text-base lg:text-lg">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};