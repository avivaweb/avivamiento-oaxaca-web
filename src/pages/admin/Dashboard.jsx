
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Newspaper, Users } from 'lucide-react';

const DashboardCard = ({ to, icon: Icon, title, description }) => (
  <Link to={to} className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
    <div className="flex items-center mb-3">
      <Icon className="w-8 h-8 text-blue-600 mr-4" />
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="font-normal text-gray-600">{description}</p>
  </Link>
);

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Panel de Administración</h1>
      <p className="text-lg text-gray-500 mb-8">Selecciona una sección para gestionar el contenido del sitio.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard 
          to="/admin/testimonies"
          icon={FileText}
          title="Gestionar Testimonios"
          description="Crea, edita y publica los testimonios de milagros y sanidad."
        />
        <DashboardCard 
          to="/admin/events"
          icon={Calendar}
          title="Gestionar Eventos"
          description="Administra los próximos eventos, campañas y servicios especiales."
        />
        <DashboardCard 
          to="/admin/blog"
          icon={Newspaper}
          title="Gestionar Blog"
          description="Escribe y administra las entradas del blog pastoral y de noticias."
        />
         <DashboardCard 
          to="/admin/users"
          icon={Users}
          title="Gestionar Usuarios"
          description="Administra los roles y permisos de los usuarios registrados."
        />
      </div>
    </div>
  );
};

export default Dashboard;
