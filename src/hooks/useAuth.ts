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
          }
        }
      });
      if (error) {
        setLocalError('Google sign-in failed. Please try again.');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      const authError = createAuthError(error.message, 'GOOGLE_SIGN_IN_FAILED');
      throw authError;
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-white hover:bg-slate-700/50 rounded-lg transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
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
        {(error || localError || !isSupabaseConfigured) && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error || localError || 'Database not connected. Please contact support.'}
          </div>
        )}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading || isLoading}
          className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-xs">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}