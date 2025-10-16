export interface AuthError {
  message: string;
  code: string;
  details?: any;
}

export enum ErrorType {
  AUTHENTICATION = 'AUTHENTICATION',
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN'
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface AppError {
  id: string;
  type: ErrorType;
  message: string;
  userMessage: string;
  severity: ErrorSeverity;
  context?: any;
  timestamp: Date;
  shouldReport: boolean;
}

export function createAuthError(message: string, code: string, details?: any): AuthError {
  return {
    message,
    code,
    details
  };
}

export function createAppError(
  type: ErrorType,
  message: string,
  userMessage: string,
  severity: ErrorSeverity,
  context?: any,
  shouldReport: boolean = true
): AppError {
  return {
    id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    message,
    userMessage,
    severity,
    context,
    timestamp: new Date(),
    shouldReport
  };
}

export function createNetworkError(message: string, context?: any): AppError {
  return createAppError(
    ErrorType.NETWORK,
    message,
    'Network connection failed. Please check your internet connection and try again.',
    ErrorSeverity.MEDIUM,
    context
  );
}

export function createAPIError(message: string, context?: any): AppError {
  return createAppError(
    ErrorType.API,
    message,
    'Service temporarily unavailable. Please try again later.',
    ErrorSeverity.HIGH,
    context
  );
}

export function createValidationError(message: string, context?: any): AppError {
  return createAppError(
    ErrorType.VALIDATION,
    message,
    'Please check your input and try again.',
    ErrorSeverity.LOW,
    context,
    false
  );
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

export function handleGlobalError(error: any, context?: string): AppError {
  if (isNetworkError(error)) {
    return createNetworkError(error.message || 'Network error occurred', { context });
  }
  
  if (error?.code === 'API_ERROR') {
    return createAPIError(error.message || 'API error occurred', { context });
  }
  
  return createAppError(
    ErrorType.UNKNOWN,
    error?.message || 'Unknown error occurred',
    'Something went wrong. Please try again.',
    ErrorSeverity.MEDIUM,
    { context, originalError: error }
  );
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
  private static instance: ErrorHandler;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  createError(
    type: ErrorType,
    message: string,
    userMessage: string,
    severity: ErrorSeverity,
    context?: any,
    shouldReport: boolean = true
  ): AppError {
    return createAppError(type, message, userMessage, severity, context, shouldReport);
  }

  logError(error: AppError | Error, context?: string): void {
    let errorToLog: AppError;

    if (error instanceof Error) {
      errorToLog = handleGlobalError(error, context);
    } else {
      errorToLog = error;
    }

    const errorInfo = {
      id: errorToLog.id,
      type: errorToLog.type,
      message: errorToLog.message,
      userMessage: errorToLog.userMessage,
      severity: errorToLog.severity,
      context: errorToLog.context,
      timestamp: errorToLog.timestamp,
      shouldReport: errorToLog.shouldReport
    };
    
    console.error('Error logged:', errorInfo);
    
    // In production, you might want to send this to an error tracking service
    // like Sentry, LogRocket, etc.
    if (errorToLog.shouldReport && errorToLog.severity === ErrorSeverity.HIGH || errorToLog.severity === ErrorSeverity.CRITICAL) {
      // Send to error tracking service
    }
  }

  static createError(message: string, code?: string): Error {
    const error = new Error(message);
    if (code) {
      (error as any).code = code;
    }
    return error;
  }
  
  static logError(error: any, context?: string): void {
    const instance = ErrorHandler.getInstance();
    if (error instanceof Error) {
      const appError = handleGlobalError(error, context);
      instance.logError(appError);
    } else {
      instance.logError(error, context);
    }
  }
}