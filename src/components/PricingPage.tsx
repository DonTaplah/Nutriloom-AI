import React from 'react';
import { Check, X, Star, Zap } from 'lucide-react';

interface PricingPageProps {
  onSelectPlan: (plan: 'free' | 'pro') => void;
  currentPlan?: string;
}

export default function PricingPage({ onSelectPlan, currentPlan }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="gradient-text-primary">Find Your</span> <span className="gradient-text-secondary">Perfect Plan</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of Nutriloom AI. Choose the plan that fits your culinary aspirations and cooking journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">Basic</h3>
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <p className="text-slate-300 mb-8 text-lg">
              Perfect for getting started and casual recipe exploration.
            </p>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-white mb-2">Free</div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">Up to 3 recipe generations per day</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">Standard recipe complexity</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">Community support</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-lg">SYD - Scan Your Dish (AI Image Analysis)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-lg">AI Voice Assistant (Text-to-Speech)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-lg">Unlimited recipe generations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-lg">Legendary skill level recipes</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-lg">Advanced nutritional analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-lg">Recipe complexity & sophistication</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-lg">Priority customer support</span>
              </li>
            </ul>

            <button
              onClick={() => onSelectPlan('free')}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
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
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-500/50 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold gradient-text-blue">Pro</h3>
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <p className="gradient-text-slate mb-8 text-lg">
              For the passionate cook seeking unlimited creativity and advanced features.
            </p>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold gradient-text-blue">$3</span>
                <span className="gradient-text-slate text-xl">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">Everything in Basic, plus:</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">SYD - Scan Your Dish (AI Image Analysis)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300 text-lg">Complete nutritional breakdown & health scoring</span>
                  <span className="text-slate-400 text-sm">(Ingredient identification, dietary flags, allergens)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">AI Voice Assistant (Text-to-Speech for recipes)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">Unlimited recipe generations (no daily limits)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300 text-lg">Legendary skill level recipes</span>
                  <span className="text-slate-400 text-sm">(Restaurant-quality techniques & sophisticated culinary artistry)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300 text-lg">Advanced recipe complexity & detail</span>
                  <span className="text-slate-400 text-sm">(3x more detailed instructions & professional techniques)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300 text-lg">Priority customer support</span>
              </li>
            </ul>

            <button
              onClick={() => onSelectPlan('pro')}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-5xl font-bold gradient-text-white">1M+</div>
            <div className="gradient-text-slate text-lg">Recipes Created</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold gradient-text-white">100k+</div>
            <div className="gradient-text-slate text-lg">Happy Chef</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold gradient-text-white">4.2★</div>
            <div className="gradient-text-slate text-lg">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};