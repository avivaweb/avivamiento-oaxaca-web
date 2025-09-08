import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Assuming supabaseClient.js is configured
import LeadershipCard from '../components/leadership/LeadershipCard';

const PastoralTeamPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { data, error } = await supabase
          .from('liderazgo')
          .select('*')
          .order('id', { ascending: true }); // Assuming an order for display

        if (error) throw error;
        setLeaders(data);
      } catch (err) {
        console.error('Error fetching leaders:', err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (loading) return <div className="text-center text-white text-xl mt-8">Cargando equipo pastoral...</div>;
  if (error) return <div className="text-center text-red-500 text-xl mt-8">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-divine-gold text-center mb-12">Nuestro Equipo Pastoral</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.length > 0 ? (
          leaders.map((leader) => (
            <LeadershipCard
              key={leader.id}
              name={leader.name}
              role={leader.role}
              image_url={leader.image_url}
              description={leader.description}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg col-span-full">No se encontró información del equipo pastoral.</p>
        )}
      </div>
    </div>
  );
};

export default PastoralTeamPage;
