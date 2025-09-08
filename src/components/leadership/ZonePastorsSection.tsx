import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import LeadershipCard from './LeadershipCard';

const ZonePastorsSection = ({ pastors }) => {
  if (!pastors || pastors.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-xl text-gris-oscuro-sutil">No hay pastores de zona registrados en este momento.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-blanco-puro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-rojo-espiritual text-blanco-puro rounded-full text-sm font-medium mb-4">
            <MapPin className="mr-2" size={16} />
            Pastores de Zona
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-negro-sagrado mb-4">
            Liderazgo Regional
          </h2>
          <p className="text-xl text-gris-oscuro-sutil max-w-3xl mx-auto">
            Pastores dedicados a servir en las 8 zonas geográficas de Oaxaca.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pastors.map((pastor) => (
            <motion.div
              key={pastor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <LeadershipCard 
                name={pastor.name}
                role={pastor.role}
                image_url={pastor.image_url}
                description={pastor.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZonePastorsSection;