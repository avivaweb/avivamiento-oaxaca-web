import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          // If no user, redirect to the login page.
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        // Also redirect on error as a fallback.
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;