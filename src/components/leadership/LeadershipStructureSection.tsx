import React from 'react';
import { motion } from 'framer-motion';
import { Crown, MapPin, Users } from 'lucide-react';

const StructureItem = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="w-16 h-16 bg-rojo-vibrante rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="text-blanco-puro" size={28} />
    </div>
    <h3 className="text-xl font-semibold text-blanco-puro mb-3">
      {title}
    </h3>
    <p className="text-blanco-puro/80">
      {description}
    </p>
  </motion.div>
);

const LeadershipStructureSection = () => {
  const structureItems = [
    {
      icon: Crown,
      title: "Pastores Generales",
      description: "Liderazgo principal que dirige la visión y estrategia ministerial de toda la iglesia",
      delay: 0
    },
    {
      icon: MapPin,
      title: "Pastores de Zona",
      description: "Líderes regionales responsables del crecimiento y pastoreo en cada zona geográfica",
      delay: 0.2
    },
    {
      icon: Users,
      title: "Líderes de Grupos",
      description: "Líderes locales que pastorean grupos familiares y células de crecimiento",
      delay: 0.4
    }
  ];

  return (
    <section className="py-20 bg-negro-fondo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-blanco-puro mb-4">
            Estructura de Liderazgo
          </h2>
          <p className="text-xl text-blanco-puro/90 max-w-3xl mx-auto">
            Organización ministerial diseñada para el crecimiento y la expansión del Reino
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {structureItems.map((item, index) => (
            <StructureItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipStructureSection;