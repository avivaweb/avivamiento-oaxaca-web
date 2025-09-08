import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageCircle,
  Music,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/AvivamientoElLugarDeSuPresencia/',
      color: 'hover:text-oro-divino'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/avivamientooaxaca/',
      color: 'hover:text-oro-divino'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@AvivamientoOax',
      color: 'hover:text-oro-divino'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://whatsapp.com/channel/0029VaQXxVlH5JLuZOYELE2A',
      color: 'hover:text-oro-divino'
    },
    {
      name: 'Spotify',
      icon: Music,
      url: 'https://open.spotify.com/intl-es/artist/1diW0JiqqxZqpzEX8HfwNo?si=-BwPuAcfSbq4KeJJzMrR1A',
      color: 'hover:text-oro-divino'
    }
  ];

  const quickLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Quiénes Somos', path: '/quienes-somos' },
    { name: 'Sermones', path: '/sermones' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Grupos Familiares', path: '/grupos-familiares' },
    { name: 'Escuela de Teología', path: '/escuela-teologia' },
    { name: 'Testimonios', path: '/testimonios' }
  ];

  return (
    <footer className="bg-negro-sagrado text-blanco-puro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/img/logo-principal-blanco.png"
                alt="Logo Avivamiento"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-blanco-puro text-sm leading-relaxed">
              Somos un mover de Dios llamados a avivar, transformar y reformar nuestra generación a través del poder del Espíritu Santo.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 bg-gris-oscuro/30 rounded-full transition-colors ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg mb-4 block text-blanco-puro">Enlaces Rápidos</span>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blanco-puro hover:text-blanco-puro transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <li className="mt-4">
              <Link
                to="/ejercitocelular"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blanco-puro bg-rojo-espiritual hover:bg-rojo-espiritual-dark transition-colors"
              >
                Ejército Celular
              </Link>
            </li>
          </div>

          <div>
            <span className="font-semibold text-lg mb-4 block text-blanco-puro">Contacto</span>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-rojo-espiritual mt-1 flex-shrink-0" />
                <p className="text-blanco-puro text-sm">
                  Carretera Nueva Oaxaca-Zaachila, Privada Rehoboth No. 101, San Raymundo Jalpan, Oaxaca, México
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-rojo-espiritual" />
                <p className="text-blanco-puro text-sm">+52 951 XXX XXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-rojo-espiritual" />
                <p className="text-blanco-puro text-sm">contacto@avivamientooaxaca.org</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blanco-puro bg-rojo-espiritual hover:bg-rojo-espiritual-dark transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg mb-4 block text-blanco-puro">Horarios de Servicio</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-rojo-espiritual" />
                <div>
                  <p className="text-blanco-puro text-sm font-medium">Domingos</p>
                  <p className="text-blanco-puro text-xs">10:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-rojo-espiritual" />
                <div>
                  <p className="text-blanco-puro text-sm font-medium">Miércoles</p>
                  <p className="text-blanco-puro text-xs">7:00 PM - 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-rojo-espiritual" />
                <div>
                  <p className="text-blanco-puro text-sm font-medium">Viernes</p>
                  <p className="text-blanco-puro text-xs">7:00 PM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg mb-4 block text-blanco-puro">Legal</span>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terminos-de-uso" 
                  className="text-blanco-puro hover:text-blanco-puro transition-colors text-sm"
                >
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidad" 
                  className="text-blanco-puro hover:text-blanco-puro transition-colors text-sm"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gris-oscuro mt-8 pt-8 text-center">
          <p className="text-blanco-puro text-sm">
            © 2024 Iglesia Avivamiento: El Lugar de su Presencia. Todos los derechos reservados.
          </p>
          <p className="text-blanco-puro text-xs mt-2">
            "SOMOS UN MOVER DE DIOS LLAMADOS A AVIVAR, TRANSFORMAR Y REFORMAR NUESTRA GENERACIÓN"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;