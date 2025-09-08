import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';

const useTestimoniesFetch = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('testimonios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setTestimonies(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonies();
  }, [fetchTestimonies]);

  return { testimonies, isLoading, error, refetch: fetchTestimonies };
};

export default useTestimoniesFetch;
