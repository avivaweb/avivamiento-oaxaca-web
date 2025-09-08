import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Calendar, 
  Users, 
  BookOpen, 
  Heart,
  ArrowRight,
  Star,
  Map as MapIcon,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [testimonialsRes, eventsRes] = await Promise.all([
          supabase.from('testimonials').select('*').order('display_order', { ascending: true }).limit(3),
          supabase.from('events').select('*').order('event_date', { ascending: true }).limit(2)
        ]);

        if (testimonialsRes.error) throw testimonialsRes.error;
        if (eventsRes.error) throw eventsRes.error;

        setTestimonials(testimonialsRes.data);
        setUpcomingEvents(eventsRes.data);

      } catch (error) {
        console.error("Error fetching home page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const features = [
    {
      icon: Users,
      title: "Grupos Familiares",
      description: "Experimenta la bendición de congregarnos en un ambiente íntimo para crecer en la fe y el discipulado.",
      link: "/grupos-familiares",
      color: "from-rojo-espiritual to-rojo-espiritual-dark"
    },
    {
      icon: BookOpen,
      title: "Escuela de Teología",
      description: "Fórmate como un líder ministerial y profundiza en la Palabra de Dios para impactar a tu generación.",
      link: "/escuela-teologia",
      color: "from-rojo-espiritual to-rojo-espiritual-dark"
    },
    {
      icon: Heart,
      title: "Sanidad y Liberación",
      description: "Encuentra restauración para tu corazón y sé testigo del poder de Dios que sana y libera por completo.",
      link: "/ministerios",
      color: "from-rojo-espiritual to-rojo-espiritual-dark"
    },
    {
      icon: MapIcon,
      title: "Misiones",
      description: "Sé parte de la expansión del evangelio en Oaxaca y las naciones a través de nuevas congregaciones.",
      link: "/ministerios",
      color: "from-rojo-espiritual to-rojo-espiritual-dark"
    }
  ];

  const stats = [
    { number: "10+", label: "Años de Ministerio" },
    { number: "8", label: "Zonas Geográficas" },
    { number: "500+", label: "Miembros Activos" },
    { number: "50+", label: "Grupos Familiares" }
  ];

  return (
    <>
      <Helmet>
        <title>Iglesia Cristiana en Oaxaca - Avivamiento: Sanidad, Milagros y Poder</title>
        <meta name="description" content="Descubre Avivamiento, una iglesia cristiana en Oaxaca enfocada en la sanidad divina, milagros y el poder del Espíritu Santo. Experimenta restauración y únete a nuestros Grupos Familiares." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-pattern"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-shadow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Avivamiento: El Lugar de su Presencia
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-white/90 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Donde lo Sobrenatural se Manifiesta
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                Somos un mover de Dios llamados a avivar, transformar y reformar vidas, comunidades y naciones.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark font-semibold px-8 py-3">
                  <Link to="/quienes-somos">
                    Conoce Nuestra Historia
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-blanco-puro text-blanco-puro hover:bg-blanco-puro hover:text-rojo-espiritual font-semibold px-8 py-3">
                  <Link to="/sermones">
                    Ver Sermón Reciente
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nuestra Visión Section */}
      <section className="py-20 bg-negro-sagrado text-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">Nuestra Visión</h2>
            <p className="text-xl text-blanco-puro/90 max-w-3xl mx-auto leading-relaxed">
              Creemos en una iglesia donde la obra de Dios es evidente: salvando, sanando, liberando y bendiciendo. Nuestra misión es demostrar el poder sobrenatural y el amor de Dios, levantando líderes y equipando a cada creyente para una vida con propósito.
            </p>
            <Button asChild size="lg" className="bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark">
              <Link to="/quienes-somos">Conoce Nuestra Visión Completa</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-rojo-espiritual mb-2">{stat.number}</div>
                <div className="text-gris-oscuro-sutil font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-negro-sagrado mb-4">Ministerios para Tu Crecimiento</h2>
            <p className="text-xl text-gris-oscuro-sutil max-w-3xl mx-auto">Descubre las diferentes formas de crecer espiritualmente y ser parte de la familia de Dios.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="group">
                <Link to={feature.link}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg card-hover group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 flex-shrink-0`}>
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-negro-sagrado mb-2">{feature.title}</h3>
                    <p className="text-gris-oscuro-sutil mb-4 flex-grow">{feature.description}</p>
                    <div className="flex items-center text-rojo-espiritual font-medium group-hover:text-rojo-espiritual-dark">
                      Saber más
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios de Impacto Section */}
      <section className="py-20 bg-negro-sagrado text-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Testimonios de Impacto</h2>
            <p className="text-xl text-blanco-puro/90 max-w-3xl mx-auto">La obra de Dios es evidente. Escucha lo que Él está haciendo en la vida de las personas.</p>
          </motion.div>
          {!loading && testimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={testimonial.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="bg-blanco-puro/10 backdrop-blur-md rounded-2xl p-6 border border-blanco-puro/20">
                  <div className="flex items-center mb-4">
                    <img className="w-12 h-12 rounded-full object-cover mr-4" alt={`Foto de ${testimonial.name}`} src={testimonial.image_url || '/img/logo-principal-blanco.png'} />
                    <div><h4 className="font-semibold">{testimonial.name}</h4></div>
                  </div>
                  <p className="text-blanco-puro/90 italic">"{testimonial.testimonial_text}"</p>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark">
              <Link to="/testimonios">Comparte o Lee Más Testimonios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Eventos Próximos Section */}
      <section className="py-20 bg-blanco-puro text-negro-sagrado">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Próximos Eventos</h2>
            <p className="text-xl text-gris-oscuro-sutil max-w-3xl mx-auto">No te pierdas nuestras próximas reuniones y actividades especiales.</p>
            {!loading && upcomingEvents.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {upcomingEvents.map((event, index) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-2xl p-6 shadow-lg card-hover h-full border">
                    <h3 className="text-xl font-semibold text-negro-sagrado mb-2">{event.title}</h3>
                    <p className="text-rojo-espiritual font-medium mb-2">{new Date(event.event_date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-gris-oscuro-sutil">{event.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
            <Button asChild size="lg" className="bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark mt-8">
              <Link to="/eventos">Ver Calendario Completo</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-negro-sagrado text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">¿Listo para Dar el Siguiente Paso?</h2>
            <p className="text-xl text-gray-300">Únete a nuestra familia de fe y comienza tu jornada de crecimiento espiritual.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-rojo-espiritual text-blanco-puro hover:bg-rojo-espiritual-dark">
                <Link to="/grupos-familiares">
                  <Heart className="mr-2" size={16} />
                  Encuentra un Grupo Familiar
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-blanco-puro text-blanco-puro hover:bg-blanco-puro hover:text-rojo-espiritual">
                <Link to="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
