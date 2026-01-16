'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    HandRaisedIcon,
    UserGroupIcon,
    SparklesIcon,
    FireIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/auth';
import PastoralMessages from '../PastoralMessages';

interface LeaderMetrics {
    totalSoulsWon: number;
    totalReports: number;
    lastReportDate: string | null;
}

export default function LeaderView() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [metrics, setMetrics] = useState<LeaderMetrics>({
        totalSoulsWon: 0,
        totalReports: 0,
        lastReportDate: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileAndMetrics = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                // Fetch user profile
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileError) {
                    console.error('Error fetching profile:', profileError);
                } else {
                    setProfile(profileData);
                }

                // Fetch metrics from celula_reports
                const { data: reportsData, error: reportsError } = await supabase
                    .from('celula_reports')
                    .select('new_decisions, created_at')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (reportsError) {
                    console.error('Error fetching reports:', reportsError);
                } else if (reportsData) {
                    const totalSouls = reportsData.reduce((sum, report) => sum + (report.new_decisions || 0), 0);
                    setMetrics({
                        totalSoulsWon: totalSouls,
                        totalReports: reportsData.length,
                        lastReportDate: reportsData[0]?.created_at || null
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndMetrics();
    }, [user?.id]);

    const zoneName = profile?.zone || 'tu Zona';

    return (
        <div className="space-y-8">
            {/* Personalized Welcome */}
            <div className="bg-gradient-to-r from-[#111111] to-[#1a1a1a] border-2 border-[#DAA520] rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Bienvenido, Guerrero de la <span className="text-[#DAA520]">{zoneName}</span>
                </h2>
                <p className="text-gray-400">
                    {user?.name || 'Líder'} • {profile?.role || 'Líder de Célula'}
                </p>
            </div>

            {/* Metrics Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Almas Ganadas Card */}
                <div className="bg-white border-2 border-[#DAA520] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#DAA520]/10 rounded-lg">
                            <SparklesIcon className="w-8 h-8 text-[#DAA520]" />
                        </div>
                        {loading && (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#DAA520]"></div>
                        )}
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                        Total de Almas Ganadas
                    </h3>
                    <p className="text-4xl font-bold text-[#DAA520] mb-2">
                        {metrics.totalSoulsWon}
                    </p>
                    <p className="text-xs text-gray-500">
                        Por tu célula • {metrics.totalReports} reportes
                    </p>
                </div>

                {/* Last Report Card */}
                <div className="bg-white border-2 border-[#DAA520] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-[#DAA520]/10 rounded-lg">
                            <FireIcon className="w-8 h-8 text-[#DAA520]" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
                        Último Reporte
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                        {metrics.lastReportDate
                            ? new Date(metrics.lastReportDate).toLocaleDateString('es-MX', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })
                            : 'Sin reportes'}
                    </p>
                    <p className="text-xs text-gray-500">
                        {profile?.zone ? `Zona: ${profile.zone}` : 'Zona no asignada'}
                    </p>
                </div>
            </div>

            {/* Pastoral Messages Section */}
            <PastoralMessages />

            {/* Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/dashboard/mis-celulas/reportar"
                    className="group relative overflow-hidden bg-[#A5002F] rounded-2xl p-8 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]"
                >
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 translate-y-[-2rem] rounded-full bg-white/10 opacity-50 blur-2xl group-hover:bg-white/20"></div>

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <HandRaisedIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">Reportar Asistencia</h3>
                        <p className="text-white/80">
                            Registra la asistencia semanal de tu célula, ofrendas y nuevas decisiones.
                        </p>
                    </div>
                </Link>

                <Link
                    href="/dashboard/mis-celulas"
                    className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl hover:border-[#DAA520]/50"
                >
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 translate-y-[-2rem] rounded-full bg-gray-100 opacity-50 blur-2xl group-hover:bg-[#DAA520]/10"></div>

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-[#DAA520]/20 transition-colors">
                            <UserGroupIcon className="h-6 w-6 text-gray-600 group-hover:text-[#DAA520]" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-gray-900">Ver mi Célula</h3>
                        <p className="text-gray-500">
                            Administra los miembros de tu grupo, ver historial y seguimiento.
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

