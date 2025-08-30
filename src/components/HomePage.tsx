import React, { useState } from 'react';
import { Edit3, Crown, Star, Sparkles, BookOpen, Shield, Archive, Scan } from 'lucide-react';
import { User } from '../types/User';

interface HomePageProps {
  onSearch: (ingredients: string[], cuisine: string) => void;
  user: User;
  onRecipeGenerator: () => void;
  onScanDish: () => void;
  onPricing: () => void;
  onAuth: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch, user, onRecipeGenerator, onScanDish, onPricing, onAuth }) => {
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
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight gradient-text-white">
                <span className="text-white">Weaving </span>
                <span className="text-blue-400">Nutrition</span>
                <br />
                <span className="text-white">Into </span>
                <span className="text-purple-400">Every</span>
                <span className="text-blue-400">Meal</span>
              </h1>

              <p className="text-xl gradient-text-slate leading-relaxed max-w-lg">
                Create personalized, delicious recipes that spark culinary creativity and bring joy to your kitchen. Our advanced AI crafts unique dishes tailored to your taste preferences and cooking style.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onRecipeGenerator}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Edit3 size={20} />
                Create Your Recipe
              </button>
              
              <button
                onClick={onScanDish}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  user.isAuthenticated && user.plan === 'pro' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700' 
                    : 'bg-slate-600 gradient-text-slate cursor-not-allowed'
                }`}
                disabled={!user.isAuthenticated || user.plan !== 'pro'}
              >
                <Scan size={20} />
                {user.isAuthenticated && user.plan === 'pro' ? 'SYD - Scan Your Dish' : 'SYD - Scan Your Dish (Pro Only)'}
              </button>
              
              <button
                onClick={onPricing}
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
            <div className="text-4xl font-bold gradient-text-white">1M+</div>
            <div className="gradient-text-slate">Recipes Created</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text-white">100K+</div>
            <div className="gradient-text-slate">Happy Chef</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text-white">4.2★</div>
            <div className="gradient-text-slate">User Rating</div>
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
            
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text-white mb-6">
              Why Food Lovers Choose <span className="gradient-text-primary">NUTRILOOM AI</span>
            </h2>
            <p className="text-xl gradient-text-slate max-w-3xl mx-auto">
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
              <h3 className="text-2xl font-bold gradient-text-white mb-4">Premium Recipe Quality</h3>
              <p className="gradient-text-slate leading-relaxed">
                Premium subscribers enjoy longer, more detailed recipes with advanced cooking techniques and richer flavor development for <span className="gradient-text-warm">restaurant-quality results</span>.
              </p>
            </div>

            {/* Interactive Cooking Guide */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300 lg:border-indigo-500/50">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Star size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold gradient-text-white mb-4">Interactive Cooking Guide</h3>
              <p className="gradient-text-slate leading-relaxed">
                Built-in step-by-step guidance with cooking tips makes meal preparation magical, even when you're busy or trying new techniques.
              </p>
            </div>

            {/* Smart Ingredient Management */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold gradient-text-white mb-4">Smart Ingredient Management</h3>
              <p className="gradient-text-slate leading-relaxed">
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
              <h3 className="text-2xl font-bold gradient-text-white mb-4">Recipe Library</h3>
              <p className="gradient-text-slate leading-relaxed">
                Access thousands of AI-generated recipes across all cuisines and dietary preferences, with new recipes added daily to inspire your cooking.
              </p>
            </div>
          </div>
        </div>

        {/* Unlock Premium Experience Section */}
        <div className="mt-32">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-indigo-500/30">
            <div className="flex flex-col lg:flex-row">
              {/* Left Content */}
              <div className="lg:w-1/2 p-12">
                {/* Premium Experience Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-8">
                  <Crown size={16} className="text-indigo-400" />
                  <span className="text-indigo-300 text-sm font-medium">Premium Experience</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  <span className="gradient-text-primary">Unlock Premium</span><br />
                  <span className="gradient-text-secondary">Recipe Creation</span>
                </h2>
                
                <p className="text-xl gradient-text-slate mb-8 leading-relaxed">
                  Premium users enjoy recipes that are 3x more detailed, 
                  with complex flavor development, advanced cooking 
                  techniques, and sophisticated culinary artistry 
                  that elevate your cooking skills.
                </p>

                {/* Premium Benefits List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="gradient-text-slate">Legendary complexity recipes with restaurant-quality techniques</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="gradient-text-slate">Advanced flavor profiling and sophisticated ingredient combinations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="gradient-text-slate">Professional cooking techniques and plating presentations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="gradient-text-slate">Unlimited recipe generation with no daily limits</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onPricing}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Crown size={20} />
                    Get Premium Forever
                  </button>
                  <button
                    onClick={onRecipeGenerator}
                    className="px-8 py-4 bg-slate-700/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-600/60 hover:text-white transition-all duration-200"
                  >
                    Try Free Version
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 relative">
                <div className="h-full min-h-[500px] relative overflow-hidden rounded-r-3xl">
                  <img
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Premium recipe creation experience"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Premium Badge Overlay */}
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-full">
                      <Crown size={16} className="text-indigo-400" />
                      <span className="text-white text-sm font-medium">Premium</span>
                    </div>
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32 py-20">
          <div className="text-center mb-16">
            {/* Loved by Food Lovers Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-8">
              <span className="text-indigo-300 text-sm font-medium">💜 Loved by Food Lovers</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text-white mb-6">
              What Food Lovers Are Saying
            </h2>
            <p className="text-xl gradient-text-slate max-w-3xl mx-auto">
              Join thousands of home cooks who have made cooking magical with NUTRILOOM AI recipes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              {/* 5 Star Rating */}
              <div className="flex text-indigo-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                "The premium recipes are absolutely incredible! My family is captivated by the detailed cooking techniques, and I'm amazed by how educational they are. Worth every penny!"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">Sarah M.</h4>
                  <p className="text-slate-400 text-sm">Premium subscriber</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              {/* 5 Star Rating */}
              <div className="flex text-indigo-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <p className="gradient-text-slate leading-relaxed mb-6 text-lg">
                "As a busy home cook, NUTRILOOM AI has been a lifesaver. The AI creates such personalized recipes that my family thinks I wrote them myself. The cooking guidance is perfect for weeknight dinners!"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="gradient-text-white font-semibold">James T.</h4>
                  <p className="gradient-text-slate text-sm">Father of three</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              {/* 5 Star Rating */}
              <div className="flex text-indigo-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <p className="gradient-text-slate leading-relaxed mb-6 text-lg">
                "I'm a culinary instructor and I use NUTRILOOM AI recipes in my cooking classes. The educational themes are perfectly woven into engaging culinary experiences. My students are always excited for cooking time!"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="gradient-text-white font-semibold">Lisa K.</h4>
                  <p className="gradient-text-slate text-sm">Culinary instructor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Creating Section */}
        <div className="mt-32 mb-16 text-center px-4">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="gradient-text-primary">Start Creating</span> <span className="gradient-text-secondary">Magic Tonight</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed px-4">
            Join thousands of families who have transformed cooking into an 
            adventure. Create your first personalized recipe in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-4">
            <button
              onClick={onRecipeGenerator}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Sparkles size={20} />
              Create Free Recipe
            </button>
            <button
              onClick={onPricing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/60 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-700/60 hover:text-white transition-all duration-200"
            >
              <Crown size={20} />
              Explore Premium
            </button>
          </div>
          
          <p className="text-sm gradient-text-slate px-4">
            No credit card required for free recipes • Upgrade anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;