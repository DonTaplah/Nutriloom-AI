import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, BookOpen, Menu } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onToggleSidebar: () => void;
}

export default function AuthPage({ onLogin, onSignup, isLoading, error, onToggleSidebar }: AuthPageProps) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setLocalError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
      if (error) {
        setLocalError('Google sign-in failed. Please try again.');
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Sign In to Continue</h2>
          <p className="text-slate-400 text-sm">Use your Google account to access all features</p>
        </div>
        <h1 className="text-lg font-bold gradient-text-primary">Sign In</h1>
        <div className="w-10"></div>
      </div>
      
      <div className="bg-slate-800/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-500/30">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              <img 
                src="/An_AI_chef_with_a_spoon_and_a_fork_in_the_background-removebg-preview.png" 
                alt="Nutriloom AI Chef" 
                className="w-10 lg:w-12 h-10 lg:h-12 object-contain"
              />
              <h1 className="text-xl lg:text-2xl font-bold text-white">Nutriloom AI</h1>
            </div>
          </div>
          <p className="text-slate-300 text-sm">Weaving nutrition into every meal</p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Sign In to Continue</h2>
          <p className="text-slate-400 text-sm">Use your Google account to access all features</p>
        </div>

        {(error || localError || !isSupabaseConfigured) && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            <div className="mb-2">{localError || error}</div>
            {(error?.includes('Email authentication is not enabled') || localError?.includes('Email authentication is not enabled')) && (
              <div className="text-xs text-red-300 mt-2 p-2 bg-red-500/10 rounded border-l-2 border-red-400">
                <strong>Note:</strong> Email authentication needs to be enabled in the Supabase project settings. 
                You can try signing in with Google instead, or contact support for assistance.
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
              />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!isSupabaseConfigured || isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm lg:text-base"
          >
            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={!isSupabaseConfigured || googleLoading}
        </div>

        {isLogin && (
          <div className="mt-4 text-center">
            <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm">
              Forgot your password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}