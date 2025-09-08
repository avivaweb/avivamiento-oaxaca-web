
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

// Este componente reutiliza el patrón "Upsert" de TestimonyForm.jsx
// para proporcionar una experiencia de usuario consistente y un desarrollo eficiente.

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    status: 'draft',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEditMode);

  // 2. Obtener y Mostrar Datos (para Edición)
  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching event:', error);
          setError('No se pudo encontrar el evento para editar.');
        } else if (data) {
          // Asegurarse de que la fecha tenga el formato YYYY-MM-DD para el input type="date"
          const formattedData = { ...data, date: data.date ? data.date.split('T')[0] : '' };
          setFormData(formattedData);
        }
        setLoading(false);
      };
      fetchEvent();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Implementar la Lógica de Envío (Submit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 4. Añadir Validación de Formulario
    if (!formData.title || !formData.date) {
      alert('Por favor, complete al menos el título y la fecha del evento.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const { error: submissionError } = isEditMode
      ? await supabase.from('events').update(formData).match({ id })
      : await supabase.from('events').insert([formData]);

    if (submissionError) {
      console.error('Error submitting event:', submissionError);
      setError(submissionError.message);
    } else {
      // 5. Asegurar la Redirección
      alert(`Evento ${isEditMode ? 'actualizado' : 'creado'} con éxito.`);
      navigate('/admin/events');
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return <div className="text-center p-8">Cargando datos del evento...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Editar Evento' : 'Crear Nuevo Evento'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Conferencia de Jóvenes"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha del Evento</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Auditorio Principal"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe los detalles del evento..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado</p>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/events')}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar Evento' : 'Crear Evento')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
