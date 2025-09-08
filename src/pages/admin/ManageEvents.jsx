import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { PlusCircle, Trash2 } from 'lucide-react';

// Este componente sigue el mismo patrón de gestión que ManageTestimonies.jsx,
// demostrando un enfoque de desarrollo escalable y consistente.

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Leer y Mostrar Datos
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, title, date, status')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        setError('No se pudieron cargar los eventos. Por favor, intente de nuevo más tarde.');
      } else {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // 3. Implementar la Función de Eliminar
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
      const { error } = await supabase
        .from('events')
        .delete()
        .match({ id });

      if (error) {
        console.error('Error deleting event:', error);
        alert('No se pudo eliminar el evento.');
      } else {
        setEvents(currentEvents => currentEvents.filter(e => e.id !== id));
      }
    }
  };

  // 2. Manejar Estados
  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-lg text-gray-500">Cargando eventos...</p></div>;
  }

  if (error) {
    return <div className="text-center p-8"><p className="text-red-500">{error}</p></div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestionar Eventos</h1>
          {/* 4. Añadir una Llamada a la Acción (CTA) */}
          <Link
            to="/admin/events/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Añadir Evento
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {events.length === 0 ? (
            <p className="p-8 text-center text-gray-500">No hay eventos para mostrar. ¡Añade uno nuevo!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          aria-label={`Eliminar evento ${event.title}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;