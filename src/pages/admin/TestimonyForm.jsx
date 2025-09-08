
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const TestimonyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    body: '',
    status: 'borrador'
  });
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchTestimony = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('testimonies')
          .select('*')
          .eq('id', id)
          .single();
        
        if (data) setFormData(data);
        setLoading(false);
      };
      fetchTestimony();
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
      ({ error } = await supabase.from('testimonies').update(formData).eq('id', id));
    } else {
      ({ error } = await supabase.from('testimonies').insert([formData]));
    }

    if (error) {
      alert('Error al guardar el testimonio: ' + error.message);
    } else {
      alert(`Testimonio ${isEditMode ? 'actualizado' : 'creado'} con éxito.`);
      navigate('/admin/testimonies');
    }
    setLoading(false);
  };

  if (loading && isEditMode) return <p>Cargando testimonio...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Editar' : 'Crear'} Testimonio</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Autor</label>
          <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Cuerpo del Testimonio</label>
          <textarea name="body" id="body" rows="10" value={formData.body} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/admin/testimonies')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                {loading ? 'Guardando...' : 'Guardar Testimonio'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonyForm;
