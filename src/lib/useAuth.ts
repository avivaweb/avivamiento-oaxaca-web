
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChange fires an initial session event, so we can get user
    // and loading state in one place.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the listener
    // when the component that uses this hook unmounts.
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
