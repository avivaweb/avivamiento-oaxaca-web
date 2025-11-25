'use client';

import { useAuth } from '@/hooks/useAuth';
import { 
  UsersIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

export default function DashboardHomePage() {
  const { user } = useAuth();

  const stats = [
    { 
      name: 'Células Activas', 
      value: '12', 
      icon: UsersIcon,
      color: 'bg-blue-500'
    },
    { 
      name: 'Reportes Pendientes', 
      value: '3', 
      icon: DocumentTextIcon,
      color: 'bg-yellow-500'
    },
    { 
      name: 'Miembros Totales', 
      value: '156', 
      icon: ChartBarIcon,
      color: 'bg-green-500'
    },
    { 
      name: 'Eventos Este Mes', 
      value: '8', 
      icon: CalendarIcon,
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ¡Bienvenido de nuevo, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Aquí está un resumen de tu actividad reciente
        </p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Acciones Rápidas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-[#A5002F] text-white rounded-lg hover:bg-[#8A0026] transition-colors">
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Crear Reporte
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-[#A5002F] text-white rounded-lg hover:bg-[#8A0026] transition-colors">
            <UsersIcon className="w-5 h-5 mr-2" />
            Ver Células
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-[#A5002F] text-white rounded-lg hover:bg-[#8A0026] transition-colors">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Programar Evento
          </button>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Actividad Reciente
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#A5002F] rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Reporte de célula enviado
                  </p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <button className="text-sm text-[#A5002F] hover:underline">
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}