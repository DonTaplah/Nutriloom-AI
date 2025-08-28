import React from 'react';
import { Check, X, Star, Zap } from 'lucide-react';

interface PricingPageProps {
  onSelectPlan: (plan: string) => void;
  currentPlan?: string;
}

export default function PricingPage({ onSelectPlan, currentPlan }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-400 mb-6">
            Find Your Perfect Plan
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Unlock the full potential of Recipe AI. Choose the plan that fits your culinary aspirations.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">Basic</h3>
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            
            <p className="text-slate-300 mb-6">
              Perfect for getting started and casual recipe exploration.
            </p>
            
            <div className="mb-8">
              <div className="text-5xl font-bold text-white mb-2">Free</div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">Up to 3 recipe generations per day</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">Standard recipe complexity</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">Community support</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-400">AI Voice Assistant</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-400">Unlimited recipe generations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-400">Access to premium recipe features</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-400">Priority support</span>
              </li>
            </ul>

            <button
              onClick={() => onSelectPlan('basic')}
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                currentPlan === 'basic'
                  ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              disabled={currentPlan === 'basic'}
            >
              {currentPlan === 'basic' ? 'Currently Active' : 'Get Started'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-500/50 relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-blue-400">Pro</h3>
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            
            <p className="text-slate-300 mb-6">
              For the passionate cook seeking unlimited creativity and advanced features.
            </p>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-blue-400">$3</span>
                <span className="text-slate-400">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">
                  <span className="line-through text-slate-500">Up to 3 recipe generations per day</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">Advanced Recipe Generation Engine</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">Community support</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">AI Voice Assistant</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">Unlimited recipe generations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300">Access to premium recipe features</span>
                  <span className="text-slate-400 text-sm">(Legendary - sophisticated culinary artistry)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">Priority support</span>
              </li>
            </ul>

            <button
              onClick={() => onSelectPlan('pro')}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}