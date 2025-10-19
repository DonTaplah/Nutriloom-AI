import React, { Suspense, lazy, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import LoadingFallback from './components/LoadingFallback';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const AuthPage = lazy(() => import('./components/AuthPage'));
const HomePage = lazy(() => import('./components/HomePage'));

export default function App() {
  const { user, loading, error, signIn, signUp, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <Suspense fallback={<LoadingFallback />}>
          {showAuth && !user ? (
            <AuthPage
              onLogin={signIn}
              onSignup={signUp}
              isLoading={loading}
              error={error}
              onToggleSidebar={() => setShowAuth(false)}
            />
          ) : (
            <HomePage
              user={user}
              onSignOut={signOut}
              onShowAuth={() => setShowAuth(true)}
            />
          )}
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}