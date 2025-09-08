import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../lib/useAuth';
import { supabase } from '../lib/supabaseClient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate('/');
  };

  const allNavItems = [
    { name: 'Inicio', path: '/', public: true },
    { name: 'Quiénes Somos', path: '/quienes-somos', public: true },
    { name: 'Liderazgo', path: '/liderazgo', public: true },
    { name: 'Ministerios', path: '/ministerios', public: true },
    { name: 'Sermones', path: '/sermones', public: true },
    { name: 'Testimonios', path: '/testimonios', public: true },
    { name: 'Eventos', path: '/eventos', public: true },
    { name: 'Grupos Familiares', path: '/grupos-familiares', public: true },
    { name: 'Escuela de Teología', path: '/escuela-teologia', public: true },
    { name: 'Donar', path: '/donaciones', public: true },
    { name: 'Mi Perfil', path: '/profile', roles: ['Líder de Célula', 'Supervisor', 'Pastor de Zona', 'Pastor General'] },
    { name: 'Nuevo Reporte', path: '/nuevo-reporte', roles: ['Líder de Célula'] },
    { name: 'Ver Reportes', path: '/view-meeting-reports', roles: ['Líder de Célula', 'Supervisor', 'Pastor de Zona', 'Pastor General'] },
    { name: 'Mi Célula', path: '/view-cell-groups', roles: ['Líder de Célula'] },
    { name: 'Ver Grupos', path: '/view-cell-groups', roles: ['Supervisor', 'Pastor de Zona', 'Pastor General'] },
    { name: 'Dashboard', path: '/', roles: ['Pastor de Zona', 'Pastor General'] },
    { name: 'Añadir Testimonio', path: '/add-testimonio', roles: ['Pastor de Zona', 'Pastor General'] },
    { name: 'Añadir Grupo', path: '/add-cell-group', roles: ['Pastor de Zona', 'Pastor General'] },
  ];

  const filteredNavItems = allNavItems.filter(item => {
    if (item.public) return true;
    if (user && user.role && item.roles && item.roles.includes(user.role)) return true;
    return false;
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-negro-sagrado shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/img/logo-horizontal-color.png"
              alt="Logo Avivamiento"
              className="h-10 lg:h-12 w-auto max-h-full"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {filteredNavItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-rojo-espiritual'
                    : 'text-blanco-puro hover:text-rojo-espiritual'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rojo-espiritual"
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-blanco-puro hover:text-rojo-espiritual hover:bg-blanco-puro/20"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-negro-sagrado border-t border-gris-oscuro-sutil"
          >
            <div className="px-4 py-6 space-y-4">
              {filteredNavItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'text-rojo-espiritual bg-rojo-espiritual/10'
                      : 'text-blanco-puro hover:text-rojo-espiritual hover:bg-blanco-puro/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

