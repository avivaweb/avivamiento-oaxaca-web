
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const EventCard = ({ event, index }) => {
  const { toast } = useToast();

  const handleEventAction = (action, eventTitle) => {
    toast({
      title: "Función en desarrollo",
      description: `La acción '${action}' para el evento ${eventTitle} estará disponible pronto.`,
    });
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return 'Fecha no disponible';
    const start = new Date(startDate);
    if (!endDate) {
        return start.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    const end = new Date(endDate);
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} de ${start.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`;
    }
    return `${start.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}`;
  };

  const progress = event.capacity > 0 ? (event.registered / event.capacity) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-blanco-puro rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border border-gray-200"
    >
      <div className="relative h-48 overflow-hidden">
        <img  
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={`Imagen del evento ${event.title}`}
          src={event.image_url || '/img/logo-principal-color.png'} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 right-4 bg-rojo-espiritual/80 text-blanco-puro px-3 py-1 rounded-full text-sm font-bold">
          {event.price || 'Gratis'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-negro-sagrado mb-2 group-hover:text-rojo-espiritual transition-colors duration-300">
          {event.title}
        </h3>
        
        <p className="text-gris-oscuro-sutil text-sm mb-4 leading-relaxed flex-grow">
          {event.description}
        </p>

        <div className="space-y-2 mb-4 text-sm text-gris-oscuro-sutil">
          <div className="flex items-center"><Calendar className="mr-2 text-rojo-espiritual" size={16} /> {formatDateRange(event.date, event.endDate)}</div>
          <div className="flex items-center"><Clock className="mr-2 text-rojo-espiritual" size={16} /> {event.time || 'Hora no definida'}</div>
          <div className="flex items-center"><MapPin className="mr-2 text-rojo-espiritual" size={16} /> {event.location || 'Ubicación a confirmar'}</div>
        </div>

        <div className="mt-auto">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-semibold text-negro-sagrado">Registrados</span>
                    <span className="text-gris-oscuro-sutil">{event.registered} / {event.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-rojo-espiritual h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex space-x-2">
                <Button 
                    onClick={() => handleEventAction('register', event.title)}
                    className="w-full bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark"
                >
                    Registrarme <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button 
                    onClick={() => handleEventAction('share', event.title)}
                    size="icon"
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-rojo-espiritual"
                >
                    <Share2 size={16} />
                </Button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
