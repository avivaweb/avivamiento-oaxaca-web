'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
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
                    <h1 className="text-2xl font-bold text-gray-900">CRM de Seguimiento</h1>
                    <p className="text-gray-500">Semáforo espiritual de discípulos</p>
                </div>
            </div>

            {/* Lista estilo Ficha */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {disciples.map((disciple) => (
                    <div key={disciple.id} className={`p-4 rounded-xl border ${getStatusColor(disciple.last_attendance_date)} bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <UserIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{disciple.full_name}</h3>
                                    <p className="text-xs opacity-75">{new Date(disciple.conversion_date).toLocaleDateString()}</p>
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
                        {user?.role === 'CMAvivamiento' && (
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
