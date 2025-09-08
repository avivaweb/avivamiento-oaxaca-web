
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('title, content');

        if (error) {
          throw error;
        }

        setBlogs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}
