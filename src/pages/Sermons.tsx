import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import useSupabaseFetch from '../lib/useSupabaseFetch'; // Importar el hook personalizado
import SermonSearch from '../components/sermons/SermonSearch.tsx';
import SermonsList from '../components/sermons/SermonsList.tsx';

// Función de utilidad para generar datos estructurados de Schema.org para un sermón.
// Esto ayuda a los motores de búsqueda a entender el contenido del video.
const getSermonSchema = (sermon) => {
  // Validar que los datos esenciales del sermón estén presentes para generar un Schema.org válido.
  if (!sermon || !sermon.title || !sermon.video_url || !sermon.date) {
    console.warn("Datos incompletos del sermón para Schema.org:", sermon);
    return null;
  }

  // Determinar si es una transmisión en vivo o un video grabado.
  // Se asume la existencia de un campo 'is_live_stream' en el objeto del sermón.
  const isLiveStream = sermon.is_live_stream || false;
  const schemaType = isLiveStream ? 'LiveStream' : 'VideoObject';

  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": sermon.title,
    // Descripción del sermón, con un fallback si no está disponible.
    "description": sermon.description || `Sermón "${sermon.title}" impartido por ${sermon.speaker || 'un orador'}.`,
    // Fecha de subida o publicación del sermón, se asume formato ISO 8601.
    "uploadDate": sermon.date,
    // URL directa al contenido del video.
    "contentUrl": sermon.video_url,
    // URL de la miniatura del video, con una imagen por defecto si no se proporciona.
    "thumbnailUrl": sermon.thumbnail_url || "https://www.avivamiento.com/images/default-sermon-thumbnail.jpg",
    // Duración del video en formato ISO 8601 (ej. "PT1H30M").
    "duration": sermon.duration || "",
    // Información del publicador (Iglesia Avivamiento).
    "publisher": {
      "@type": "Organization",
      "name": "Iglesia Avivamiento",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.avivamiento.com/images/logo-avivamiento.png"
      }
    },
    "inLanguage": "es", // Idioma del contenido.
    "audience": {
      "@type": "Audience",
      "audienceType": "Christian community" // Tipo de audiencia.
    },
    // Palabras clave relevantes para el sermón, generadas a partir de los datos disponibles.
    "keywords": `sermón, ${sermon.title}, ${sermon.speaker || ''}, ${sermon.series || ''}, iglesia avivamiento, palabra de Dios, sanidad, milagros, Oaxaca`.split(', ').filter(Boolean).join(', '),
    "videoQuality": "HD", // Calidad de video asumida.
    "regionsAllowed": "MX", // Regiones donde el contenido está permitido.
  };

  // Si es una transmisión en vivo, añadir propiedades específicas de BroadcastEvent.
  if (isLiveStream) {
    schema.publication = {
      "@type": "BroadcastEvent",
      "isLiveBroadcast": true,
      "startDate": sermon.live_start_date || sermon.date, // Fecha de inicio de la transmisión.
      "endDate": sermon.live_end_date || sermon.date,     // Fecha de fin de la transmisión.
    };
  }

  return schema;
};


// Componente refactorizado para usar el hook useSupabaseFetch para manejar la obtención de datos.
const SermonsPage = () => {
  // Estado para el término de búsqueda.
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para los sermones filtrados.
  const [filteredSermons, setFilteredSermons] = useState([]);

  // Usar el hook personalizado para obtener los sermones.
  const { data: sermons, isLoading, error } = useSupabaseFetch(async () => {
    const { data, error: supabaseError } = await supabase
      .from('sermones')
      .select('*')
      .order('date', { ascending: false });

    if (supabaseError) {
      // Si Supabase devuelve un error, lo lanzamos para ser manejado por el hook.
      throw supabaseError;
    }
    return data;
  });

  // useEffect para filtrar los sermones cuando el término de búsqueda o los datos cargados cambian.
  useEffect(() => {
    // Si no hay sermones (aún cargando o hubo un error), mostrar una lista vacía.
    if (!sermons) {
      setFilteredSermons([]);
      return;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    const newFilteredSermons = sermons.filter(sermon => {
      // Asegurarse de que los campos existen antes de llamar a toLowerCase
      const title = sermon.title || '';
      const speaker = sermon.speaker || '';
      const series = sermon.series || '';
      
      return (
        title.toLowerCase().includes(lowercasedFilter) ||
        speaker.toLowerCase().includes(lowercasedFilter) ||
        series.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredSermons(newFilteredSermons);
  }, [searchTerm, sermons]); // Se ejecuta si `searchTerm` o la lista de `sermons` cambian.

  // Generar los esquemas de Schema.org para los sermones cargados.
  const sermonSchemas = sermons && sermons.map(sermon => getSermonSchema(sermon)).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>Sermones - Iglesia Avivamiento</title>
        <meta name="description" content="Explora nuestra biblioteca de sermones y prédicas. Mensajes de fe, esperanza y poder para edificar tu vida espiritual." />
        {/* Inserción de datos estructurados de Schema.org para SEO. */}
        {sermonSchemas && sermonSchemas.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(sermonSchemas.length === 1 ? sermonSchemas[0] : sermonSchemas)}
          </script>
        )}
      </Helmet>
      <div className="bg-negro-sagrado text-blanco-puro min-h-screen">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }} 
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-divine-gold mb-4">Biblioteca de Sermones</h1>
            <p className="text-xl text-blanco-puro/80 max-w-3xl mx-auto">Palabra de Dios que transforma vidas. Encuentra inspiración y fortaleza en cada mensaje.</p>
          </motion.div>

          {/* Renderizado condicional: Muestra un mensaje mientras carga */}
          {isLoading && <div className="text-center text-xl">Cargando sermones...</div>}

          {/* Renderizado condicional: Muestra un mensaje de error si ocurre uno */}
          {error && <div className="text-center text-xl text-red-500">Error: {error.message}</div>}

          {/* Renderizado condicional: Muestra el contenido solo si no hay carga ni error */}
          {!isLoading && !error && (
            <>
              <SermonSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              {filteredSermons.length > 0 ? (
                // Si hay sermones filtrados, muestra la lista
                <SermonsList sermons={filteredSermons} />
              ) : (
                // Si no hay sermones que coincidan con la búsqueda
                <div className="text-center py-12">
                  <p className="text-xl text-gray-400">
                    {searchTerm ? 'No se encontraron sermones que coincidan con tu búsqueda.' : 'No hay sermones disponibles en este momento.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

// React.memo se utiliza para optimizar el rendimiento del componente,
// evitando re-renders innecesarios si sus props no han cambiado.
export default React.memo(SermonsPage);