import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const GeneralPastorCard = ({ pastor, index }) => {
  const { toast } = useToast();

  const handleContactPastor = (pastorName) => {
    toast({
      title: "Contacto Próximamente",
      description: `La funcionalidad para contactar a ${pastorName} estará disponible pronto.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-negro-sagrado rounded-2xl p-8 shadow-lg card-hover border border-gris-oscuro-sutil/20 flex flex-col h-full"
    >
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <img  
            className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg border-4 border-divine-gold"
            alt={`Foto de ${pastor.name}`}
            src={pastor.image_url || '/img/logo-principal-blanco.png'} />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rojo-espiritual rounded-full flex items-center justify-center">
            <Crown className="text-blanco-puro" size={16} />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-blanco-puro mb-1">
          {pastor.name}
        </h3>
        <p className="text-rojo-espiritual font-semibold mb-4">{pastor.role}</p>
      </div>

      <p className="text-blanco-puro/90 text-center mb-6 leading-relaxed flex-grow">
        {pastor.description}
      </p>

      <div className="flex justify-center space-x-3 mt-auto">
        <Button
          onClick={() => handleContactPastor(pastor.name)}
          size="sm"
          className="bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark"
        >
          <Mail className="mr-2" size={14} />
          Contactar
        </Button>
      </div>
    </motion.div>
  );
};

const GeneralPastorsSection = ({ pastors }) => {
  if (!pastors || pastors.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-xl text-blanco-puro/80">No hay pastores generales registrados.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-negro-sagrado">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-rojo-espiritual text-blanco-puro rounded-full text-sm font-medium mb-4">
            <Crown className="mr-2" size={16} />
            Pastores Generales
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-blanco-puro mb-4">
            Liderazgo Principal
          </h2>
          <p className="text-xl text-blanco-puro/80 max-w-3xl mx-auto">
            Los pastores que Dios ha ungido para dirigir este mover espiritual.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {pastors.map((pastor, index) => (
            <GeneralPastorCard key={pastor.id} pastor={pastor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeneralPastorsSection;