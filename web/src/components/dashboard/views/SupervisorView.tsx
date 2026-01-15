'use client';

import { useEffect, useState } from 'react';
import {
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';

interface SupervisorStats {
    total_cells: number;
    reports_received: number;
    total_attendance: number;
    growth_rate: number;
    attention_needed: { nombre: string; id: string }[];
}

export default function SupervisorView() {
    const [stats, setStats] = useState<SupervisorStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Obtener sesión para el token
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/supervisor/stats', {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    console.error('Error fetching stats:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching supervisor stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[200px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DAA520]"></div>
            </div>
        );
    }

    const metrics = [
        {
            name: 'Reportes Recibidos',
            value: `${stats?.reports_received || 0}/${stats?.total_cells || 0}`,
            subtext: 'Líderes que han reportado',
            icon: ClipboardDocumentCheckIcon,
            color: 'text-green-600',
            bg: 'bg-green-100'
        },
        {
            name: 'Asistencia Total',
            value: stats?.total_attendance || 0,
            subtext: 'Personas esta semana',
            icon: UserGroupIcon,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            name: 'Crecimiento',
            value: `${stats?.growth_rate || 0}%`,
            subtext: 'Vs. semana anterior',
            icon: ArrowTrendingUpIcon,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6 shadow-lg shadow-[#DAA520]/5">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <ChartBarIcon className="w-6 h-6 mr-2 text-[#DAA520]" />
                    Métricas de Mi Sector
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((stat) => (
                        <div key={stat.name} className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium text-gray-400 bg-black/30 px-2 py-1 rounded">Semanal</span>
                            </div>
                            <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                        </div>
                    ))}
                </div>

                {/* Zona de Atención */}
                {stats?.attention_needed && stats.attention_needed.length > 0 && (
                    <div className="mt-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4 animate-pulse">
                        <div className="flex items-center text-red-400 font-bold mb-2">
                            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                            Zona de Atención Necesaria
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                            Las siguientes células requieren atención inmediata (0 invitados recientemente):
                        </p>
                        <ul className="list-disc list-inside text-sm text-red-300">
                            {stats.attention_needed.map((cell: any, idx: number) => (
                                <li key={cell.id || idx}>
                                    {cell.nombre || `Célula ID: ${cell.id}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Estado de Reportes Detallado</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Líder</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Célula</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Placeholder hasta tener endpoint de lista de reportes */}
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                                    <p>Para ver el desglose detallado, por favor consulte la sección de "Reportes" en el menú lateral.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
