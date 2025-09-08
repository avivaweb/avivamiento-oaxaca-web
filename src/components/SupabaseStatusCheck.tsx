
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const SupabaseStatusCheck = () => {
  const [status, setStatus] = useState('Iniciando prueba de conexión...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (!supabase) {
        setStatus('Fallo Crítico');
        setError('El cliente de Supabase no se ha inicializado. Revisa la importación desde /src/lib/supabaseClient.js');
        return;
      }

      try {
        // Hacemos una consulta muy ligera para probar la conexión y autenticación
        const { error: queryError } = await supabase
          .from('testimonios')
          .select('id')
          .limit(1);

        if (queryError) {
          throw queryError;
        }

        setStatus('Conexión Exitosa');
        setError(null);

      } catch (err) {
        setStatus('Fallo en la Conexión a la Base de Datos');
        if (err.message.includes('fetch failed')) {
            setError('Error de red. No se pudo alcanzar el servidor de Supabase. Revisa la URL y tu conexión a internet.');
        } else if (err.message.includes('Invalid API key')) {
            setError('La API Key (anon key) de Supabase es inválida. Revisa tu archivo .env.');
        } else {
            setError(`Error: ${err.message}. Esto podría ser un problema de RLS, pero la conexión básica falló.`);
        }
      }
    };

    checkConnection();
  }, []);

  const getStatusColor = () => {
    if (status.includes('Exitosa')) return 'text-green-500';
    if (status.includes('Fallo')) return 'text-red-500';
    return 'text-yellow-500';
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      backgroundColor: 'white',
      border: '2px solid black',
      padding: '15px',
      zIndex: 1000,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }}>
      <h4 style={{ margin: 0, fontWeight: 'bold' }}>Diagnóstico de Supabase</h4>
      <p style={{ margin: '5px 0' }}>
        <strong>Estado: </strong>
        <span style={{ fontWeight: 'bold' }} className={getStatusColor()}>{status}</span>
      </p>
      {error && (
        <p style={{ margin: '5px 0', color: '#D32F2F', maxWidth: '300px' }}>
          <strong>Detalle: </strong>{error}
        </p>
      )}
    </div>
  );
};

export default SupabaseStatusCheck;
