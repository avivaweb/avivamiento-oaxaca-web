
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Define a type for a single blog post for type safety
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  user_id?: string; // Optional user_id
  created_at?: string;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        // Fetch all fields including the 'id' for keys and actions
        const { data, error } = await supabase
          .from('blogs')
          .select('*');

        if (error) {
          throw error;
        }

        setBlogs(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}
