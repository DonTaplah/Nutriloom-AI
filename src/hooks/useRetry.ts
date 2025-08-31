import { useState, useCallback } from 'react';

export interface RetryConfig {
  maxAttempts?: number;
  delay?: number;
  backoff?: 'linear' | 'exponential';
  onRetry?: (attempt: number) => void;
  onMaxAttemptsReached?: () => void;
}

export const useRetry = (config: RetryConfig = {}) => {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = 'exponential',
    onRetry,
    onMaxAttemptsReached
  } = config;

  const [isRetrying, setIsRetrying] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const calculateDelay = (attempt: number): number => {
    if (backoff === 'exponential') {
      return delay * Math.pow(2, attempt);
    }
    return delay;
  };

  const retry = useCallback(async <T>(
    action: () => Promise<T>,
    customConfig?: Partial<RetryConfig>
  ): Promise<T> => {
    const finalConfig = { ...config, ...customConfig };
    const finalMaxAttempts = finalConfig.maxAttempts || maxAttempts;

    setIsRetrying(true);
    setAttemptCount(0);

    for (let attempt = 0; attempt < finalMaxAttempts; attempt++) {
      try {
        setAttemptCount(attempt + 1);
        
        if (attempt > 0) {
          const retryDelay = calculateDelay(attempt - 1);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          onRetry?.(attempt);
        }

        const result = await action();
        setIsRetrying(false);
        setAttemptCount(0);
        return result;

      } catch (error) {
        if (attempt === finalMaxAttempts - 1) {
          setIsRetrying(false);
          setAttemptCount(0);
          onMaxAttemptsReached?.();
          throw error;
        }
      }
    }

    setIsRetrying(false);
    setAttemptCount(0);
    throw new Error('Max retry attempts reached');
  }, [maxAttempts, delay, backoff, onRetry, onMaxAttemptsReached]);

  const reset = useCallback(() => {
    setIsRetrying(false);
    setAttemptCount(0);
  }, []);

  return {
    retry,
    isRetrying,
    attemptCount,
    reset
  };
};