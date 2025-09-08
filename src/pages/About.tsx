import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Target, 
  Users, 
  BookOpen,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin
} from 'lucide-react';

// Helper function to parse markdown-style bolding
const renderWithStrongTags = (text) => {
  const parts = text.split(/(\*\*|\*\*)/g);
  return parts.map((part, i) => {
    if (part === '**') {
      return null;
    }
    const isBold = i > 0 && parts[i - 1] === '**' && i < parts.length -1 && parts[i+1] === '**';
    if (isBold) {
        return <strong key={i}>{part}</strong>;
    }
    // Check if the previous part was a bold tag to avoid rendering the text twice
    if (i > 1 && parts[i-2] === '**') {
        return null;
    }
    return part;
  });
};

const About = () => {
  const beliefs = [
    "**Dios:** Creemos en un solo Dios verdadero, manifestado en tres personas: Padre, Hijo y Espíritu Santo. La revelación más poderosa de Jesús fue mostrarnos a Dios como \"Padre\", el que nutre, sustenta y protege.",
    "**Jesucristo:** Creemos en Jesucristo, el Hijo de Dios, quien murió por nuestros pecados y resucitó al tercer día, siendo el único camino a la salvación.",
    "**La Biblia:** Creemos que la Biblia es la inerrante, inspirada y Palabra de Dios con autoridad, siendo el manual para la vida de todo creyente.",
    "**El Espíritu Santo:** Creemos que el Espíritu Santo es una persona real, nuestro fiel y amante compañero, quien nos capacita para continuar el ministerio de Cristo y nos equipa con Su poder para el cumplimiento de Su agenda.",
    "**Sanidad y Milagros:** Creemos que el poder sobrenatural de Dios para sanar y obrar milagros es para hoy."
  ];

  const objectives = [
    {
      icon: Users,
      title: "Iglesia Multitudinaria",
      description: "Alcanzar a miles de personas con el evangelio de Cristo"
    },
    {
      icon: Heart,
      title: "Amor y Poder Sobrenatural",
      description: "Demostrar el amor de Dios a través de milagros y sanidades"
    },
    {
      icon: Star,
      title: "Liderazgo Generacional",
      description: "Formar líderes que impacten su generación"
    },
    {
      icon: Target,
      title: "Prioridad a las Personas",
      description: "Cada persona es valiosa para Dios y para nosotros"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Quiénes Somos | Avivamiento: El Lugar de su Presencia | Iglesia en Oaxaca</title>
        <meta name="description" content="Conoce la visión y la misión de Avivamiento: El Lugar de su Presencia. Somos un mover de Dios que aviva, transforma y reforma, manifestando el poder sobrenatural de Dios en Oaxaca." />
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
              Somos Avivamiento: Un Mover de Dios Llamado a Transformar
            </h1>
            <p className="text-xl md:text-2xl text-blanco-puro/90 max-w-3xl mx-auto">
              Bienvenidos a <strong>Avivamiento: El Lugar de su Presencia</strong>. Fuimos llamados a ser más que una iglesia; somos <strong>un mover de Dios llamados a avivar, transformar y reformar</strong> vidas, comunidades y naciones. Creemos que la <strong>obra de Dios es evidente</strong> en nuestro tiempo, y a través de Su amor y poder sobrenatural, estamos comprometidos a manifestar Su reino aquí en la tierra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blanco-puro text-rojo-espiritual rounded-full text-sm font-medium">
                <BookOpen className="mr-2" size={16} />
                Nuestra Historia
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gris-oscuro-sutil">
                Desde una Sala hasta un Mover de Dios
              </h2>
              <div className="space-y-4 text-gris-oscuro-sutil leading-relaxed">
                <p>
                  En 2014, lo que comenzó como una pequeña reunión en una sala se ha convertido 
                  en un poderoso mover del Espíritu Santo que ha transformado miles de vidas en 
                  Oaxaca y más allá.
                </p>
                <p>
                  Desde nuestros humildes inicios, hemos sido testigos de cómo Dios ha obrado 
                  milagros extraordinarios: sanidades sobrenaturales, liberación de ataduras, 
                  restauración de familias y el despertar espiritual de una generación completa.
                </p>
                <p>
                  Cada testimonio, cada vida transformada, cada milagro nos recuerda que somos 
                  parte de algo más grande que nosotros mismos: el plan perfecto de Dios para 
                  nuestra generación.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img  
                  className="w-full h-96 object-cover"
                  alt="Reunión de la iglesia en sus inicios"
                  src="https://via.placeholder.com/600x400/000000/FFFFFF?text=Inicios+de+Avivamiento" />
                <div className="absolute inset-0 bg-gradient-to-t from-negro-sagrado/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-blanco-puro">
                  <p className="text-lg font-semibold">2014 - 2024</p>
                  <p className="text-sm opacity-90">10 años de fidelidad de Dios</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gris-oscuro-sutil mb-4">
              Nuestra Visión y Misión
            </h2>
            <p className="text-xl text-gris-oscuro-sutil max-w-3xl mx-auto">
              El propósito que Dios ha puesto en nuestro corazón
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-blanco-puro rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-rojo-espiritual to-oro-divino rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-blanco-puro" size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-gris-oscuro-sutil">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-center text-lg text-gris-oscuro-sutil font-medium leading-relaxed">
                Nuestra <strong>VISIÓN</strong> es ser una <strong>iglesia multitudinaria</strong> donde la obra de Dios sea evidente: <strong>salvando, sanando, liberando y bendiciendo</strong> a cada persona. Nos esforzamos por ser una comunidad que demuestre el amor y el <strong>poder sobrenatural de Dios</strong> a cada sector de la sociedad, formando un <strong>liderazgo generacional</strong>.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blanco-puro rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-oro-divino to-rojo-espiritual rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-blanco-puro" size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-gris-oscuro-sutil">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-center text-lg text-gris-oscuro-sutil font-medium leading-relaxed mb-6">
                Nuestra <strong>MISIÓN</strong> se cumple a través de cuatro pilares fundamentales: <strong>Evangelizar</strong>, para alcanzar a los perdidos a través de Grupos Familiares y eventos especiales. <strong>Afirmar</strong>, a través del discipulado y el ministerio de <strong>sanidad interior</strong> para restaurar corazones. <strong>Discipular</strong>, a través de nuestra <strong>Escuela de Teología</strong> y un sistema de formación de líderes. Y finalmente, <strong>Enviar</strong>, expandiendo el reino con nuevas congregaciones y líderes ministeriales que impacten al mundo.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ArrowRight className="text-rojo-espiritual flex-shrink-0" size={16} />
                  <span className="text-gris-oscuro-sutil"><strong>Evangelizar:</strong> Alcanzar a los perdidos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ArrowRight className="text-rojo-espiritual flex-shrink-0" size={16} />
                  <span className="text-gris-oscuro-sutil"><strong>Afirmar:</strong> Restaurar corazones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ArrowRight className="text-rojo-espiritual flex-shrink-0" size={16} />
                  <span className="text-gris-oscuro-sutil"><strong>Discipular:</strong> Formar líderes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ArrowRight className="text-rojo-espiritual flex-shrink-0" size={16} />
                  <span className="text-gris-oscuro-sutil"><strong>Enviar:</strong> Expandir el reino</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gris-oscuro-sutil mb-4">
              Nuestros Objetivos
            </h2>
            <p className="text-xl text-gris-oscuro-sutil max-w-3xl mx-auto">
              Las metas que Dios ha puesto en nuestro corazón para impactar nuestra generación
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group" // Container for each objective card, centered text, and enables group-hover effects
              >
                <div className="bg-white rounded-2xl p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-rojo-espiritual to-oro-divino rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <objective.icon className="text-blanco-puro" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gris-oscuro-sutil mb-3">
                    {objective.title}
                  </h3>
                  <p className="text-gris-oscuro-sutil">
                    {objective.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 bg-negro-sagrado text-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Nuestras Creencias Fundamentales
              </h2>
              <p className="text-xl text-white/90">
                Nuestra fe está arraigada en la Palabra de Dios, la Biblia. Creemos firmemente en los principios que guían nuestra vida y ministerio.
              </p>
              <div className="space-y-4">
                {beliefs.map((belief, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="text-blanco-puro/80 flex-shrink-0 mt-1" size={20} />
                    <span className="text-blanco-puro/90">{renderWithStrongTags(belief)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-blanco-puro/10 backdrop-blur-md rounded-2xl p-8 border border-blanco-puro/20">
                <img  
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  alt="Biblia abierta representando nuestras creencias"
                  src="https://via.placeholder.com/600x400/000000/FFFFFF?text=Fundados+en+la+Palabra" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Fundados en la Palabra</h3>
                  <p className="text-blanco-puro/80">
                    "Toda la Escritura es inspirada por Dios, y útil para enseñar, 
                    para redargüir, para corregir, para instruir en justicia" - 2 Timoteo 3:16
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* La Obra de Dios en Acción */}
      <section className="py-20 bg-blanco-puro text-gris-oscuro-sutil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              La Obra de Dios en Acción
            </h2>
            <p className="text-xl text-gris-oscuro-sutil max-w-3xl mx-auto leading-relaxed">
              Nuestra visión cobra vida en cada uno de nuestros ministerios y en la vida de cada persona que llega a nuestro lugar. Desde nuestros <strong>Grupos Familiares</strong>, donde se cultiva la <strong>bendición de congregarnos</strong> en un ambiente íntimo, hasta nuestros <strong>eventos especiales</strong> donde manifestamos la obra de Dios públicamente. En <strong>Avivamiento</strong> la vida en comunidad y el poder de Dios se unen para traer <strong>sanidad, liberación y restauración</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-negro-sagrado text-blanco-puro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              ¡Únete a Nuestra Familia de Fe!
            </h2>
            <p className="text-xl text-blanco-puro">
              Te invitamos a ser parte de este mover de Dios. ¡Tu vida será transformada!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://maps.app.goo.gl/sGitG1jpYc8NruUU8"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-rojo-espiritual hover:bg-rojo-espiritual-dark text-blanco-puro font-semibold rounded-lg transition-all"
              >
                <MapPin className="mr-2" size={16} />
                ¡Visítanos! Somos Avivamiento
              </motion.a>
              <motion.a
                href="/grupos-familiares"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 border border-blanco-puro text-blanco-puro hover:bg-blanco-puro hover:text-negro-sagrado font-semibold rounded-lg transition-all"
              >
                <Users className="mr-2" size={16} />
                Encuentra un Grupo Familiar
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
