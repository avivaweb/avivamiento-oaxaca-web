
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

const ManageLeadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('liderazgo')
        .select('id, nombre, rol, foto_url')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching leaders:', error);
        setError('No se pudieron cargar los líderes.');
      } else {
        setLeaders(data);
      }
      setLoading(false);
    };
    fetchLeaders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a esta persona?')) {
      const { error } = await supabase.from('liderazgo').delete().match({ id });
      if (error) {
        alert('Error al eliminar.');
      } else {
        setLeaders(leaders.filter(l => l.id !== id));
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando líderes...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestionar Liderazgo</h1>
          <Link
            to="/admin/leadership/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Añadir Miembro
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Foto</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Rol</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leaders.map((leader) => (
                  <tr key={leader.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img src={leader.foto_url} alt={leader.nombre} className="h-12 w-12 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{leader.nombre}</td>
                    <td className="px-6 py-4 text-gray-600">{leader.rol}</td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <Link to={`/admin/leadership/edit/${leader.id}`} className="text-blue-600 hover:text-blue-800 inline-block align-middle">
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(leader.id)} className="text-red-600 hover:text-red-800 inline-block align-middle">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLeadership;
