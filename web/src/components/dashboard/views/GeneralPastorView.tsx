'use client';

import { useAuth } from '@/hooks/useAuth';
import {
    UsersIcon,
    EnvelopeIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import MiracleWall from '../MiracleWall';

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

export default function GeneralPastorView() {
    return (
        <div className="space-y-6">
            {/* Tarjetas de Estadísticas Globales */}
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

            {/* Acciones Rápidas */}
            <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#DAA520] text-black font-bold rounded-lg shadow-lg hover:bg-[#B8860B] transition-colors">
                    Aprobar Nuevos Registros
                </button>
            </div>

            {/* Miracle Wall */}
            <div className="mt-8">
                <MiracleWall />
            </div>
        </div>
    );
}
