export interface AuthError {
  message: string;
  code: string;
  details?: any;
}

export function createAuthError(message: string, code: string, details?: any): AuthError {
  return {
    message,
    code,
    details
  };
}

export function handleAuthError(error: any): AuthError {
  if (error?.message) {
    // Handle Supabase auth errors
    if (error.message.includes('Invalid login credentials')) {
      return createAuthError('Invalid password. Please try again.', 'INVALID_CREDENTIALS');
    }
    
    if (error.message.includes('Email not confirmed')) {
      return createAuthError('Please check your email and confirm your account.', 'EMAIL_NOT_CONFIRMED');
    }
    
    if (error.message.includes('User already registered')) {
      return createAuthError('An account with this information already exists.', 'USER_EXISTS');
    }
    
    if (error.message.includes('Password should be at least')) {
      return createAuthError('Password must be at least 6 characters long.', 'WEAK_PASSWORD');
    }
    
    return createAuthError(error.message, error.code || 'AUTH_ERROR');
  }
  
  return createAuthError('An unexpected error occurred. Please try again.', 'UNKNOWN_ERROR');
}

export function isNetworkError(error: any): boolean {
  return error?.message?.includes('fetch') || 
         error?.message?.includes('network') ||
         error?.code === 'NETWORK_ERROR';
}

export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

export class ErrorHandler {
  static createError(message: string, code?: string): Error {
    const error = new Error(message);
    if (code) {
      (error as any).code = code;
    }
    return error;
  }
  
  static logError(error: any, context?: string): void {
    const errorInfo = {
      message: getErrorMessage(error),
      context: context || 'Unknown',
      stack: error?.stack,
      timestamp: new Date().toISOString()
    };
    
    console.error('Error logged:', errorInfo);
    
    // In production, you might want to send this to an error tracking service
    // like Sentry, LogRocket, etc.
  }
}