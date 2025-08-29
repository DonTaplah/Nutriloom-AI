import React, { useState } from 'react';
import { Edit3, Crown, Star, Sparkles, BookOpen, Shield, Archive } from 'lucide-react';
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

        {/* Why Choose Nutriloom AI Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            {/* Advanced AI Technology Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-8">
              <Sparkles size={16} className="text-indigo-400" />
              <span className="text-indigo-300 text-sm font-medium">Advanced AI Technology</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Food Lovers Choose <span className="text-blue-400">NUTRILOOM AI</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our cutting-edge AI creates personalized recipes that adapt to your taste preferences, dietary needs, and cooking skill level, making every meal a unique culinary adventure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI-Powered Personalization */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Personalization</h3>
              <p className="text-slate-300 leading-relaxed">
                Our advanced AI creates unique recipes tailored to your taste preferences, dietary restrictions, and cooking skill level, ensuring every recipe feels personally crafted.
              </p>
            </div>

            {/* Premium Recipe Quality */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Crown size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Recipe Quality</h3>
              <p className="text-slate-300 leading-relaxed">
                Premium subscribers enjoy longer, more detailed recipes with advanced cooking techniques and richer flavor development for restaurant-quality results.
              </p>
            </div>

            {/* Interactive Cooking Guide */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300 lg:border-indigo-500/50">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Star size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Cooking Guide</h3>
              <p className="text-slate-300 leading-relaxed">
                Built-in step-by-step guidance with cooking tips makes meal preparation magical, even when you're busy or trying new techniques.
              </p>
            </div>

            {/* Smart Ingredient Management */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Ingredient Management</h3>
              <p className="text-slate-300 leading-relaxed">
                Our AI analyzes your available ingredients and suggests creative recipes, reducing food waste while maximizing flavor combinations.
              </p>
            </div>

            {/* Safe & Secure */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Safe & Secure</h3>
              <p className="text-slate-300 leading-relaxed">
                Your dietary preferences and cooking data are protected with enterprise-grade security, ensuring your culinary journey remains private.
              </p>
            </div>

            {/* Recipe Library */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Archive size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Recipe Library</h3>
              <p className="text-slate-300 leading-relaxed">
                Access thousands of AI-generated recipes across all cuisines and dietary preferences, with new recipes added daily to inspire your cooking.
              </p>
            </div>
          </div>
        </div>

        {/* Unlock Premium Experience Section */}
        <div className="mt-32">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-indigo-500/30">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Crown size={40} className="text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Unlock Premium <span className="text-purple-400">Experience</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Take your culinary journey to the next level with unlimited AI-powered recipe generation, 
                legendary complexity levels, and exclusive premium features designed for passionate food lovers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {/* Navigate to pricing */}}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Upgrade to Premium
                </button>
                <button
                  onClick={() => {/* Show features */}}
                  className="px-8 py-4 bg-slate-800/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-700/60 hover:text-white transition-all duration-200"
                >
                  View Features
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our <span className="text-emerald-400">Chefs</span> Say
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of home cooks who've transformed their kitchens with Nutriloom AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Sarah M."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">Sarah M.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "Nutriloom AI has completely transformed my cooking! The recipes are always perfect and use exactly what I have in my fridge. It's like having a personal chef."
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Michael R."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">Michael R.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "The AI understands my dietary restrictions perfectly. Every recipe suggestion is not only delicious but also fits my health goals. Absolutely amazing!"
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Emily K."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">Emily K.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "I've tried many recipe apps, but nothing comes close to this. The legendary recipes are truly restaurant-quality. Worth every penny!"
              </p>
            </div>
          </div>
        </div>

        {/* Start Creating Section */}
        <div className="mt-32 mb-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Edit3 size={40} className="text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Creating <span className="text-blue-400">Today</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join thousands of home cooks who've discovered the joy of AI-powered recipe creation. 
              Transform your kitchen into a culinary playground with personalized recipes that inspire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onSearch([], 'all')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Create Your First Recipe
              </button>
              <button
                onClick={() => {/* Navigate to examples */}}
                className="px-8 py-4 bg-slate-800/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-700/60 hover:text-white transition-all duration-200"
              >
                View Recipe Examples
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;