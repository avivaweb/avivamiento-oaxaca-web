
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const TestimonyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    body: '',
    status: 'draft',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEditMode); // Only load if in edit mode

  // 2. Obtener y Mostrar Datos (para Edición)
  useEffect(() => {
    if (isEditMode) {
      const fetchTestimony = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('testimonios')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching testimony:', error);
          setError('No se pudo encontrar el testimonio.');
        } else if (data) {
          setFormData(data);
        }
        setLoading(false);
      };
      fetchTestimony();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Implementar la Lógica de Envío (handleSubmit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 4. Añadir Validación de Formulario
    if (!formData.title || !formData.author || !formData.body) {
      alert('Por favor, complete los campos de título, autor y contenido.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const { error: submissionError } = isEditMode
      ? await supabase.from('testimonios').update(formData).match({ id })
      : await supabase.from('testimonios').insert([formData]);

    if (submissionError) {
      console.error('Error submitting testimony:', submissionError);
      setError(submissionError.message);
    } else {
      // 5. Asegurar la Redirección
      alert(`Testimonio ${isEditMode ? 'actualizado' : 'creado'} con éxito.`);
      navigate('/admin/testimonios');
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return <div className="text-center p-8">Cargando datos del testimonio...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Editar Testimonio' : 'Crear Nuevo Testimonio'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Fui sano de cáncer"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Contenido del Testimonio</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe el milagro o la obra que Dios hizo..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
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
              onClick={() => navigate('/admin/testimonios')}
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
              {isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar Testimonio' : 'Crear Testimonio')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonyForm;
