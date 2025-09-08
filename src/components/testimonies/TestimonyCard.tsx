
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Mic } from 'lucide-react';

const TestimonyCard = ({ testimony, index }) => {

  const getMediaIcon = () => {
    if (testimony.video_url) {
      return <Video className="h-6 w-6 text-blanco-puro" />;
    }
    if (testimony.image_url) {
      return <Camera className="h-6 w-6 text-blanco-puro" />;
    }
    return <Mic className="h-6 w-6 text-blanco-puro" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200/80 flex flex-col"
    >
      {testimony.video_url ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={testimony.video_url.replace("watch?v=", "embed/")}
            title={testimony.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : testimony.image_url && (
        <div className="relative h-56 w-full">
            <img
                src={testimony.image_url}
                alt={testimony.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold text-negro-sagrado leading-tight flex-1 pr-4">
                {testimony.title}
            </h2>
            <div className="flex-shrink-0 w-12 h-12 bg-rojo-espiritual rounded-full flex items-center justify-center shadow-md">
                {getMediaIcon()}
            </div>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Publicado el: {new Date(testimony.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p className="text-gray-700 leading-relaxed text-base line-clamp-4 flex-grow">
          {testimony.content}
        </p>
        <button className="mt-6 text-rojo-espiritual font-semibold hover:underline self-start">
            Leer más...
        </button>
      </div>
    </motion.div>
  );
};

export default TestimonyCard;
