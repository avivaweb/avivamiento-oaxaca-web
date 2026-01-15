'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/event';
import CalendarGrid from '@/components/events/CalendarGrid';
import AgendaList from '@/components/events/AgendaList';
import Footer from '@/components/Footer';
import {
  Squares2X2Icon,
  ListBulletIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function EventsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Month Navigation
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const currentMonthName = currentDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const startOfMonth = new Date(year, month, 1).toISOString();
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

      try {
        const { data, error } = await supabase
          .from('eventos')
          .select('*')
          .gte('start_time', startOfMonth)
          .lte('start_time', endOfMonth);

        if (error) {
          console.error('Error fetching events:', error);
        } else {
          let mappedEvents: Event[] = (data || []).map((e: any) => ({
            ...e,
            category: e.category || 'general'
          }));

          // INJECTED EVENTS (PASIÓN 2026)
          const manualEvents: Event[] = [
            {
              id: 'evt-zocalo-01',
              title: 'Oración en el Zócalo',
              description: 'Clamor por Oaxaca. Un tiempo de intercesión profética en el corazón de nuestra ciudad. #Pasión2026',
              start_time: new Date(year, month, 15, 18, 0).toISOString(), // Example: 15th of current month
              end_time: new Date(year, month, 15, 20, 0).toISOString(),
              location: 'Zócalo de la Ciudad, Oaxaca',
              category: 'special'
            },
            {
              id: 'evt-mujeres-01',
              title: 'Mujeres en Victoria',
              description: 'Reunión exclusiva para mujeres. "Levántate y resplandece".',
              start_time: new Date(year, month, 22, 10, 0).toISOString(), // Example: 22nd of current month
              end_time: new Date(year, month, 22, 12, 0).toISOString(),
              location: 'Auditorio Avivamiento',
              category: 'workshop'
            }
          ];

          // Merge and Sort
          const allEvents = [...mappedEvents, ...manualEvents];
          allEvents.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

          // GEM Numerology: Show only top 3 upcoming/relevant events for the view
          // Filter to show only future events from "now" if we were strict, but here we scope by month window.
          // We will just slice the first 3 of the month for the "Focus" view if needed, 
          // but the prompt implies "No satures... muestra las 3 más próximos".
          // So we should probably strictly limit the 'events' state or have a separate 'highlightedEvents'.
          // For this implementation, we will limit the main list to 3 if in 'list' view, or generally limit.
          // Let's limit the displayed array to 3 for now as requested.

          setEvents(allEvents.slice(0, 3));
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentDate]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Page Header */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=2788&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
            Calendario Operativo PASIÓN 2026
          </h1>
          <p className="text-neutral-400 text-lg font-light tracking-wide uppercase">
            Agenda Oficial | Avivamiento Oaxaca
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-neutral-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
          {/* Month Nav */}
          <div className="flex items-center gap-4">
            <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors text-amber-500">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold capitalize min-w-[200px] text-center">
              {currentMonthName}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors text-amber-500">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex bg-neutral-950 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setView('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${view === 'grid' ? 'bg-neutral-800 text-amber-400 shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Squares2X2Icon className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Calendario</span>
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${view === 'list' ? 'bg-neutral-800 text-amber-400 shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <ListBulletIcon className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Agenda</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {view === 'grid' ? (
              <CalendarGrid currentDate={currentDate} events={events} />
            ) : (
              <AgendaList events={events} />
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}