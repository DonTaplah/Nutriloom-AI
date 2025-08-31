import React from 'react';
import { createPortal } from 'react-dom';
import ErrorToast from './ErrorToast';
import { AppError } from '../utils/errorHandler';

interface ErrorToastContainerProps {
  errors: AppError[];
  onDismiss: (errorId: string) => void;
  onRetry?: (errorId: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const ErrorToastContainer: React.FC<ErrorToastContainerProps> = ({
  errors,
  onDismiss,
  onRetry,
  position = 'top-right'
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'top-4 right-4';
    }
  };

  if (errors.length === 0) return null;

  return createPortal(
    <div className={`fixed ${getPositionClasses()} z-50 space-y-3 max-w-sm w-full`}>
      {errors.map((error) => (
        <ErrorToast
          key={error.id}
          error={error}
          onDismiss={onDismiss}
          onRetry={onRetry}
        />
      ))}
    </div>,
    document.body
  );
};

export default ErrorToastContainer;