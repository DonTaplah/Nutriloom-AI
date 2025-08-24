import React, { useState } from 'react';
import { ChefHat, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup, isLoading, error }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.email, formData.password);
    } else {
      onSignup(formData.name, formData.email, formData.password);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <img 
              src="/An_AI_chef_with_a_spoon_and_a_fork_in_the_background-removebg-preview.png" 
              alt="Nutriloom AI Chef" 
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Nutriloom AI</h1>
          <p className="text-slate-300">
            {isLogin ? 'Welcome back to your kitchen companion' : 'Join thousands of home chefs'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
          <div className="mb-6">
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  isLogin
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isLogin
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-200 text-white placeholder-slate-400"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-200 text-white placeholder-slate-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-200 text-white placeholder-slate-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center">
              <a href="#" className="text-orange-400 hover:text-orange-300 text-sm">
                Forgot your password?
              </a>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-400 hover:text-orange-300 font-medium"
              >
                {isLogin ? 'Sign up for free' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-4">Trusted by thousands of home chefs</p>
          <div className="flex justify-center space-x-8 text-slate-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">10K+</div>
              <div className="text-xs">Recipes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">5K+</div>
              <div className="text-xs">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">50+</div>
              <div className="text-xs">Cuisines</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;