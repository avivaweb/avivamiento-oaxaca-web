import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Users,
  Clock,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Download,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TheologySchool = () => {
  const { toast } = useToast();

  const handleAction = (action) => {
    toast({
      title: "🚧 Esta función aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀"
    });
  };

  const programs = [
    {
      title: "Bachillerato Teológico",
      duration: "3 años",
      modality: "Presencial",
      description: "Formación integral en teología bíblica, ministerio pastoral y liderazgo cristiano.",
      subjects: [
        "Teología Sistemática",
        "Hermenéutica Bíblica",
        "Historia de la Iglesia",
        "Homilética",
        "Consejería Pastoral",
        "Evangelismo y Misiones",
        "Liderazgo Cristiano",
        "Pneumatología"
      ]
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: "Formación Bíblica Sólida",
      description: "Estudio profundo de las Escrituras con herramientas de interpretación."
    },
    {
      icon: Users,
      title: "Desarrollo de Liderazgo",
      description: "Capacitación práctica para liderar con sabiduría y autoridad espiritual."
    },
    {
      icon: Award,
      title: "Certificación Reconocida",
      description: "Título avalado que te prepara para el ministerio profesional."
    },
    {
      icon: Star,
      title: "Mentores Experimentados",
      description: "Aprende de pastores con años de experiencia ministerial."
    }
  ];

  const testimonials = [
    {
      name: "Pastor David Flores",
      role: "Graduado 2022",
      text: "La escuela de teología transformó mi ministerio. Ahora predico con mayor autoridad y confianza en la Palabra.",
      image: "Pastor David Flores graduado de la escuela de teología"
    },
    {
      name: "Pastora Ana Morales",
      role: "Graduada 2021",
      text: "Los conocimientos adquiridos me han permitido pastorear con mayor sabiduría y efectividad en mi zona.",
      image: "Pastora Ana Morales graduada de la escuela de teología"
    }
  ];

  const schedule = [
    { day: "Lunes", time: "19:00 - 21:00", subject: "Teología Sistemática" },
    { day: "Miércoles", time: "19:00 - 21:00", subject: "Hermenéutica Bíblica" },
    { day: "Viernes", time: "19:00 - 21:00", subject: "Historia de la Iglesia" },
    { day: "Sábado", time: "09:00 - 12:00", subject: "Práctica Ministerial" }
  ];

  const requirements = [
    "Ser miembro activo de la iglesia por al menos 1 año",
    "Tener el respaldo del pastor de zona",
    "Demostrar llamado ministerial",
    "Compromiso de asistencia y participación",
    "Educación secundaria completada",
    "Entrevista con el equipo pastoral"
  ];

  return (
    <div className="bg-negro-sagrado">
      <Helmet>
        <title>Escuela de Teología - Iglesia Avivamiento: El Lugar de su Presencia</title>
        <meta name="description" content="Formación teológica integral para el liderazgo cristiano. Bachillerato Teológico con certificación reconocida. Desarrolla tu llamado ministerial." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-20 text-blanco-puro bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/img/theology-hero-bg.jpg)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Escuela de Teología
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Formando líderes para la próxima generación del Reino de Dios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-spiritual-red/10 text-spiritual-red rounded-full text-sm font-bold">
                <GraduationCap className="mr-2" size={16} />
                Formación Ministerial de Excelencia
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Desarrolla tu Llamado al Siguiente Nivel
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Nuestra Escuela de Teología está diseñada para equipar a hombres y 
                  mujeres con una formación bíblica sólida, herramientas ministeriales 
                  prácticas y el carácter cristiano necesario para liderar efectivamente 
                  en el Reino de Dios.
                </p>
                <p>
                  Con un enfoque pentecostal y una metodología que combina el estudio 
                  académico riguroso con la experiencia práctica del ministerio, 
                  preparamos líderes que impactarán su generación.
                </p>
              </div>
              {/* 
                Justificación de Diseño: La implementación de un tema oscuro de alto contraste es una decisión estratégica crucial.
                1. Identidad de Marca: Proyecta una imagen de seriedad, profundidad y fortaleza, alineada con la importancia de la formación teológica.
                2. Accesibilidad y Foco: Mejora la legibilidad y reduce la fatiga visual, permitiendo que los acentos de color (Rojo Espiritual)
                   guíen la atención del usuario hacia las acciones más importantes, como la inscripción.
                3. Coherencia: Unifica la experiencia visual con otras secciones clave del sitio, creando un ecosistema digital profesional y memorable.
              */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Button 
                  onClick={() => handleAction('apply')}
                  className="bg-spiritual-red text-white hover:bg-spiritual-red/90 shadow-lg shadow-spiritual-red/20 transform hover:scale-105 transition-transform duration-300"
                  size="lg"
                >
                  Solicitar Inscripción
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button 
                  onClick={() => handleAction('brochure')}
                  variant="outline"
                  className="border-spiritual-red text-spiritual-red hover:bg-spiritual-red hover:text-white"
                  size="lg"
                >
                  <Download className="mr-2" size={16} />
                  Descargar Folleto
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-spiritual-red/20">
                <img  
                  className="w-full h-auto object-cover"
                  alt="Estudiantes de teología en clase estudiando la Biblia"
                  src="/img/logo-principal-color.png" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-gris-oscuro-sutil/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Nuestro Programa de Estudio
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Una formación teológica integral para un ministerio eficaz.
            </p>
          </motion.div>

          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-negro-sagrado rounded-2xl p-8 md:p-12 shadow-2xl border border-spiritual-red/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-spiritual-red rounded-full flex items-center justify-center mr-5 shadow-md">
                      <GraduationCap className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {program.title}
                      </h3>
                      <div className="flex items-center space-x-6 text-sm text-white/60 mt-2">
                        <span className="flex items-center">
                          <Clock className="mr-1.5" size={14} />
                          {program.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="mr-1.5" size={14} />
                          {program.modality}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {program.subjects.map((subject, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="text-spiritual-red flex-shrink-0" size={18} />
                        <span className="text-white/90">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-spiritual-red/10 rounded-xl p-6 border border-spiritual-red/20">
                  <h4 className="font-bold text-white text-lg mb-4">Información Clave</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Duración:</span>
                      <span className="font-semibold text-white">{program.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Modalidad:</span>
                      <span className="font-semibold text-white">{program.modality}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Inicio de Clases:</span>
                      <span className="font-semibold text-white">Febrero 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Inversión Mensual:</span>
                      <span className="font-semibold text-white">$500 MXN</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAction('apply')}
                    className="w-full mt-6 bg-spiritual-red text-white hover:bg-spiritual-red/90"
                  >
                    Inscribirse Ahora
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              ¿Por Qué Estudiar con Nosotros?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Beneficios únicos de nuestra formación teológica.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gris-oscuro-sutil rounded-2xl p-8 border border-spiritual-red/20 group hover:border-spiritual-red/50 transition-all duration-300"
              >
                  <div className="w-16 h-16 bg-spiritual-red rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule & Requirements */}
      <section className="py-24 bg-gris-oscuro-sutil/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-8">
                Horarios y Requisitos
              </h2>
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Horarios de Clases</h3>
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div key={index} className="bg-negro-sagrado rounded-lg p-4 border border-spiritual-red/20 flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-white">{item.day}</h4>
                          <p className="text-white/60 text-sm">{item.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-spiritual-red">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Requisitos de Admisión</h3>
                  <div className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="text-spiritual-red flex-shrink-0 mt-1" size={18} />
                        <span className="text-white/80">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-negro-sagrado p-8 rounded-2xl border border-spiritual-red/30 shadow-2xl mt-10 lg:mt-0"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Proceso de Inscripción
              </h3>
              <p className="text-white/70 mb-6">
                Las inscripciones para el ciclo 2025 estarán abiertas del 
                1 al 31 de enero. ¡No pierdas la oportunidad de formar parte 
                de la próxima generación de líderes!
              </p>
              <Button 
                onClick={() => handleAction('apply')}
                size="lg"
                className="w-full bg-spiritual-red text-white hover:bg-spiritual-red/90 shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <GraduationCap className="mr-2" size={18} />
                Iniciar Proceso de Inscripción
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Testimonios de Graduados
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Escucha las experiencias de quienes han sido transformados por esta formación.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gris-oscuro-sutil rounded-2xl p-8 border border-spiritual-red/20"
              >
                <div className="flex items-center mb-5">
                  <img  
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-spiritual-red/50 p-1"
                    alt={`Foto de ${testimonial.name}`}
                    src="/img/logo-principal-color.png" />
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-spiritual-red font-semibold text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/80 italic leading-relaxed">
                  <span className="text-spiritual-red font-bold text-2xl mr-1">“</span>{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gris-oscuro-sutil/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              ¿Sientes el Llamado a Estudiar Teología?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              No dejes pasar esta oportunidad de prepararte para un ministerio 
              efectivo y transformador. Tu generación te está esperando.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => handleAction('apply')}
                size="lg"
                className="bg-spiritual-red text-white hover:bg-spiritual-red/90 shadow-lg shadow-spiritual-red/20 transform hover:scale-105 transition-transform duration-300"
              >
                <GraduationCap className="mr-2" size={18} />
                Solicitar Inscripción Ahora
              </Button>
              <Button 
                onClick={() => handleAction('info')}
                size="lg"
                variant="outline"
                className="border-spiritual-red text-spiritual-red hover:bg-spiritual-red hover:text-white"
              >
                <Phone className="mr-2" size={18} />
                Contactar a un Asesor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TheologySchool;

