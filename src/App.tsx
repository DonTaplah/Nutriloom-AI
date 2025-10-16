import React, { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';
import LoadingFallback from './components/LoadingFallback';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const AuthPage = lazy(() => import('./components/AuthPage'));
const HomePage = lazy(() => import('./components/HomePage'));

export default function App() {
  const { user, loading, error, signIn, signUp, signOut, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {!isAuthenticated ? (
          <Suspense fallback={<LoadingFallback />}>
            <AuthPage 
              onLogin={signIn}
              onSignup={signUp}
              isLoading={loading}
              error={error}
              onToggleSidebar={() => {}} // Not needed for auth page
            />
          </Suspense>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage 
              user={user}
              onSignOut={signOut}
            />
          </Suspense>
        )}
      </main>
    </ErrorBoundary>
  );
}