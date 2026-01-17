'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthContextType } from '@/types/auth';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verificar sesión al cargar
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchProfile(session.user.id, session.user.email!);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Escuchar cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email!);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Error fetching profile:', error.message);
        // Si no existe perfil, usar datos básicos del usuario auth (fallback)
        setUser({
          id: userId,
          email: email,
          name: email.split('@')[0], // Fallback name
          role: 'Lider de Celula', // Fallback role (safe default)
          zone: 'N/A'
        } as User);
        return;
      }

      if (profile) {
        setUser({
          id: userId,
          email: email,
          name: profile.full_name || email.split('@')[0],
          role: profile.role || 'Lider de Celula',
          zone: profile.zone || 'N/A',
          phone: profile.phone
        } as User);
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Specific error messages for better UX
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.');
        }
        throw new Error(error.message);
      }

      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error en login:', error);

      // Network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Error de conexión: No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      }

      throw new Error(error.message || 'Error al iniciar sesión');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}