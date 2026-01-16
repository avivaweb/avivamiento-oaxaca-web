export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Lider de Celula' | 'Supervisor' | 'Pastor de Zona' | 'Pastor General' | 'admin' | 'CMAvivamiento';
  zone?: string;
  phone?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  zone: string | null;
  role: string | null;
  updated_at: string | null;
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