'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import {
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ExclamationTriangleIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';
import ErrorState, { classifySupabaseError, type ErrorType } from '@/components/dashboard/ErrorState';

const ZONAS = [
    "Todas",
    "Santa Cruz Xoxocotlán",
    "Centro Histórico",
    "San Felipe del Agua",
    "Jalpan",
    "Cuilápam",
    "Zaachila",
    "San Nicolás",
    "Cañada",
    "Norte",
];

const FallbackAvatar = ({ src, alt }: { src: string; alt: string }) => {
    const [error, setError] = useState(false);
    const isPlaceholder = src && src.includes('placeholder-');

    if (error || isPlaceholder || !src) {
        return (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937] to-black flex items-center justify-center border border-[#DAA520]/20 rounded-full overflow-hidden shadow-sm">
                <span className="text-sm md:text-base text-[#DAA520] opacity-80 drop-shadow-lg">✝</span>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover rounded-full"
            onError={() => setError(true)}
            placeholder="empty"
        />
    );
};

export default function SupervisorView() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedZona, setSelectedZona] = useState('Todas');
    const [error, setError] = useState<string | null>(null);
    const [errorType, setErrorType] = useState<ErrorType>('unknown');
    const [retrying, setRetrying] = useState(false);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setLoading(false);
                return;
            }

            const zonaFiltro = selectedZona === 'Todas' ? null : selectedZona;

            const { data, error: rpcError } = await supabase.rpc('get_supervisor_stats', {
                p_supervisor_id: session.user.id,
                p_zona: zonaFiltro
            });

            if (rpcError) throw rpcError;
            setStats(data || {});
        } catch (err) {
            const classified = classifySupabaseError(err);
            const message = err instanceof Error
                ? err.message
                : typeof err === 'object' && err !== null
                    ? JSON.stringify(err)
                    : String(err);

            console.error('[SupervisorView] Error al cargar métricas:', { classified, message, err });
            setErrorType(classified);
            setError(message);
        } finally {
            setLoading(false);
            setRetrying(false);
        }
    }, [selectedZona]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    /** Handler for the ErrorState retry button */
    const handleRetry = () => {
        setRetrying(true);
        fetchStats();
    };


    const metrics = [
        {
            name: 'Asistencia Total',
            value: stats?.asistencia_total || 0,
            subtext: 'Adultos esta semana',
            tendency: stats?.tendencia_asistencia || 0,
            icon: UserGroupIcon,
        },
        {
            name: 'Invitados Nuevos',
            value: stats?.invitados_nuevos || 0,
            subtext: 'Personas por primera vez',
            tendency: stats?.tendencia_invitados || 0,
            icon: ArrowTrendingUpIcon,
        },
        {
            name: 'Células Activas',
            value: stats?.celulas_activas || 0,
            subtext: 'Grupos que reportaron',
            tendency: stats?.tendencia_celulas || 0,
            icon: ClipboardDocumentCheckIcon,
        },
        {
            name: 'Zona de Desempeño',
            value: stats?.zona_desempeno || 'N/A',
            subtext: 'Con mayor crecimiento',
            tendency: null,
            icon: MapPinIcon,
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black p-4 rounded-xl border border-[#DAA520]/20 shadow-lg px-6">
                <div className="flex items-center gap-3">
                    <ChartBarIcon className="w-8 h-8 text-[#DAA520]" />
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-wide">Visión General</h3>
                        <p className="text-sm text-[#DAA520] uppercase tracking-widest font-semibold">Métricas de Conquista</p>
                    </div>
                </div>
                
                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
                    <label htmlFor="zona-filter" className="text-sm font-medium text-[#B4B4B4]">
                        Filtrar por:
                    </label>
                    <select
                        id="zona-filter"
                        value={selectedZona}
                        onChange={(e) => setSelectedZona(e.target.value)}
                        className="bg-black text-white border border-[#DAA520]/50 rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none"
                    >
                        {ZONAS.map((z) => (
                            <option key={z} value={z}>{z}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                // Golden Skeleton State
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(idx => (
                        <div key={idx} className="bg-gradient-to-br from-[#333333] to-[#1a1a1a] border border-[#DAA520]/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
                            <div className="animate-pulse flex flex-col items-center justify-center h-24">
                                <div className="w-10 h-10 rounded-full bg-[#DAA520]/20 mb-3 block"></div>
                                <div className="w-16 h-6 rounded bg-[#DAA520]/30 mb-2"></div>
                                <div className="w-24 h-3 rounded bg-gray-600/50"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                // Error State — classified feedback with retry
                <ErrorState
                    errorType={errorType}
                    rawMessage={error}
                    onRetry={handleRetry}
                    retrying={retrying}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {metrics.map((stat, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#333333] to-[#1a1a1a] border border-[#DAA520] rounded-xl p-5 shadow-[0_0_15px_rgba(218,165,32,0.1)] hover:shadow-[0_0_20px_rgba(218,165,32,0.2)] transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 rounded-lg bg-black/40 border border-[#DAA520]/30 text-[#DAA520]">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                {stat.tendency !== null && (
                                    <div className={`flex items-center text-sm font-bold px-2 py-1 rounded border ${stat.tendency >= 0 ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-red-900/30 text-red-400 border-red-500/30'}`}>
                                        {stat.tendency >= 0 ? <ArrowTrendingUpIcon className="w-3 h-3 mr-1" /> : <ArrowTrendingDownIcon className="w-3 h-3 mr-1" />}
                                        {Math.abs(stat.tendency)}%
                                    </div>
                                )}
                            </div>
                            <p className="text-sm uppercase text-[#B4B4B4] tracking-wider font-semibold mt-4">{stat.name}</p>
                            <p className="text-3xl font-black text-white my-1 tracking-tight">{stat.value}</p>
                            <p className="text-sm text-[#B4B4B4]">{stat.subtext}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Zonas de Atención */}
            {!loading && stats?.attention_needed && stats.attention_needed.length > 0 && (
                <div className="mt-6 bg-red-900/20 border-l-4 border-l-red-500 border-y border-y-red-500/20 border-r border-r-red-500/20 rounded-lg p-5 animate-pulse-slow">
                    <div className="flex items-center text-red-400 font-bold mb-3 text-lg">
                        <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
                        Atención Pastoral Requerida
                    </div>
                    <p className="text-sm text-[#B4B4B4] mb-3">
                        Las siguientes células requieren intervención pastoral inmediata (0 invitados reportados recientemente):
                    </p>
                    <ul className="text-sm text-red-300 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {stats.attention_needed.map((cell: any, idx: number) => (
                            <li key={cell.id || idx} className="flex items-center bg-black/30 p-2 rounded border border-red-500/10">
                                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                <span className="font-medium">{cell.nombre || `Célula ID: ${cell.id}`}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tabla Detalle */}
            <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl shadow-lg p-0 overflow-hidden">
                <div className="p-5 md:p-6 border-b border-white/5 bg-gradient-to-r from-black/80 to-[#111]">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <ClipboardDocumentCheckIcon className="w-6 h-6 text-[#DAA520]" />
                        Estado Detallado por Líder
                    </h4>
                </div>
                <div className="overflow-x-auto w-full">
                    {loading ? (
                        <div className="p-10 text-center text-[#DAA520] animate-pulse">Cargando reportes...</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/50 border-b border-white/10">
                                    <th className="p-4 text-sm font-bold text-[#DAA520] uppercase tracking-wider">Líder / Ministerio</th>
                                    <th className="p-4 text-sm font-bold text-[#DAA520] uppercase tracking-wider">Célula / Red</th>
                                    <th className="p-4 text-sm font-bold text-[#DAA520] uppercase tracking-wider">Último Reporte</th>
                                    <th className="p-4 text-sm font-bold text-[#DAA520] uppercase tracking-wider text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {stats?.recent_reports && stats.recent_reports.length > 0 ? (
                                    stats.recent_reports.map((report: any) => (
                                        <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 shrink-0">
                                                        <FallbackAvatar src={report.avatar_url || ''} alt={report.leader_name} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white group-hover:text-[#DAA520] transition-colors">{report.leader_name}</p>
                                                        {report.celula_zona && <p className="text-sm text-[#B4B4B4] uppercase tracking-widest">{report.celula_zona}</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-300 font-medium">{report.cell_name}</td>
                                            <td className="p-4 text-[#B4B4B4]">{new Date(report.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                            <td className="p-4 text-right">
                                                <span className={`px-3 py-1 inline-flex text-sm uppercase tracking-widest font-bold rounded-full ${
                                                    report.status?.toLowerCase() === 'recibido' || report.status?.toLowerCase() === 'aprobado' || report.status?.toLowerCase() === 'online' 
                                                        ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                                                        : 'bg-yellow-900/30 text-yellow-500 border border-yellow-500/30'
                                                }`}>
                                                    {report.status || 'Pendiente'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-10 text-center">
                                            <div className="flex flex-col items-center justify-center opacity-60">
                                                <ClipboardDocumentCheckIcon className="w-12 h-12 text-[#B4B4B4] mb-3" />
                                                <p className="text-[#B4B4B4] font-medium">No hay reportes recientes con los filtros activos.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

