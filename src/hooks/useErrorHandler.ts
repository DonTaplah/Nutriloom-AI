import { useState, useCallback } from 'react';
import { AppError, ErrorHandler, handleGlobalError } from '../utils/errorHandler';

export interface ErrorState {
  errors: AppError[];
  hasErrors: boolean;
  isRetrying: boolean;
}

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    errors: [],
    hasErrors: false,
    isRetrying: false
  });

  const addError = useCallback((error: AppError) => {
    ErrorHandler.getInstance().logError(error);
    setErrorState(prev => ({
      ...prev,
      errors: [error, ...prev.errors.slice(0, 4)], // Keep only 5 most recent
      hasErrors: true
    }));
  }, []);

  const removeError = useCallback((errorId: string) => {
    setErrorState(prev => ({
      ...prev,
      errors: prev.errors.filter(e => e.id !== errorId),
      hasErrors: prev.errors.filter(e => e.id !== errorId).length > 0
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrorState({
      errors: [],
      hasErrors: false,
      isRetrying: false
    });
  }, []);

  const retryAction = useCallback(async (action: () => Promise<void>, errorId?: string) => {
    setErrorState(prev => ({ ...prev, isRetrying: true }));
    
    try {
      await action();
      if (errorId) {
        removeError(errorId);
      }
    } catch (error) {
      handleGlobalError(error as Error);
    } finally {
      setErrorState(prev => ({ ...prev, isRetrying: false }));
    }
  }, [removeError]);

  return {
    errorState,
    addError,
    removeError,
    clearErrors,
    retryAction
  };
};