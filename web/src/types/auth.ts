export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'supervisor' | 'leader' | 'member';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}