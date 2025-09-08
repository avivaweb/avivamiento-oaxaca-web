
import React, { createContext, useContext, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import useSupabaseFetch from '../lib/useSupabaseFetch';

const EventsContext = createContext();

const fetchEvents = async () => {
  const today = new Date().toISOString();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};

export const EventsProvider = ({ children }) => {
  const fetchEventsCallback = useCallback(() => fetchEvents(), []);
  const { data: events, isLoading, error } = useSupabaseFetch(fetchEventsCallback);

  const contextValue = {
    events: events || [],
    isLoading,
    error: error ? 'Failed to fetch events. Please try again.' : null,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
