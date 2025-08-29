import React, { useState } from 'react';
import { Edit3, Crown, Star, Sparkles } from 'lucide-react';
import { User } from '../types/User';

interface HomePageProps {
  onSearch: (ingredients: string[], cuisine: string) => void;
  user: User;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch, user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-80"></div>
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-indigo-400 rounded-full opacity-70"></div>
      <div className="absolute top-60 right-40 w-2 h-2 bg-blue-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-60 right-10 w-1 h-1 bg-purple-300 rounded-full opacity-60"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full">
              <Sparkles size={16} className="text-indigo-400" />
              <span className="text-indigo-300 text-sm font-medium">AI-Powered Recipe Generation</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Magical </span>
                <span className="text-blue-400">Recipes</span>
                <br />
                <span className="text-white">for </span>
                <span className="text-purple-400">Food</span>
                <br />
                <span className="text-blue-400">Lovers</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                Create personalized, delicious recipes that spark culinary creativity and bring joy to your kitchen. Our advanced AI crafts unique dishes tailored to your taste preferences and cooking style.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onSearch([], 'all')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Edit3 size={20} />
                Create Your Recipe
              </button>
              
              <button
                onClick={() => {/* Navigate to premium */}}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-700/60 hover:text-white transition-all duration-200"
              >
                <Crown size={20} />
                Explore Premium
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Main Image Container */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-6 border border-indigo-500/20">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Delicious cooking and recipe creation"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl flex items-center justify-center">
                <Star size={24} className="text-indigo-400" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl flex items-center justify-center">
                <Sparkles size={24} className="text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">10K+</div>
            <div className="text-slate-400">Recipes Created</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">5K+</div>
            <div className="text-slate-400">Happy Cooks</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">4.9★</div>
            <div className="text-slate-400">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;