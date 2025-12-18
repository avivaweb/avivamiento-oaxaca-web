'use client';

import { useAuth } from '@/hooks/useAuth';
import {
    UsersIcon,
    DocumentTextIcon,
    ChartBarIcon,
    CalendarIcon,
    UserGroupIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function DashboardHomePage() {
    const { user } = useAuth();

    const stats = [
        {
            name: 'Leads de Consolidación',
            value: '25 Nuevos Leads',
            icon: UserGroupIcon,
            color: 'bg-blue-500'
        },
        {
            name: 'Suscripciones',
            value: '150 Total Suscriptores',
            icon: EnvelopeIcon,
            color: 'bg-yellow-500'
        },
        {
            name: 'Grupos Activos',
            value: '12 Grupos Familiares',
            icon: UsersIcon,
            color: 'bg-green-500'
        },
    ];

    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Visión General
                </h1>
                <p className="mt-2 text-gray-600">
                    Bienvenido, {user?.name}. Aquí tienes un resumen de la actividad.
                </p>
            </div>

            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="mt-2 text-xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sección Placeholder para futuro contenido */}
            <div className="bg-white rounded-lg shadow p-6 border-dashed border-2 border-gray-200">
                <p className="text-center text-gray-500 py-10">
                    Más métricas y gráficos vendrán pronto...
                </p>
            </div>
        </div>
    );
}
