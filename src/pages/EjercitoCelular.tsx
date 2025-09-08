
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Loader, ShieldOff, AlertTriangle, ListChecks } from 'lucide-react';

// --- Componentes de UI específicos para esta página ---

const AccessDeniedCard = () => (
  <div className="flex flex-col items-center justify-center h-full bg-red-50 border border-red-200 p-12 rounded-2xl shadow-lg">
    <ShieldOff className="h-16 w-16 text-red-500 mb-4" />
    <h2 className="text-2xl font-bold text-red-800 mb-2">Acceso Denegado</h2>
    <p className="text-red-600 text-center max-w-md">
      No cuentas con los permisos necesarios para visualizar esta sección. Esta área es de acceso restringido.
    </p>
  </div>
);

const ReportsTable = ({ reports }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Líder</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asistencia</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {reports.map(report => (
                    <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.nombre_lider}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.asistencia}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.fecha_reporte).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 truncate" style={{ maxWidth: '300px' }}>{report.observaciones}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const LoadingState = ({ message }) => (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader className="h-12 w-12 animate-spin text-rojo-espiritual" />
        <p className="ml-4 text-xl text-gris-oscuro-sutil">{message}</p>
    </div>
);

const EjercitoCelular = () => {
  // El hook useAuth debe proveer el estado de carga, el usuario y el perfil del usuario (que incluye el rol)
  const { user, profile, loading: authLoading } = useAuth();
  const [reports, setReports] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // Roles autorizados para ver esta página. Centralizar esto facilita la gestión.
  const authorizedRoles = ['Superusuario', 'Pastor de Zona', 'Pastor General'];

  useEffect(() => {
    // --- CADENA DE VERIFICACIÓN DE SEGURIDAD ---
    // Este efecto se ejecuta cada vez que cambia el estado de autenticación.
    // No se intentará cargar ningún dato sensible hasta que todas las comprobaciones de seguridad pasen.

    // 1. Esperar a que la autenticación y la carga del perfil finalicen.
    // Si `authLoading` es true, significa que todavía no sabemos si hay un usuario o cuál es su rol.
    // Salir temprano de la función previene cualquier procesamiento innecesario.
    if (authLoading) {
      return;
    }

    // 2. Validar que el usuario esté autenticado y que su perfil (con el rol) se haya cargado.
    // Si no hay usuario o no se pudo cargar su perfil, el acceso no puede ser concedido.
    const isAuthorized = user && profile && authorizedRoles.includes(profile.role);

    // 3. Cargar datos SÓLO si el usuario está autorizado.
    // Este es el paso final de la puerta de seguridad. Solo si el usuario tiene el rol correcto,
    // se procede a solicitar la información confidencial de la base de datos.
    if (isAuthorized) {
      const fetchReports = async () => {
        setLoadingData(true);
        try {
          const { data, error: fetchError } = await supabase
            .from('reportes_gf')
            .select('id, nombre_lider, asistencia, fecha_reporte, observaciones')
            .order('fecha_reporte', { ascending: false });

          if (fetchError) throw fetchError;
          setReports(data || []);
        } catch (err) {
          setError('No se pudieron cargar los reportes.');
          console.error("Error fetching reports:", err);
        } finally {
          setLoadingData(false);
        }
      };

      fetchReports();
    } else {
        // Si no está autorizado, nos aseguramos de que no se muestre un estado de carga de datos.
        setLoadingData(false);
    }
  }, [authLoading, user, profile]); // Dependencias explícitas para un control preciso


  // --- RENDERIZADO CONDICIONAL BASADO EN EL ESTADO DE SEGURIDAD ---

  if (authLoading) {
    return <LoadingState message="Verificando credenciales..." />;
  }

  const isAuthorized = user && profile && authorizedRoles.includes(profile.role);
  if (!isAuthorized) {
    return (
        <div className="container mx-auto px-4 py-16 sm:py-20">
            <AccessDeniedCard />
        </div>
    );
  }

  // Si está autorizado, muestra el dashboard y maneja sus propios estados de carga/error.
  return (
    <>
      <Helmet>
        <title>Dashboard - Ejército Celular</title>
        <meta name="description" content="Dashboard de administración para el Ejército Celular." />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16 sm:py-20">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-negro-sagrado mb-2">
                    Dashboard del Ejército Celular
                </h1>
                <p className="text-xl text-gris-oscuro-sutil">
                    Supervisión y gestión de los reportes de Grupos Familiares.
                </p>
            </motion.div>
            
            {loadingData && <div className="flex justify-center items-center p-12"><Loader className="w-10 h-10 animate-spin text-rojo-espiritual"/></div>}
            {error && <div className="text-center py-12 bg-red-50 border border-red-200 p-8 rounded-lg"><AlertTriangle className="h-12 w-12 text-red-500 mb-4 mx-auto" /><h3 className="text-xl font-semibold text-red-700">Ocurrió un Error</h3><p className="text-gris-oscuro-sutil">{error}</p></div>}
            {!loadingData && !error && reports.length === 0 && <div className="text-center py-12"><ListChecks className="h-16 w-16 text-gray-400 mb-4 mx-auto" /><h3 className="text-2xl font-semibold text-negro-sagrado">No hay reportes</h3><p className="text-gris-oscuro-sutil mt-2">Aún no se han generado reportes.</p></div>}
            {!loadingData && !error && reports.length > 0 && <ReportsTable reports={reports} />}
        </div>
      </div>
    </>
  );
};

export default EjercitoCelular;
