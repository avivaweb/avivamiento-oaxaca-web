'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    CalendarIcon,
    UserGroupIcon,
    HeartIcon,
    ChatBubbleBottomCenterTextIcon,
    CheckCircleIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ReportPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        adults_attendance: 0,
        children_attendance: 0,
        new_decisions: 0,
        prayer_requests: '',
        observations: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: e.target.type === 'number' ? parseInt(value) || 0 : value
        }));
    };

    const validate = () => {
        const totalAttendance = formData.adults_attendance + formData.children_attendance;
        if (totalAttendance === 0 && !formData.observations.trim()) {
            setError('No puedes enviar un reporte con asistencia 0 sin dejar una observación.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el reporte');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/dashboard/mis-celulas');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircleIcon className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Cosecha Registrada!</h2>
                <p className="text-gray-500 mb-8">Gracias por tu fidelidad en el reporte.</p>
                <Link
                    href="/dashboard/mis-celulas"
                    className="px-6 py-3 bg-[#A5002F] text-white rounded-xl font-medium shadow-lg shadow-red-900/20 hover:bg-[#8A0026] transition-all"
                >
                    Volver a Mis Células
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4 sm:p-6 pb-20">
            <div className="mb-6 flex items-center">
                <Link href="/dashboard/mis-celulas" className="mr-4 p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-400" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">Nuevo Reporte</h1>
                    <p className="text-sm text-gray-500">Registra la actividad de tu célula semanal</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 text-[#A5002F] p-4 rounded-xl text-sm font-medium border border-red-100 animate-shake">
                        {error}
                    </div>
                )}

                {/* Fecha */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Fecha de Reunión</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-[#A5002F] focus:border-[#A5002F] transition-shadow"
                        />
                    </div>
                </div>

                {/* Asistencia */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Adultos</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserGroupIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="adults_attendance"
                                min="0"
                                value={formData.adults_attendance}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-[#A5002F] focus:border-[#A5002F] transition-shadow"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Niños</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserGroupIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="children_attendance"
                                min="0"
                                value={formData.children_attendance}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-[#A5002F] focus:border-[#A5002F] transition-shadow"
                            />
                        </div>
                    </div>
                </div>

                {/* Nuevas Decisiones */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                        <HeartIcon className="w-4 h-4 mr-1 text-[#A5002F]" />
                        Nuevas Decisiones (Salvación)
                    </label>
                    <input
                        type="number"
                        name="new_decisions"
                        min="0"
                        value={formData.new_decisions}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-[#A5002F] focus:border-[#A5002F] transition-shadow"
                    />
                </div>

                {/* Textareas */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Peticiones de Oración</label>
                        <textarea
                            name="prayer_requests"
                            rows={3}
                            value={formData.prayer_requests}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-[#A5002F] focus:border-[#A5002F] transition-shadow resize-none"
                            placeholder="¿Por qué necesitamos orar esta semana?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Observaciones Generales</label>
                        <textarea
                            name="observations"
                            rows={3}
                            value={formData.observations}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-[#A5002F] focus:border-[#A5002F] transition-shadow resize-none"
                            placeholder="Comentarios sobre la reunión, incidencias, testimonios..."
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-red-900/20 text-base font-semibold text-white bg-[#A5002F] hover:bg-[#8A0026] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A5002F] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando...
                            </span>
                        ) : (
                            'Enviar Reporte'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
