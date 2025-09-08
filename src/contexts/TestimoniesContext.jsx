import React, { createContext, useContext } from 'react';
import useTestimoniesFetch from '../lib/useTestimoniesFetch';

const TestimoniesContext = createContext();

export const TestimoniesProvider = ({ children }) => {
  const { testimonies, isLoading, error, refetch } = useTestimoniesFetch();

  return (
    <TestimoniesContext.Provider value={{ testimonies, isLoading, error, refetchTestimonies: refetch }}>
      {children}
    </TestimoniesContext.Provider>
  );
};

export const useTestimonies = () => {
  const context = useContext(TestimoniesContext);
  if (context === undefined) {
    throw new Error('useTestimonies must be used within a TestimoniesProvider');
  }
  return context;
};