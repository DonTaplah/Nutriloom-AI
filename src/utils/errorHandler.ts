// Comprehensive Error Handling Utilities
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTH = 'AUTH',
  STORAGE = 'STORAGE',
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
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  timestamp: Date;
  context?: Record<string, any>;
  stack?: string;
  retryable: boolean;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: AppError[] = [];
  private maxQueueSize = 100;

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
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: Record<string, any>,
    retryable: boolean = false
  ): AppError {
    return {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      message,
      userMessage,
      timestamp: new Date(),
      context,
      stack: new Error().stack,
      retryable
    };
  }

  logError(error: AppError): void {
    // Add to queue
    this.errorQueue.push(error);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Console logging for development
    if (import.meta.env.DEV) {
      console.group(`🚨 ${error.severity} Error - ${error.type}`);
      console.error('Message:', error.message);
      console.error('User Message:', error.userMessage);
      console.error('Context:', error.context);
      console.error('Stack:', error.stack);
      console.groupEnd();
    }

    // Send to external logging service in production
    if (import.meta.env.PROD) {
      this.sendToLoggingService(error);
    }
  }

  private async sendToLoggingService(error: AppError): Promise<void> {
    try {
      // In a real app, send to services like Sentry, LogRocket, etc.
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      });
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  }

  getRecentErrors(): AppError[] {
    return [...this.errorQueue].reverse();
  }

  clearErrors(): void {
    this.errorQueue = [];
  }
}

// Error factory functions
export const createNetworkError = (message: string, context?: Record<string, any>): AppError => {
  return ErrorHandler.getInstance().createError(
    ErrorType.NETWORK,
    message,
    "We're having trouble connecting to our servers. Please check your internet connection and try again.",
    ErrorSeverity.MEDIUM,
    context,
    true
  );
};

export const createAPIError = (message: string, statusCode?: number, context?: Record<string, any>): AppError => {
  let userMessage = "Something went wrong on our end. Please try again in a moment.";
  let severity = ErrorSeverity.MEDIUM;
  
  if (statusCode === 429) {
    userMessage = "You're making requests too quickly. Please wait a moment and try again.";
  } else if (statusCode === 401) {
    userMessage = "Your session has expired. Please sign in again.";
    severity = ErrorSeverity.HIGH;
  } else if (statusCode === 403) {
    userMessage = "You don't have permission to perform this action.";
    severity = ErrorSeverity.HIGH;
  } else if (statusCode === 404) {
    userMessage = "The requested resource was not found.";
  } else if (statusCode && statusCode >= 500) {
    userMessage = "Our servers are experiencing issues. Please try again later.";
    severity = ErrorSeverity.HIGH;
  }

  return ErrorHandler.getInstance().createError(
    ErrorType.API,
    message,
    userMessage,
    severity,
    { statusCode, ...context },
    statusCode !== 401 && statusCode !== 403
  );
};

export const createValidationError = (field: string, message: string): AppError => {
  return ErrorHandler.getInstance().createError(
    ErrorType.VALIDATION,
    `Validation failed for ${field}: ${message}`,
    message,
    ErrorSeverity.LOW,
    { field },
    false
  );
};

export const createAuthError = (message: string, code?: string, context?: any): AppError => {
  const errorHandler = ErrorHandler.getInstance();
  
  // Handle specific Supabase authentication errors
  if (code === 'SUPABASE_NOT_CONFIGURED') {
    return errorHandler.createError(
      ErrorType.AUTH,
      'Database not connected. Please connect to Supabase to enable authentication.',
      'Database not connected. Please connect to Supabase to enable authentication.',
      ErrorSeverity.HIGH,
      context,
      true
    );
  }
  
  if (message?.includes('Email logins are disabled') || code === 'email_provider_disabled') {
    return errorHandler.createError(
      ErrorType.AUTH,
      'Email authentication is not enabled. Please contact support or try signing in with Google.',
      'Email authentication is not enabled. Please contact support or try signing in with Google.',
      ErrorSeverity.HIGH,
      context,
      true
    );
  }

  return errorHandler.createError(
    ErrorType.AUTH,
    message,
    "Authentication failed. Please check your credentials and try again.",
    ErrorSeverity.HIGH,
    context,
    true
  );
};

// Global error handler
export const handleGlobalError = (error: Error | AppError): void => {
  const errorHandler = ErrorHandler.getInstance();
  
  if ('type' in error) {
    // Already an AppError
    errorHandler.logError(error);
  } else {
    // Convert regular Error to AppError
    const appError = errorHandler.createError(
      ErrorType.UNKNOWN,
      error.message,
      "An unexpected error occurred. Please try again.",
      ErrorSeverity.MEDIUM,
      { originalError: error.name },
      true
    );
    errorHandler.logError(appError);
  }
};