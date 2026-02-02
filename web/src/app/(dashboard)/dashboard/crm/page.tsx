'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { syncYouTubeContent, SyncResult } from '@/lib/actions/syncYouTubeContent';
import {
    UserIcon,
    PhoneIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

interface Disciple {
    id: string;
    full_name: string;
    phone: string;
    status: 'Activo' | 'En Riesgo' | 'Inactivo';
    last_attendance_date: string;
    conversion_date: string;
}

export default function CRMPage() {
    const { user } = useAuth();
    const [disciples, setDisciples] = useState<Disciple[]>([]);
    const [loading, setLoading] = useState(true);

    // YouTube Sync State
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncResult, setSyncResult] = useState<SyncResult | null>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        fetchDisciples();
    }, []);

    const fetchDisciples = async () => {
        try {
            const { data, error } = await supabase
                .from('discipulos')
                .select('*')
                .order('last_attendance_date', { ascending: true }); // Most urgent first

            if (error) throw error;
            setDisciples(data || []);
        } catch (error) {
            console.error('Error fetching disciples:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle YouTube Sync
    const handleYouTubeSync = async () => {
        setIsSyncing(true);
        setSyncResult(null);

        try {
            const result = await syncYouTubeContent();
            setSyncResult(result);

            // Auto-hide success message after 5 seconds
            if (result.success) {
                setTimeout(() => setSyncResult(null), 5000);
            }
        } catch (error) {
            setSyncResult({
                success: false,
                synced: 0,
                updated: 0,
                errors: ['Error crítico durante sincronización'],
                message: 'Error al sincronizar contenido'
            });
        } finally {
            setIsSyncing(false);
        }
    };

    const getStatusColor = (lastDate: string) => {
        const days = Math.floor((new Date().getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
        if (days < 8) return 'bg-green-100 text-green-800 border-green-200';
        if (days >= 8 && days <= 15) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const getStatusIcon = (lastDate: string) => {
        const days = Math.floor((new Date().getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
        if (days < 8) return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
        if (days >= 8 && days <= 15) return <ClockIcon className="w-5 h-5 text-yellow-600" />;
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
    };

    const getStatusText = (lastDate: string) => {
        const days = Math.floor((new Date().getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
        if (days < 8) return 'Activo (< 8 días)';
        if (days >= 8 && days <= 15) return 'Alerta (8-15 días)';
        return 'En Riesgo (> 15 días)';
    };

    if (loading) {
        return <div className="p-8 text-center">Cargando CRM...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-aviva-bone">CRM de Seguimiento</h1>
                    <p className="text-aviva-bone/60">Semáforo espiritual de discípulos</p>
                </div>
            </div>

            {/* YouTube Sync Section */}
            <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-6 border border-[#DAA520]/20 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Altar Media Sync</h3>
                            <p className="text-gray-400 text-sm">Sincronizar contenido de YouTube</p>
                        </div>
                    </div>

                    <button
                        onClick={handleYouTubeSync}
                        disabled={isSyncing}
                        className="px-6 py-3 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-[#DAA520]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[200px] transform hover:scale-105"
                    >
                        {isSyncing ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Sincronizando...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>🔄 Sincronizar YouTube</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Sync Result Message */}
                {syncResult && (
                    <div className={`mt-4 p-4 rounded-lg ${syncResult.success
                        ? 'bg-green-900/30 border border-green-500/50'
                        : 'bg-red-900/30 border border-red-500/50'
                        }`}>
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                {syncResult.success ? (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-semibold text-sm ${syncResult.success ? 'text-green-300' : 'text-red-300'}`}>
                                    {syncResult.message}
                                </p>
                                {syncResult.success && (
                                    <p className="text-gray-300 text-xs mt-1">
                                        {syncResult.synced} nuevos • {syncResult.updated} actualizados
                                    </p>
                                )}
                                {syncResult.errors.length > 0 && (
                                    <ul className="text-red-300 text-xs mt-2 space-y-1">
                                        {syncResult.errors.slice(0, 3).map((err, idx) => (
                                            <li key={idx}>• {err}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lista estilo Ficha */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {disciples.map((disciple) => (
                    <div key={disciple.id} className={`p-4 rounded-xl border ${getStatusColor(disciple.last_attendance_date)} bg-aviva-onyx/40 backdrop-blur-sm shadow-sm transition-all hover:shadow-md`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="bg-black/40 p-2 rounded-full shadow-sm">
                                    <UserIcon className="w-6 h-6 text-aviva-gold/60" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-aviva-bone">{disciple.full_name}</h3>
                                    <p className="text-xs text-aviva-bone/40">{new Date(disciple.conversion_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            {getStatusIcon(disciple.last_attendance_date)}
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                                <PhoneIcon className="w-4 h-4 opacity-70" />
                                <span>{disciple.phone || 'Sin teléfono'}</span>
                            </div>

                            <div className="pt-2 border-t border-black/5 mt-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-xs uppercase tracking-wider opacity-70">Estado:</span>
                                    <span className="font-bold">{getStatusText(disciple.last_attendance_date)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Botón de Acción Rápida */}
                        {user?.rol === 'CMAvivamiento' && (
                            <a
                                href={`https://wa.me/${disciple.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 block w-full py-2 bg-[#25D366] text-white text-center rounded-lg text-sm font-bold hover:bg-[#128C7E] transition-colors"
                            >
                                Enviar Mensaje
                            </a>
                        )}
                    </div>
                ))}

                {disciples.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <UserIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No hay discípulos registrados</h3>
                        <p className="text-gray-500">Los líderes deben reportar "Nuevas Decisiones" para poblar esta lista.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
