
import { useState, useEffect } from 'react';

/**
 * @callback FetchFunction
 * @returns {Promise<any>} Una promesa que se resuelve con los datos obtenidos.
 */

/**
 * Hook personalizado para obtener datos de Supabase de forma centralizada.
 * Maneja los estados de carga, error y los datos resultantes.
 *
 * @param {FetchFunction} fetchFn - La función asíncrona que realiza la llamada a Supabase.
 * @returns {{
 *   data: any,
 *   isLoading: boolean,
 *   error: Error | null
 * }} - Un objeto con el estado de la petición.
 */
const useSupabaseFetch = (fetchFn) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err);
        console.error("Error al obtener datos de Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFn]); // El efecto se re-ejecutará si la función de fetching cambia.

  return { data, isLoading, error };
};

export default useSupabaseFetch;

/*
 * --- EJEMPLO DE USO ---
 *
 * import React from 'react';
 * import useSupabaseFetch from './useSupabaseFetch';
 * import { supabase } from './supabaseClient'; // Tu cliente de Supabase
 *
 * // 1. Define tu función de fetching fuera del componente.
 * const fetchSermons = async () => {
 *   const { data, error } = await supabase.from('sermones').select('*');
 *   if (error) {
 *     throw error;
 *   }
 *   return data;
 * };
 *
 * const SermonsComponent = () => {
 *   // 2. Usa el hook en tu componente, pasándole la función de fetching.
 *   const { data: sermons, isLoading, error } = useSupabaseFetch(fetchSermons);
 *
 *   if (isLoading) {
 *     return <div>Cargando sermones...</div>;
 *   }
 *
 *   if (error) {
 *     return <div>Error: {error.message}</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Sermones</h1>
 *       <ul>
 *         {sermons && sermons.map(sermon => (
 *           <li key={sermon.id}>{sermon.titulo}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * };
 *
 * export default SermonsComponent;
 *
 */
