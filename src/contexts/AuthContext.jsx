import React, { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async (sessionUser) => {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error fetching profile:', error);
        return { ...sessionUser, role: null };
      }
      return { ...sessionUser, role: profile?.role || null };
    };

    // --- IMMEDIATE SESSION CHECK ---
    // Check for existing session immediately on component mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userWithProfile = await fetchUserProfile(session.user);
        setUser(userWithProfile);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false after initial session check
    });

    // --- AUTH STATE CHANGE LISTENER ---
    // Continue listening for future auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userWithProfile = await fetchUserProfile(session.user);
          setUser(userWithProfile);
        } else {
          setUser(null);
        }
        // setLoading(false); // No longer needed here, as it's handled by the initial check
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    signUp: async (email, password, full_name) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      
      // Insert into profiles table
      if (data.user) {
        // Check if there are any users in the profiles table
        const { count, error: countError } = await supabase
            .from('profiles')
            .select('id', { count: 'exact', head: true });

        if (countError) throw countError;

        const role = count === 0 ? 'Superusuario' : 'Líder de Célula';

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: full_name,
              role: role,
            },
          ]);
        if (profileError) throw profileError;
      }
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};