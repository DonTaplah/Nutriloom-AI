export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  createdAt: Date;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}