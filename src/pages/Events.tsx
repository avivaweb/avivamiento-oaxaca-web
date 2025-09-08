import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Filter, AlertTriangle, Loader } from 'lucide-react';
import { useEvents } from '../contexts/EventsContext.jsx'; // 1. Importar el hook del contexto
import EventCard from '@/components/events/EventCard.tsx';

// Componente para el esqueleto de carga
const EventSkeleton = () => (
  <div className="bg-blanco-puro rounded-2xl overflow-hidden shadow-lg border border-gray-200">
    <div className="bg-gray-200 h-48 w-full animate-pulse"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
);

const Events = () => {
  // 2. Usar el contexto para obtener datos y estados
  const { events, isLoading, error } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'congreso', label: 'Congresos' },
    { value: 'vigilia', label: 'Vigilias' },
    { value: 'bautizo', label: 'Bautizos' },
    { value: 'conferencia', label: 'Conferencias' },
    { value: 'retiro', label: 'Retiros' },
    { value: 'especial', label: 'Especiales' }
  ];

  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.category === selectedCategory
  );

  // 3. Renderizar contenido basado en el estado del contexto
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => <EventSkeleton key={i} />)}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12 col-span-full bg-red-50 border border-red-200 p-8 rounded-lg">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-red-700">Ocurrió un Error</h3>
          <p className="text-gris-oscuro-sutil">No se pudieron cargar los eventos. Por favor, intenta recargar la página.</p>
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="text-center py-12 col-span-full">
            <Calendar className="h-16 w-16 text-gray-300 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-negro-sagrado">No hay eventos próximos</h3>
            <p className="text-gris-oscuro-sutil mt-2">Vuelve a consultar pronto para ver nuevas actividades.</p>
        </div>
      );
    }

    if (filteredEvents.length === 0) {
        return (
            <div className="text-center py-12 col-span-full">
                <h3 className="text-2xl font-semibold text-negro-sagrado">No hay eventos en esta categoría</h3>
                <p className="text-gris-oscuro-sutil mt-2">Prueba seleccionando otra categoría.</p>
            </div>
        );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Eventos - Iglesia Avivamiento</title>
        <meta name="description" content="Descubre y participa en nuestros próximos eventos: congresos, vigilias, bautizos, y más." />
      </Helmet>

      <header className="pt-24 pb-16 bg-negro-sagrado text-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
          >
            Próximos Eventos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xl text-blanco-puro/80 max-w-3xl mx-auto"
          >
            Encuentros diseñados para un crecimiento profundo y una experiencia directa con la presencia de Dios.
          </motion.p>
        </div>
      </header>

      <main className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
            <div className="flex items-center space-x-2">
              <Filter className="text-rojo-espiritual" size={20} />
              <span className="text-negro-sagrado font-semibold">Filtrar por categoría:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${selectedCategory === category.value ? 'bg-rojo-espiritual text-blanco-puro border-rojo-espiritual' : 'bg-blanco-puro text-gris-oscuro-sutil border-transparent hover:border-rojo-espiritual/50'}`}>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          {renderContent()}
        </div>
      </main>
    </>
  );
};

export default Events;