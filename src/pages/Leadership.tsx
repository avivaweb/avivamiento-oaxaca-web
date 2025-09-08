import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, BookOpen, AlertTriangle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import GeneralPastorsSection from '@/components/leadership/GeneralPastorsSection.tsx';
import ZonePastorsSection from '@/components/leadership/ZonePastorsSection.tsx';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast.js';

const Leadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('leaders')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        setLeaders(data);
      } catch (err) {
        setError('No se pudo cargar el liderazgo.');
        toast({
          variant: "destructive",
          title: "Error de Carga",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, [toast]);

  const generalPastors = leaders.filter(l => l.role.includes('General'));
  const zonePastors = leaders.filter(l => l.role.includes('Zona'));

  return (
    <>
      <Helmet>
        <title>Liderazgo - Iglesia Avivamiento</title>
        <meta name="description" content="Conoce a nuestro equipo pastoral y líderes espirituales." />
      </Helmet>

      <header className="pt-24 pb-16 bg-negro-sagrado text-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">Nuestro Liderazgo</h1>
            <p className="text-xl md:text-2xl text-blanco-puro/90 max-w-3xl mx-auto mt-6">Conoce a los líderes que Dios ha levantado para pastorear a su pueblo.</p>
          </motion.div>
        </div>
      </header>

      {loading && (
        <div className="flex items-center justify-center text-center py-20 bg-negro-sagrado">
          <Loader className="animate-spin h-12 w-12 text-rojo-espiritual mr-4" />
          <p className="text-xl text-blanco-puro">Cargando liderazgo...</p>
        </div>
      )}

      {error && (
        <div className="py-20 bg-negro-sagrado">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center bg-red-900/20 border border-red-500/30 p-8 rounded-lg">
              <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
              <p className="text-xl font-semibold text-red-300">Ocurrió un Error</p>
              <p className="text-blanco-puro/80">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <GeneralPastorsSection pastors={generalPastors} />
          <ZonePastorsSection pastors={zonePastors} />
        </>
      )}

      <section className="py-20 bg-gris-oscuro-sutil text-blanco-puro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold">¿Sientes el Llamado al Liderazgo?</h2>
            <p className="text-xl text-blanco-puro/90 mt-6">Descubre cómo puedes ser parte de nuestro equipo ministerial.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="bg-rojo-espiritual hover:bg-rojo-espiritual-dark">
                <a href="/escuela-teologia"><BookOpen className="mr-2" size={16} />Escuela de Teología</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-rojo-espiritual text-rojo-espiritual hover:bg-rojo-espiritual hover:text-blanco-puro">
                <a href="/contacto"><Heart className="mr-2" size={16} />Contactar Liderazgo</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Leadership;