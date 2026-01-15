'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import { ReportWithLEader } from '@/types/db';
import {
    StarIcon,
    PhotoIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function MiracleWall() {
    const { user } = useAuth();
    const [reports, setReports] = useState<ReportWithLEader[]>([]);
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState({ newDecisions: 0, offering: 0 });

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        if (!user) return;
        fetchReports();
    }, [user]);

    const fetchReports = async () => {
        try {
            const { data, error } = await supabase
                .from('celula_reports')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const userIds = [...new Set(data.map(r => r.user_id))];
                const { data: profiles } = await supabase
                    .from('profiles')
                    .select('id, full_name')
                    .in('id', userIds);

                const profilesMap = new Map(profiles?.map(p => [p.id, p]));

                const enrichedReports: ReportWithLEader[] = data.map(r => ({
                    ...r,
                    leader_name: profilesMap.get(r.user_id)?.full_name || 'Líder'
                }));

                setReports(enrichedReports);

                const newDecisions = data.reduce((acc, curr) => acc + (curr.new_decisions || 0), 0);
                const offering = data.reduce((acc, curr) => acc + (Number(curr.offering) || 0), 0);
                setMetrics({ newDecisions, offering });
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleDestacado = async (reportId: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('celula_reports')
                .update({ destacado: !currentStatus })
                .eq('id', reportId);

            if (error) throw error;

            setReports(prev => prev.map(r =>
                r.id === reportId ? { ...r, destacado: !currentStatus } : r
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const submitPastoralComment = async (reportId: string, comment: string) => {
        try {
            const { error } = await supabase
                .from('celula_reports')
                .update({ comentario_pastoral: comment })
                .eq('id', reportId);

            if (error) throw error;

            setReports(prev => prev.map(r =>
                r.id === reportId ? { ...r, comentario_pastoral: comment } : r
            ));
            return true;
        } catch (error) {
            console.error('Error submitting comment:', error);
            return false;
        }
    };

    if (loading) return <div className="text-center py-10 text-[#DAA520]">Cargando Muro de Milagros...</div>;

    return (
        <div className="space-y-8">
            {/* Metrics Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/90 border border-[#DAA520]/50 p-6 rounded-lg text-center shadow-[0_0_15px_rgba(218,165,32,0.1)]">
                    <p className="text-[#DAA520] text-lg font-medium mb-1">Cosecha de la Semana</p>
                    <p className="text-4xl font-bold text-white">{metrics.newDecisions}</p>
                    <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Nuevas Decisiones</p>
                </div>
                <div className="bg-black/90 border border-[#DAA520]/50 p-6 rounded-lg text-center shadow-[0_0_15px_rgba(218,165,32,0.1)]">
                    <p className="text-[#DAA520] text-lg font-medium mb-1">Ofrenda Total</p>
                    <p className="text-4xl font-bold text-white">
                        ${metrics.offering.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Reportado</p>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-[#DAA520]">✦</span> Muro de Milagros
                </h2>

                <div className="grid grid-cols-1 gap-6">
                    {reports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            onDestacar={() => toggleDestacado(report.id, report.destacado || false)}
                            onSubmitComment={(comment) => submitPastoralComment(report.id, comment)}
                        />
                    ))}
                    {reports.length === 0 && (
                        <p className="text-center text-gray-500 py-10">No hay reportes esta semana.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function ReportCard({ report, onDestacar, onSubmitComment }: { report: ReportWithLEader, onDestacar: () => void, onSubmitComment: (c: string) => Promise<boolean> }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [comment, setComment] = useState(report.comentario_pastoral || '');
    const [isEditing, setIsEditing] = useState(!report.comentario_pastoral);
    const photos = report.fotos_urls || [];
    const hasPhotos = photos.length > 0;

    const nextPhoto = () => setCurrentPhotoIndex(curr => (curr + 1) % photos.length);
    const prevPhoto = () => setCurrentPhotoIndex(curr => (curr - 1 + photos.length) % photos.length);

    const handleSubmit = async () => {
        const success = await onSubmitComment(comment);
        if (success) setIsEditing(false);
    };

    return (
        <div className={`
            relative bg-[#0a0a0a] border-2 rounded-xl overflow-hidden transition-all duration-300
            ${report.destacado
                ? 'border-[#DAA520] shadow-[0_0_30px_rgba(218,165,32,0.15)]'
                : 'border-white/10 hover:border-[#DAA520]/50'}
        `}>
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex justify-between items-start bg-gradient-to-r from-[#DAA520]/10 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#DAA520] flex items-center justify-center text-black font-bold text-lg">
                        {report.leader_name?.[0].toUpperCase() || 'L'}
                    </div>
                    <div>
                        <h3 className="font-bold text-white">{report.leader_name}</h3>
                        <p className="text-xs text-[#DAA520]/80 uppercase tracking-wide">
                            {new Date(report.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={onDestacar}
                    className={`
                        p-2 rounded-full transition-all duration-300
                        ${report.destacado
                            ? 'bg-[#DAA520] text-black shadow-[0_0_10px_rgba(218,165,32,0.5)]'
                            : 'bg-white/5 text-gray-400 hover:bg-[#DAA520]/20 hover:text-[#DAA520]'}
                    `}
                    title="Destacar Milagro"
                >
                    {report.destacado ? <StarIconSolid className="w-5 h-5" /> : <StarIcon className="w-5 h-5" />}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
                {/* Photos Carousel */}
                <div className="relative h-64 md:h-auto bg-black border-r border-white/5 group">
                    {hasPhotos ? (
                        <>
                            <img
                                src={photos[currentPhotoIndex]}
                                alt="Evidencia reporte"
                                className="w-full h-full object-cover"
                            />
                            {photos.length > 1 && (
                                <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={prevPhoto} className="p-1 bg-black/50 rounded-full text-white hover:bg-[#DAA520]"><ChevronLeftIcon className="w-6 h-6" /></button>
                                    <button onClick={nextPhoto} className="p-1 bg-black/50 rounded-full text-white hover:bg-[#DAA520]"><ChevronRightIcon className="w-6 h-6" /></button>
                                </div>
                            )}
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                                {currentPhotoIndex + 1} / {photos.length}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                            <PhotoIcon className="w-16 h-16 mb-2 opacity-20" />
                            <span className="text-sm opacity-50">Sin fotografías</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        {report.testimonies && (
                            <div>
                                <h4 className="text-xs font-bold text-[#DAA520] uppercase tracking-wider mb-2">Testimonios y Milagros</h4>
                                <p className="text-white/90 italic leading-relaxed">"{report.testimonies}"</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Tema</p>
                                <p className="text-white text-sm font-medium truncate">{report.lesson_topic || 'No especificado'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Invitados</p>
                                <p className="text-[#DAA520] text-xl font-bold">{report.new_decisions}</p>
                            </div>
                        </div>

                        {/* Pastoral Comment Section */}
                        <div className="pt-4 mt-2 border-t border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[#DAA520] text-xs font-bold uppercase tracking-wider">Palabra Pastoral</span>
                            </div>

                            {isEditing ? (
                                <div className="space-y-2">
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Escribe una palabra de bendición..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] transition-all resize-none h-24"
                                    />
                                    <div className="flex justify-end gap-2">
                                        {report.comentario_pastoral && (
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                        <button
                                            onClick={handleSubmit}
                                            className="px-4 py-2 bg-[#DAA520] text-black text-xs font-bold rounded hover:bg-[#B8860B] transition-colors shadow-lg shadow-[#DAA520]/20"
                                        >
                                            Enviar Palabra
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative group cursor-pointer" onClick={() => setIsEditing(true)}>
                                    <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#DAA520] to-transparent rounded-full opacity-50 block"></div>
                                    <p className="pl-3 text-sm text-white/80 font-serif italic selection:bg-[#DAA520]/30 leading-relaxed">
                                        "{comment}"
                                    </p>
                                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs text-[#DAA520] underline">Editar</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
