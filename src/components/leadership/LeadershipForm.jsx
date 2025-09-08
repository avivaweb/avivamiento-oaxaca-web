
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const LeadershipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: '',
    rol: '',
    foto_url: '',
    bio: '',
    zona: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchLeader = async () => {
        const { data, error } = await supabase.from('liderazgo').select('*').eq('id', id).single();
        if (error) {
          navigate('/admin/leadership');
        } else {
          setFormData(data);
        }
      };
      fetchLeader();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.rol) {
      alert('El nombre y el rol son obligatorios.');
      return;
    }

    setIsSubmitting(true);
    const { error } = isEditMode
      ? await supabase.from('liderazgo').update(formData).match({ id })
      : await supabase.from('liderazgo').insert([formData]);

    if (error) {
      setError(error.message);
    } else {
      navigate('/admin/leadership');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Editar Miembro del Liderazgo' : 'Añadir Miembro'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} className="w-full input-class" />
            </div>
            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol o Cargo</label>
              <input type="text" name="rol" id="rol" value={formData.rol} onChange={handleChange} className="w-full input-class" />
            </div>
          </div>
          <div>
            <label htmlFor="foto_url" className="block text-sm font-medium text-gray-700 mb-1">URL de la Fotografía</label>
            <input type="text" name="foto_url" id="foto_url" value={formData.foto_url} onChange={handleChange} className="w-full input-class" />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Biografía</o></label>
            <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} rows="5" className="w-full input-class"></textarea>
          </div>
           <div>
              <label htmlFor="zona" className="block text-sm font-medium text-gray-700 mb-1">Zona (Opcional)</label>
              <input type="text" name="zona" id="zona" value={formData.zona || ''} onChange={handleChange} className="w-full input-class" />
            </div>
          {error && <p className="text-red-500">Error: {error}</p>}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/admin/leadership')} className="btn-secondary">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadershipForm;

// Nota: Deberás definir las clases `input-class`, `btn-primary`, `btn-secondary` en tu CSS global 
// o reemplazarlas con clases de Tailwind CSS para que coincidan con tu sistema de diseño.
