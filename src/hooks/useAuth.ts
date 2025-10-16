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
        {(error || localError || !isSupabaseConfigured) && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          throw authError;
            />
        const authError = createAuthError(error.message, 'SIGN_UP_FAILED');
        throw authError;

        {(error || localError || !isSupabaseConfigured) && (
      if (data.user) {
        setUser(data.user);
        await fetchUserProfile(data.user.id);
        return { success: true, user: data.user, session: data.session, autoSignedIn: !!data.session };
      }

      return { success: false, error: 'No user returned from registration' };
            <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm">
      console.error('Sign up error:', error);
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
      const authError = createAuthError('Database not connected. Please contact support.', 'SUPABASE_NOT_CONFIGURED');
      throw authError;
        const authError = createAuthError(error.message, 'GOOGLE_SIGN_IN_FAILED');
        throw authError;
      console.error('Google sign in error:', error);