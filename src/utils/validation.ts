import { useState } from 'react';
import { createValidationError } from './errorHandler';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationSchema {
  [field: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateField = (value: any, rule: ValidationRule, fieldName: string): string | null => {
  // Required validation
  if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return rule.message || `${fieldName} is required`;
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  // String validations
  if (typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `${fieldName} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `${fieldName} must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || `${fieldName} format is invalid`;
    }
  }

  // Custom validation
  if (rule.custom && !rule.custom(value)) {
    return rule.message || `${fieldName} is invalid`;
  }

  return null;
};

export const validateForm = (data: Record<string, any>, schema: ValidationSchema): ValidationResult => {
  const errors: Record<string, string> = {};

  for (const [fieldName, rule] of Object.entries(schema)) {
    const error = validateField(data[fieldName], rule, fieldName);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Common validation schemas
export const authValidationSchema: ValidationSchema = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 6,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{6,}$/,
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  }
};

export const recipeValidationSchema: ValidationSchema = {
  ingredients: {
    required: true,
    custom: (value: string) => {
      const ingredients = value.split(/[,\n]/).map(i => i.trim()).filter(i => i.length > 0);
      return ingredients.length > 0;
    },
    message: 'Please enter at least one ingredient'
  },
  cuisine: {
    maxLength: 50,
    message: 'Cuisine name is too long'
  }
};

// Validation hook
export const useValidation = (schema: ValidationSchema) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: Record<string, any>): boolean => {
    const result = validateForm(data, schema);
    setErrors(result.errors);
    
    // Log validation errors
    if (!result.isValid) {
      Object.entries(result.errors).forEach(([field, message]) => {
        const validationError = createValidationError(field, message);
        console.warn('Validation error:', validationError);
      });
    }

    return result.isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearFieldError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    errors,
    validate,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0
  };
};