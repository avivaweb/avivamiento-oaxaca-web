import React, { useState } from 'react';
import {
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaSpotify,
} from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('subscribers').insert({ email });

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        setMessage('Este correo electrónico ya ha sido registrado. ¡Gracias!');
      } else {
        setMessage('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
      console.error('Error inserting email:', error);
    } else {
      setMessage('¡Gracias por suscribirte! Te avisaremos cuando lancemos el sitio.');
      setEmail('');
    }

    setLoading(false);
  };

  return (
    <div className="bg-[linear-gradient(to_bottom,#990100,#000000)] text-white min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 md:p-8">
      
      <header className="w-full flex justify-center pt-8">
        <img 
          src="/img/logo-principal-blanco.png" 
          alt="Logo de Avivamiento Oaxaca" 
          className="w-48 sm:w-56 md:w-64"
        />
      </header>

      <main className="text-center flex flex-col items-center px-4 w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          Avivamiento Oaxaca
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-2 font-light">
          El Lugar de Su Presencia
        </h2>
        <p className="mt-8 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
          Estamos construyendo un hogar digital para nuestra comunidad. Un lugar para conectar, crecer y experimentar la fe en acción. Nuestro nuevo sitio web está por llegar.
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#990100]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#990100] text-white font-bold px-6 py-3 rounded-md hover:bg-red-800 transition-colors disabled:bg-gray-500"
            >
              {loading ? 'Enviando...' : 'Avísame cuando lancen'}
            </button>
          </div>
          {message && (
            <p className={`mt-4 text-center ${message.includes('error') ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
        </form>
      </main>

      <footer className="w-full text-center text-gray-300 text-sm">
        <div className="mb-6">
          <p>contacto@avivamientoaxaca.com</p>
          <p className="mt-2">Martes - Reunión de Oración - 6:30 pm</p>
          <p>Domingos - Reunión General - 11:00 am</p>
        </div>
        
        <div className="flex justify-center items-center space-x-5 sm:space-x-6">
          <a href="https://www.youtube.com/@avivamientooax" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
            <FaYoutube size={28} />
          </a>
          <a href="https://www.facebook.com/avivamientoellugardesupresencia" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
            <FaFacebook size={28} />
          </a>
          <a href="https://whatsapp.com/channel/0029VaQXxVlH5JLuZOYELE2A" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-white transition-colors">
            <FaWhatsapp size={28} />
          </a>
          <a href="https://www.instagram.com/avivamientooaxaca" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
            <FaInstagram size={28} />
          </a>
        </div>
        
        <div className="mt-6">
          <p className="font-semibold mb-3">Escúchanos en Spotify:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="https://open.spotify.com/intl-es/artist/1diW0JiqqxZqpzEX8HfwNo?si=-BwPuAcfSbq4KeJJzMrR1A" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors">
              <FaSpotify size={24} />
              <span>Aviva-Band</span>
            </a>
            <a href="https://open.spotify.com/show/6ZR7ywHXjwEQ8RCwWgHNHK?si=ade4fbda81b54e4a" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors">
              <FaSpotify size={24} />
              <span>Mujeres en Victoria</span>
            </a>
            <a href="https://open.spotify.com/show/4Prj1pzkAPNe0Mvk0LKLEo?si=c8c83fa5bb5e4dfd" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors">
              <FaSpotify size={24} />
              <span>Sermones Dominicales</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;