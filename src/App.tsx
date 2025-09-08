
// Importamos las dependencias necesarias de React y react-router-dom.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos el proveedor de contexto para la autenticación de Supabase.
// Esto es crucial para que la funcionalidad de suscripción en la LandingPage siga operando.
import { AuthProvider } from '@/contexts/AuthContext';

// Importamos el componente de la página de aterrizaje (LandingPage).
import LandingPage from '@/pages/LandingPage';

// Importamos el componente Toaster para mostrar notificaciones.
import { Toaster } from '@/components/ui/toaster';

/**
 * Componente principal de la aplicación.
 *
 * En esta versión, hemos simplificado el enrutador para mostrar únicamente la LandingPage.
 * Esto nos permite tener una página de "próximamente" o de captura de leads
 * mientras el resto del sitio web está en desarrollo.
 *
 * Se mantiene el AuthProvider para asegurar que cualquier componente que dependa
 * de la conexión con Supabase (como el formulario de suscripción) funcione correctamente.
 */
function App() {
  return (
    // El componente Router envuelve toda la aplicación para habilitar el enrutamiento.
    <Router>
      {/* AuthProvider provee el contexto de autenticación y la instancia de Supabase. */}
      <AuthProvider>
        {/* Contenedor principal de la aplicación. */}
        <div className="min-h-screen bg-blanco-puro text-negro-sagrado">
          {/* El componente Routes define las áreas donde las rutas serán renderizadas. */}
          <Routes>
            {/* 
              Definimos una única ruta para la raíz del sitio ('/').
              Esta ruta renderizará el componente LandingPage.
              El atributo 'exact' asegura que solo coincida con la ruta exacta.
            */}
            <Route path="/" element={<LandingPage />} />
          </Routes>
          {/* El componente Toaster se incluye para poder mostrar notificaciones en la UI. */}
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

// Exportamos el componente App para ser usado en el punto de entrada de la aplicación (main.jsx).
export default App;
