import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, RefreshCw } from 'lucide-react';
import { AppError, ErrorSeverity } from '../utils/errorHandler';

interface ErrorToastProps {
  error: AppError;
  onDismiss: (errorId: string) => void;
  onRetry?: (errorId: string) => void;
  autoHide?: boolean;
  duration?: number;
}

const ErrorToast: React.FC<ErrorToastProps> = ({
  error,
  onDismiss,
  onRetry,
  autoHide = true,
  duration = 5000
}) => {
  useEffect(() => {
    if (autoHide && error.severity !== ErrorSeverity.CRITICAL) {
      const timer = setTimeout(() => {
        onDismiss(error.id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error.id, error.severity, autoHide, duration, onDismiss]);

  const getToastStyles = () => {
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        return 'bg-red-500/20 border-red-500/50 text-red-200';
      case ErrorSeverity.HIGH:
        return 'bg-orange-500/20 border-orange-500/50 text-orange-200';
      case ErrorSeverity.MEDIUM:
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200';
      case ErrorSeverity.LOW:
        return 'bg-blue-500/20 border-blue-500/50 text-blue-200';
      default:
        return 'bg-slate-500/20 border-slate-500/50 text-slate-200';
    }
  };

  const getIcon = () => {
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        return <AlertCircle size={20} className="text-red-400" />;
      case ErrorSeverity.HIGH:
        return <AlertTriangle size={20} className="text-orange-400" />;
      case ErrorSeverity.MEDIUM:
        return <Info size={20} className="text-yellow-400" />;
      case ErrorSeverity.LOW:
        return <CheckCircle size={20} className="text-blue-400" />;
      default:
        return <Info size={20} className="text-slate-400" />;
    }
  };

  return (
    <div className={`rounded-lg border p-4 shadow-lg backdrop-blur-sm ${getToastStyles()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium mb-1">
            {error.userMessage}
          </p>
          
          {import.meta.env.DEV && (
            <p className="text-xs opacity-75 font-mono">
              {error.message}
            </p>
          )}
          
          {error.retryable && onRetry && (
            <button
              onClick={() => onRetry(error.id)}
              className="mt-2 flex items-center gap-1 text-xs font-medium hover:underline"
            >
              <RefreshCw size={12} />
              Try Again
            </button>
          )}
        </div>
        
        <button
          onClick={() => onDismiss(error.id)}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ErrorToast;