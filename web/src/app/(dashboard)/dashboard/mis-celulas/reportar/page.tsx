
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import {
    CalendarIcon,
    UserGroupIcon,
    HeartIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
    UserPlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Disciple {
    id: string;
    full_name: string;
}

interface NewGuest {
    full_name: string;
    phone: string;
}

export default function ReportarPage() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // CRM State
    const [myDisciples, setMyDisciples] = useState<Disciple[]>([]);
    const [selectedAttendance, setSelectedAttendance] = useState<string[]>([]);
    const [newGuests, setNewGuests] = useState<NewGuest[]>([]);

    // Guest Form State
    const [guestName, setGuestName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        children_attendance: 0,
        prayer_requests: '',
        observations: ''
    });

    useEffect(() => {
        fetchMyDisciples();
    }, []);

    const fetchMyDisciples = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from('discipulos')
            .select('id, full_name')
            .eq('leader_id', user.id)
            .eq('status', 'Activo');

        if (data) setMyDisciples(data);
    };

    const handleAddGuest = () => {
        if (!guestName.trim()) return;
        setNewGuests([...newGuests, { full_name: guestName, phone: guestPhone }]);
        setGuestName('');
        setGuestPhone('');
    };

    const removeGuest = (index: number) => {
        const updated = [...newGuests];
        updated.splice(index, 1);
        setNewGuests(updated);
    };

    const toggleAttendance = (id: string) => {
        if (selectedAttendance.includes(id)) {
            setSelectedAttendance(selectedAttendance.filter(i => i !== id));
        } else {
            setSelectedAttendance([...selectedAttendance, id]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: e.target.type === 'number' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Calculate total adults based on specific attendance + new guests
            // We can also allow a manual override if needed, but for CRM accuracy we prioritize the list.
            // For now, we will sum them up.
            const totalAdults = selectedAttendance.length + newGuests.length;
            const newDecisionsCount = newGuests.length;

            const payload = {
                ...formData,
                adults_attendance: totalAdults,
                new_decisions: newDecisionsCount,
                attendees_ids: selectedAttendance,
                new_guests: newGuests
            };

            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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
                <p className="text-gray-500 mb-8">Datos actualizados en el CRM.</p>
                <Link
                    href="/dashboard/mis-celulas"
                    className="px-6 py-3 bg-[#A5002F] text-white rounded-xl font-medium shadow-lg hover:bg-[#8A0026] transition-all"
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
                    <h1 className="text-2xl font-bold text-gray-900">Nuevo Reporte CRM</h1>
                    <p className="text-sm text-gray-500">Reporte individual y consolidación</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                    <div className="bg-red-50 text-[#A5002F] p-4 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                {/* Paso 1: Datos Básicos */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2 text-[#A5002F]" />
                        Datos de Reunión
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Fecha</label>
                            <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#A5002F] focus:border-[#A5002F]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Niños</label>
                            <input
                                type="number"
                                name="children_attendance"
                                min="0"
                                value={formData.children_attendance}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#A5002F] focus:border-[#A5002F]"
                            />
                        </div>
                    </div>
                </div>

                {/* Paso 2: Asistencia de Discípulos */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                        <UserGroupIcon className="w-5 h-5 mr-2 text-[#A5002F]" />
                        Asistencia de Miembros
                    </h3>

                    {myDisciples.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No tienes discípulos activos. Agrega "Nuevos Invitados" para empezar a consolidar.</p>
                    ) : (
                        <div className="space-y-2">
                            {myDisciples.map(disciple => (
                                <div key={disciple.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">{disciple.full_name}</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedAttendance.includes(disciple.id)}
                                        onChange={() => toggleAttendance(disciple.id)}
                                        className="w-5 h-5 text-[#A5002F] rounded focus:ring-[#A5002F] border-gray-300"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-right text-xs text-gray-400">
                        Seleccionados: {selectedAttendance.length}
                    </div>
                </div>

                {/* Paso 3: Nuevas Decisiones (Sincronizado con Persona por Persona) */}
                <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <label className="block text-sm font-medium text-gray-700 flex items-center mb-2">
                            <HeartIcon className="w-5 h-5 mr-2 text-[#A5002F]" />
                            Nuevas Decisiones (Registro Persona por Persona)
                        </label>
                        <p className="text-sm text-gray-600 mb-4">
                            Ingresa los datos de cada nueva persona para generar su ficha de seguimiento.
                            <br />
                            <strong>Total registrados: {newGuests.length}</strong>
                        </p>

                        <div className="flex space-x-2 mb-4">
                            <input
                                type="text"
                                placeholder="Nombre completo del invitado"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#A5002F] focus:border-[#A5002F]"
                            />
                            <input
                                type="tel"
                                placeholder="WhatsApp"
                                value={guestPhone}
                                onChange={(e) => setGuestPhone(e.target.value)}
                                className="w-1/3 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#A5002F] focus:border-[#A5002F]"
                            />
                            <button
                                type="button"
                                onClick={handleAddGuest}
                                disabled={!guestName.trim()}
                                className="p-2 bg-[#A5002F] text-white rounded-lg hover:bg-[#8A0026] disabled:opacity-50"
                            >
                                <UserPlusIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {newGuests.length > 0 && (
                            <div className="divide-y divide-gray-200 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {newGuests.map((guest, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{guest.full_name}</p>
                                                <p className="text-xs text-green-600 flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                                                    {guest.phone || 'Sin contacto'}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeGuest(idx)}
                                            className="text-red-400 hover:text-red-600 p-2"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Observaciones */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Observaciones / Peticiones</label>
                    <textarea
                        name="observations"
                        rows={3}
                        value={formData.observations}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-[#A5002F] focus:border-[#A5002F] resize-none text-sm"
                        placeholder="Comentarios generales..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-red-900/20 text-base font-semibold text-white bg-[#A5002F] hover:bg-[#8A0026] disabled:opacity-50 transition-all"
                    >
                        {loading ? 'Guardando en CRM...' : 'Enviar Reporte y Actualizar Fichas'}
                    </button>
                </div>
            </form >
        </div >
    );
}
