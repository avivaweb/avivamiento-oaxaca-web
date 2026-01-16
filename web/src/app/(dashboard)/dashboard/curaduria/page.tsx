'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { PhotoIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ReportWithPhoto {
    id: string;
    fotos_urls: string[];
    zona: string;
    testimonies: string;
    destacado: boolean;
    supervisor_id: string;
    created_at: string;
    // Optional: could join with profiles to get leader name if needed
}

export default function AdminGalleryPage() {
    const { user, loading: authLoading } = useAuth();
    const [reports, setReports] = useState<ReportWithPhoto[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch reports with photos
    const fetchReports = async () => {
        try {
            const { data, error } = await supabase
                .from('celula_reports')
                .select('*')
                .not('fotos_urls', 'is', null)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Filter client-side for non-empty arrays just in case
            const validReports = (data || []).filter(r => Array.isArray(r.fotos_urls) && r.fotos_urls.length > 0);
            setReports(validReports);
        } catch (err) {
            console.error('Error fetching gallery admin:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchReports();
        }
    }, [user]);

    const toggleDestacado = async (reportId: string, currentValue: boolean) => {
        try {
            const { error } = await supabase
                .from('celula_reports')
                .update({ destacado: !currentValue })
                .eq('id', reportId);

            if (error) throw error;

            // Optimistic update
            setReports(prev => prev.map(r =>
                r.id === reportId ? { ...r, destacado: !currentValue } : r
            ));
        } catch (err) {
            console.error('Error toggle:', err);
            alert('No se pudo actualizar el estado.');
        }
    };

    if (authLoading || loading) {
        return <div className="p-8 text-center text-[#DAA520] animate-pulse">Cargando panel de curaduría...</div>;
    }

    if (!['Pastor de Zona', 'Pastor General', 'admin'].includes(user?.role || '')) {
        return (
            <div className="p-8 text-center bg-red-900/10 border border-red-500/20 rounded-xl m-4">
                <h1 className="text-xl font-bold text-red-500 mb-2">Acceso Restringido</h1>
                <p className="text-gray-400">Esta sección es exclusiva para el equipo pastoral.</p>
            </div>
        );
    }

    return (
        <div className="p-6 pb-24 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Curaduría <span className="text-[#DAA520]">Pastoral</span>
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Aprueba las evidencias visuales que aparecerán en la galería pública.
                    </p>
                </div>
                <div className="flex gap-2 text-sm">
                    <span className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200">
                        <PhotoIcon className="w-4 h-4 mr-1" />
                        {reports.length} Reportes con Fotos
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className={`
                            relative bg-white rounded-xl shadow-lg border transition-all duration-300 overflow-hidden
                            ${report.destacado ? 'border-[#DAA520] shadow-[#DAA520]/20' : 'border-gray-200'}
                        `}
                    >
                        {/* Image Carousel / Grid */}
                        <div className="h-64 bg-gray-100 relative overflow-hidden group">
                            {report.fotos_urls.length > 0 && (
                                <Image
                                    src={report.fotos_urls[0]}
                                    alt="Evidencia Principal"
                                    fill
                                    className="object-cover"
                                />
                            )}
                            {report.fotos_urls.length > 1 && (
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                                    +{report.fotos_urls.length - 1} más
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <div className="w-full flex justify-between items-end">
                                    <span className="text-white text-xs font-bold bg-[#DAA520] px-2 py-0.5 rounded uppercase tracking-wider">
                                        {report.zona || 'Sin Zona'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
                                        Testimonio
                                    </p>
                                    <p className="text-gray-800 text-sm line-clamp-3 italic">
                                        "{report.testimonies || 'Sin testimonio detallado.'}"
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-md ${report.destacado ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {report.destacado ? (
                                        <>
                                            <CheckCircleIcon className="w-4 h-4 mr-1" />
                                            PÚBLICO
                                        </>
                                    ) : (
                                        <>
                                            <XCircleIcon className="w-4 h-4 mr-1" />
                                            PENDIENTE
                                        </>
                                    )}
                                </span>

                                {/* Toggle Switch */}
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={report.destacado}
                                        onChange={() => toggleDestacado(report.id, report.destacado)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#DAA520] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DAA520]"></div>
                                </label>
                            </div>
                            <div className="mt-2 text-[10px] text-gray-400 text-right font-mono">
                                ID: {report.id.substring(0, 8)}...
                            </div>
                        </div>
                    </div>
                ))}

                {reports.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-500">
                        <PhotoIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>No hay reportes con evidencia visual para curar.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
