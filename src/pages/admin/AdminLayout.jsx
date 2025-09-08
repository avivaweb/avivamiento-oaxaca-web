
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'; // Asegúrate que la ruta sea correcta
import { Home, BarChart, FileText, Calendar, Users } from 'lucide-react';

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (!session || sessionError) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const user = session.user;
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const authorizedRoles = ['admin', 'pastor'];
      if (authorizedRoles.includes(profile.role)) {
        setIsAuthorized(true);
        setUserProfile(profile);
      } else {
        setIsAuthorized(false);
      }
      setLoading(false);
    };

    checkAuthAndRole();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100"><p className="text-xl font-semibold">Verificando acceso...</p></div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/access-denied" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

const Sidebar = () => {
    const location = useLocation();
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: BarChart },
        { name: 'Testimonios', path: '/admin/testimonies', icon: FileText },
        { name: 'Eventos', path: '/admin/events', icon: Calendar },
        { name: 'Usuarios', path: '/admin/users', icon: Users },
        { name: 'Volver al Sitio', path: '/', icon: Home },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-6 text-center border-b border-gray-700">
                <h2 className="text-2xl font-bold">AvivaAdmin</h2>
                <p className="text-sm text-gray-400">Panel de Control</p>
            </div>
            <nav className="flex-1 px-4 py-6">
                {navItems.map(item => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                            location.pathname === item.path
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default AdminLayout;
