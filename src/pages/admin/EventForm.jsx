
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    status: 'borrador'
  });
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
        if (data) {
            // Format date for input type="date"
            const formattedData = { ...data, event_date: data.event_date.split('T')[0] };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let error;
    if (isEditMode) {
      ({ error } = await supabase.from('events').update(formData).eq('id', id));
    } else {
      ({ error } = await supabase.from('events').insert([formData]));
    }

    if (error) {
      alert('Error al guardar el evento: ' + error.message);
    } else {
      alert(`Evento ${isEditMode ? 'actualizado' : 'creado'} con éxito.`);
      navigate('/admin/events');
    }
    setLoading(false);
  };

  if (loading && isEditMode) return <p>Cargando evento...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Editar' : 'Crear'} Evento</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del Evento</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div>
          <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">Fecha del Evento</label>
          <input type="date" name="event_date" id="event_date" value={formData.event_date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea name="description" id="description" rows="6" value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/admin/events')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                {loading ? 'Guardando...' : 'Guardar Evento'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
