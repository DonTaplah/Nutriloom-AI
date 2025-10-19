export interface AuthError {
  message: string;
  code?: string;
  details?: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  recipesGeneratedThisMonth: number;
  lastResetDate: string;
  isAuthenticated?: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
}
