import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Music, Baby, Zap, Users, Crown, Heart, Sparkles, ArrowRight, Star, LucideIcon, BugPlay as Pray } from 'lucide-react'; // Import LucideIcon for typing
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useSupabaseFetch from '../lib/useSupabaseFetch'; // Import the custom hook
import { supabase } from '../lib/supabaseClient'; // Import the Supabase client

// Define the interface for Ministry data fetched from Supabase
interface MinistryData {
  id: string;
  name: string;
  description: string;
  leader: string;
  image_url: string;
  order?: number; // Optional order for sorting
  details: string[]; // Assuming details are stored as a JSONB array or similar
  icon_name: string; // Stores the string name of the Lucide icon (e.g., "Music", "Baby")
  color: string; // Stores the Tailwind color classes for the gradient
}

// Map string icon names from the database to actual Lucide icon components
const iconMap: { [key: string]: LucideIcon } = {
  Music: Music,
  Baby: Baby,
  Zap: Zap,
  Users: Users,
  Crown: Crown,
  Heart: Heart,
  Sparkles: Sparkles,
  Pray: Pray, // Using BugPlay as Pray as per original component
  // Add other icons as needed
};

const Ministries = () => {
  const { toast } = useToast();

  // Function to fetch ministries from Supabase
  const fetchMinistries = async () => {
    // Fetch data from the 'ministries' table, ordering by 'order' if available, otherwise by 'name'
    const { data, error } = await supabase
      .from('ministries')
      .select('*')
      .order('order', { ascending: true }) // Try to order by 'order' column
      .order('name', { ascending: true }); // Fallback to 'name' if 'order' is not effective or present

    if (error) {
      throw error;
    }
    return data;
  };

  // Use the custom hook to manage fetching state
  const { data: ministries, isLoading, error } = useSupabaseFetch(fetchMinistries);

  const handleJoinMinistry = (ministryName: string) => {
    toast({
      title: "🚧 Esta función aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀"
    });
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-negro-sagrado">
        Cargando ministerios...
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-rojo-espiritual">
        Error al cargar ministerios: {error.message}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Ministerios - Iglesia Avivamiento: El Lugar de su Presencia</title>
        <meta name="description" content="Descubre los diferentes ministerios donde puedes servir y crecer espiritualmente: Alabanza, Niños, Jóvenes, Damas, Varones, Intercesión, Sanidad Interior y Misiones." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-negro-sagrado text-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Nuestros Ministerios
            </h1>
            <p className="text-xl md:text-2xl text-blanco-puro max-w-3xl mx-auto">
              Descubre tu lugar de servicio y crecimiento en el Reino de Dios
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-blanco-puro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blanco-puro text-negro-sagrado rounded-full text-sm font-medium">
              <Star className="mr-2" size={16} />
              Llamados a Servir
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-negro-sagrado">
              Cada Miembro, Un Ministro
            </h2>
            <p className="text-gris-oscuro-sutil leading-relaxed">
              En Avivamiento creemos que cada persona tiene un llamado único y dones especiales 
              para servir en el Reino de Dios. Nuestros ministerios están diseñados para que 
              puedas descubrir, desarrollar y usar tus talentos para la gloria de Dios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 bg-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Render ministries dynamically from Supabase */}
            {ministries && ministries.map((ministry, index) => {
              const IconComponent = iconMap[ministry.icon_name]; // Get the icon component from the map
              return (
                <motion.div
                  key={ministry.id} // Use unique ID from database as key
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {/* Card container: white background, rounded corners, overflow hidden, shadow, full height, and subtle hover effects */}
                  <div className="bg-blanco-puro rounded-2xl overflow-hidden shadow-lg h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    {/* Ministry Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img  
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={`${ministry.name} en acción`}
                        src={ministry.image_url || "/img/logo-principal-color.png"} // Use image_url from DB, fallback to default
                      />
                      <div className="absolute inset-0 bg-negro-sagrado/50 to-transparent"></div>
                      {IconComponent && ( // Conditionally render icon if found
                        <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${ministry.color} rounded-full flex items-center justify-center`}>
                          <IconComponent className="text-blanco-puro" size={24} />
                        </div>
                      )}
                    </div>

                    {/* Ministry Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-negro-sagrado mb-3">
                        {ministry.name}
                      </h3>
                      <p className="text-gris-oscuro-sutil mb-4 leading-relaxed">
                        {ministry.description}
                      </p>

                      {/* Ministry Details */}
                      <div className="space-y-2 mb-6">
                        {ministry.details && ministry.details.map((detail, idx) => ( // Ensure details exist before mapping
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-rojo-espiritual rounded-full"></div>
                            <span className="text-gris-oscuro-sutil">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Join Button */}
                      <Button
                        onClick={() => handleJoinMinistry(ministry.name)}
                        className={`w-full bg-gradient-to-r ${ministry.color} hover:opacity-90 transition-opacity`}
                      >
                        Unirme al Ministerio
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-negro-sagrado mb-4">
              ¿Cómo Unirte a un Ministerio?
            </h2>
            <p className="text-gris-oscuro-sutil max-w-3xl mx-auto">
              Pasos sencillos para comenzar tu jornada de servicio en el Reino
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-negro-sagrado rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blanco-puro font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-negro-sagrado mb-3">
                Ora y Busca Dirección
              </h3>
              <p className="text-gris-oscuro-sutil">
                Pide a Dios que te muestre dónde Él quiere que sirvas según tus dones y pasiones
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-negro-sagado rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blanco-puro font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-negro-sagado mb-3">
                Contacta al Líder
              </h3>
              <p className="text-gris-oscuro-sutil">
                Habla con el líder del ministerio que te interesa para conocer más detalles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-negro-sagado rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blanco-puro font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-negro-sagado mb-3">
                Comienza a Servir
              </h3>
              <p className="text-gris-oscuro-sutil">
                Participa en las actividades y capacitaciones para crecer en tu ministerio
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-negro-sagado text-blanco-puro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Tu Llamado Te Está Esperando
            </h2>
            <p className="text-xl text-blanco-puro">
              Dios tiene un lugar especial para ti en Su Reino. 
              No esperes más para descubrir tu propósito y comenzar a servir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark"
              >
                <a href="/contacto">
                  <Heart className="mr-2" size={16} />
                  Hablar con un Pastor
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-rojo-espiritual text-rojo-espiritual hover:bg-rojo-espiritual hover:text-blanco-puro"
              >
                <a href="/grupos-familiares">
                  <Users className="mr-2" size={16} />
                  Unirme a un Grupo Familiar
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Ministries;
