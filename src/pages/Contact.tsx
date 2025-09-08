import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

// This is a self-contained contact form component that can be easily reused.
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a random success or error outcome
    if (Math.random() > 0.2) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="input-field" // Using generalized style from index.css
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="input-field" // Using generalized style from index.css
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Escribe tu consulta o petición aquí..."
            value={formData.message}
            onChange={handleInputChange}
            required
            className="input-field" // Using generalized style from index.css
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-rojo-espiritual hover:bg-rojo-espiritual/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rojo-espiritual disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {status === 'submitting' ? (
              <>
                <Loader className="animate-spin mr-2" size={20} />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2" size={20} />
                Enviar Mensaje
              </>
            )}
          </button>
        </div>
      </form>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center"
        >
          <CheckCircle className="mr-3" />
          <p>¡Mensaje enviado! Gracias por contactarnos.</p>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center"
        >
          <AlertTriangle className="mr-3" />
          <p>Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
        </motion.div>
      )}
    </div>
  );
};


// The main page component that renders the ContactForm.
const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contacto - Iglesia Avivamiento</title>
        <meta name="description" content="Ponte en contacto con la Iglesia Avivamiento. Envíanos un mensaje a través de nuestro formulario de contacto." />
      </Helmet>
      <div className="bg-gray-50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-negro-sagrado tracking-tight">
              Ponte en Contacto
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              ¿Tienes alguna pregunta o necesitas oración? Nos encantaría saber de ti.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;