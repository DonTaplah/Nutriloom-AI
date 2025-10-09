import React from 'react';
import { Sparkles, Menu } from 'lucide-react';

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

      <div className="max-w-4xl mx-auto flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="text-center space-y-8 px-4">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Coming Soon Message */}
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              <span className="gradient-text-primary">Coming</span> <span className="gradient-text-secondary">Soon</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4">
              Premium pricing plans are on the way!
            </p>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              For now, enjoy unlimited access to all Pro features completely free.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto pt-4">
            <span className="px-4 py-2 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-full text-slate-300 text-sm">
              ✨ Unlimited Recipes
            </span>
            <span className="px-4 py-2 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-full text-slate-300 text-sm">
              🔍 SYD - Dish Scanning
            </span>
            <span className="px-4 py-2 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-full text-slate-300 text-sm">
              🎯 All Pro Features
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
