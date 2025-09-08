import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Heart, 
  CreditCard, 
  Smartphone,
  Building,
  Gift,
  Users,
  Home,
  BookOpen,
  Star,
  CheckCircle,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Donations = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('general');

  const handleDonation = () => {
    toast({
      title: "🚧 Esta función aún no está implementada",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀"
    });
  };

  const donationTypes = [
    {
      id: 'general',
      title: 'Ofrenda General',
      description: 'Apoyo para las necesidades generales de la iglesia y ministerios',
      icon: Heart,
      color: 'bg-rojo-espiritual'
    },
    {
      id: 'missions',
      title: 'Misiones',
      description: 'Evangelización y plantación de iglesias en nuevas comunidades',
      icon: Users,
      color: 'bg-rojo-espiritual'
    },
    {
      id: 'construction',
      title: 'Construcción',
      description: 'Ampliación y mejoras de las instalaciones del templo',
      icon: Building,
      color: 'bg-rojo-espiritual'
    },
    {
      id: 'education',
      title: 'Educación',
      description: 'Escuela de Teología y programas de formación ministerial',
      icon: BookOpen,
      color: 'bg-rojo-espiritual'
    },
    {
      id: 'social',
      title: 'Acción Social',
      description: 'Ayuda a familias necesitadas y programas comunitarios',
      icon: Gift,
      color: 'bg-rojo-espiritual'
    }
  ];

  const suggestedAmounts = [100, 200, 500, 1000, 2000, 5000];

  const paymentMethods = [
    {
      name: 'Tarjeta de Crédito/Débito',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      name: 'Transferencia Bancaria',
      icon: Building,
      description: 'Depósito directo a cuenta bancaria'
    },
    {
      name: 'Pago Móvil',
      icon: Smartphone,
      description: 'OXXO Pay, SPEI, otros métodos digitales'
    }
  ];

  const impactAreas = [
    {
      icon: Users,
      title: 'Grupos Familiares',
      description: 'Materiales de estudio y capacitación para líderes',
      amount: '$500 MXN'
    },
    {
      icon: Home,
      title: 'Mantenimiento del Templo',
      description: 'Servicios básicos y mantenimiento de instalaciones',
      amount: '$1,000 MXN'
    },
    {
      icon: BookOpen,
      title: 'Escuela de Teología',
      description: 'Becas para estudiantes y recursos educativos',
      amount: '$2,000 MXN'
    },
    {
      icon: Heart,
      title: 'Ministerio de Sanidad',
      description: 'Encuentros y retiros de sanidad interior',
      amount: '$1,500 MXN'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Donaciones - Iglesia Avivamiento: El Lugar de su Presencia</title>
        <meta name="description" content="Apoya la obra de Dios con tu ofrenda. Contribuye al crecimiento de la iglesia, misiones, construcción y programas sociales. Donaciones seguras en línea." />
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
              Donaciones
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Sé parte de la expansión del Reino de Dios con tu generosa ofrenda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-negro-fondo text-blanco-puro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-rojo-espiritual/10 text-rojo-espiritual rounded-full text-sm font-medium">
                <Heart className="mr-2" size={16} />
                Generosidad que Transforma
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-blanco-puro">
                Tu Ofrenda Hace la Diferencia
              </h2>
              <div className="space-y-4 text-blanco-puro/80 leading-relaxed">
                <p>
                  "Dad, y se os dará; medida buena, apretada, remecida y rebosando 
                  darán en vuestro regazo; porque con la misma medida con que medís, 
                  os volverán a medir." - Lucas 6:38
                </p>
                <p>
                  Cada ofrenda que das es una semilla plantada en el Reino de Dios. 
                  Tu generosidad permite que continuemos llevando el evangelio, 
                  formando líderes, construyendo instalaciones y bendiciendo a 
                  familias necesitadas.
                </p>
                <p>
                  Creemos en la transparencia y el buen manejo de los recursos. 
                  Cada peso donado es administrado con responsabilidad y dedicado 
                  completamente a la obra del Señor.
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
                  alt="Congregación adorando y ofrendando con corazones generosos"
                 src="/img/logo-principal-color.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold">Generosidad que Bendice</p>
                  <p className="text-sm opacity-90">Cada ofrenda cuenta</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Types */}
      <section className="py-20 bg-negro-sagrado">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-blanco-puro mb-4">
              Áreas de Donación
            </h2>
            <p className="text-xl text-blanco-puro/80 max-w-3xl mx-auto">
              Elige el área donde quieres que tu ofrenda tenga impacto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setDonationType(type.id)}
              >
                <div className={`bg-negro-fondo rounded-2xl p-6 shadow-lg card-hover border-2 transition-all ${
                  donationType === type.id ? 'border-rojo-espiritual' : 'border-transparent'
                }`}>
                  <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <type.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-blanco-puro mb-3 text-center">
                    {type.title}
                  </h3>
                  <p className="text-blanco-puro/80 text-center">
                    {type.description}
                  </p>
                  {donationType === type.id && (
                    <div className="mt-4 flex justify-center">
                      <CheckCircle className="text-rojo-espiritual" size={24} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-negro-fondo">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-negro-sagrado rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-blanco-puro mb-4">
                Realizar Donación
              </h2>
              <p className="text-blanco-puro/80">
                Selecciona el monto y método de pago para tu ofrenda
              </p>
            </div>

            <div className="space-y-8">
              {/* Amount Selection */}
              <div>
                <h3 className="text-lg font-semibold text-blanco-puro mb-4">
                  Selecciona el Monto
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount.toString());
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedAmount === amount.toString()
                          ? 'border-rojo-espiritual bg-rojo-espiritual/10 text-rojo-espiritual'
                          : 'border-gris-oscuro-sutil hover:border-rojo-espiritual/50'
                      }`}
                    >
                      ${amount.toLocaleString()} MXN
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gris-oscuro-sutil" size={16} />
                  <input
                    type="number"
                    placeholder="Monto personalizado"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount('');
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-negro-fondo border border-gris-oscuro-sutil rounded-lg focus:ring-2 focus:ring-rojo-espiritual focus:border-transparent text-blanco-puro"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-semibold text-blanco-puro mb-4">
                  Método de Pago
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="bg-negro-fondo rounded-lg p-4 border border-gris-oscuro-sutil hover:border-rojo-espiritual/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center mb-2">
                        <method.icon className="text-rojo-espiritual mr-3" size={20} />
                        <h4 className="font-medium text-blanco-puro">{method.name}</h4>
                      </div>
                      <p className="text-sm text-blanco-puro/80">{method.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donation Button */}
              <div className="text-center">
                <Button
                  onClick={handleDonation}
                  disabled={!selectedAmount && !customAmount}
                  size="lg"
                  className="bg-rojo-espiritual hover:bg-rojo-espiritual-dark px-12"
                >
                  <Heart className="mr-2" size={16} />
                  Donar {selectedAmount || customAmount ? `$${(selectedAmount || customAmount).toLocaleString()} MXN` : ''}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <p className="text-sm text-gris-oscuro-sutil mt-3">
                  Transacción segura y protegida
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-negro-sagrado">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-blanco-puro mb-4">
              El Impacto de tu Ofrenda
            </h2>
            <p className="text-xl text-blanco-puro/80 max-w-3xl mx-auto">
              Mira cómo tu generosidad transforma vidas y expande el Reino
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-negro-fondo rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-rojo-espiritual rounded-full flex items-center justify-center mx-auto mb-4">
                  <area.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-blanco-puro mb-2">
                  {area.title}
                </h3>
                <p className="text-blanco-puro/80 text-sm mb-3">
                  {area.description}
                </p>
                <div className="text-oro-divino font-semibold">
                  {area.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Information */}
      <section className="py-20 bg-negro-fondo">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-blanco-puro mb-4">
              Información Bancaria
            </h2>
            <p className="text-xl text-blanco-puro/80">
              Para transferencias directas o depósitos bancarios
            </p>
          </motion.div>

          <div className="bg-negro-sagrado rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-blanco-puro mb-4">
                  Cuenta Bancaria Principal
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blanco-puro/80">Banco:</span>
                    <span className="font-medium text-blanco-puro">BBVA México</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blanco-puro/80">Titular:</span>
                    <span className="font-medium text-blanco-puro">Iglesia Avivamiento A.R.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blanco-puro/80">Cuenta:</span>
                    <span className="font-medium text-blanco-puro">0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blanco-puro/80">CLABE:</span>
                    <span className="font-medium text-blanco-puro">012345678901234567</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blanco-puro mb-4">
                  Instrucciones Importantes
                </h3>
                <div className="space-y-2 text-sm text-blanco-puro/80">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-oro-divino flex-shrink-0 mt-0.5" size={14} />
                    <span>Envía tu comprobante por WhatsApp</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-oro-divino flex-shrink-0 mt-0.5" size={14} />
                    <span>Incluye tu nombre completo en la referencia</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-oro-divino flex-shrink-0 mt-0.5" size={14} />
                    <span>Especifica el área de donación si es específica</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-oro-divino flex-shrink-0 mt-0.5" size={14} />
                    <span>Recibirás confirmación de tu ofrenda</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-rojo-espiritual text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Gracias por tu Generosidad
            </h2>
            <p className="text-xl text-white/90">
              Tu ofrenda es una inversión en la eternidad. Dios ve tu corazón 
              generoso y multiplicará tu semilla plantada en Su Reino.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleDonation}
                size="lg"
                className="bg-white text-rojo-espiritual hover:bg-blanco-puro"
              >
                <Heart className="mr-2" size={16} />
                Donar Ahora
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-rojo-espiritual"
              >
                <a href="/contacto">
                  Contactar Tesorería
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Donations;
