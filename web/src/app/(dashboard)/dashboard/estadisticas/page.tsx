'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ReportStats {
    totalAdults: number;
    totalChildren: number;
    totalDecisions: number;
    reportsCount: number;
}

export default function EstadisticasPage() {
    const [stats, setStats] = useState<ReportStats>({
        totalAdults: 0,
        totalChildren: 0,
        totalDecisions: 0,
        reportsCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const { data, error } = await supabase
                    .from('celula_reports')
                    .select('adults_attendance, children_attendance, new_decisions');

                if (error) throw error;

                const newStats = (data || []).reduce(
                    (acc, curr) => ({
                        totalAdults: acc.totalAdults + (curr.adults_attendance || 0),
                        totalChildren: acc.totalChildren + (curr.children_attendance || 0),
                        totalDecisions: acc.totalDecisions + (curr.new_decisions || 0),
                        reportsCount: acc.reportsCount + 1,
                    }),
                    { totalAdults: 0, totalChildren: 0, totalDecisions: 0, reportsCount: 0 }
                );

                setStats(newStats);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }: any) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#A5002F] font-serif">Estadísticas de Zona</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Asistencia Total Adultos"
                    value={stats.totalAdults}
                    icon={UserGroupIcon}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Asistencia Total Niños"
                    value={stats.totalChildren}
                    icon={UserGroupIcon}
                    color="bg-orange-500"
                />
                <StatCard
                    title="Nuevas Decisiones"
                    value={stats.totalDecisions}
                    icon={HeartIcon}
                    color="bg-red-500"
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Reportes</h3>
                <p className="text-gray-600">
                    Total de reportes recibidos: <span className="font-bold">{loading ? '...' : stats.reportsCount}</span>
                </p>
            </div>
        </div>
    );
}

