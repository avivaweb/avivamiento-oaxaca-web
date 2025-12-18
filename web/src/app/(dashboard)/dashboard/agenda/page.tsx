'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CalendarIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Event } from '@/types/event';

export default function AgendaPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        category: 'general'
    });

    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('eventos')
            .select('*')
            .order('start_time', { ascending: true })
            .limit(10);

        if (!error && data) {
            const mappedEvents: Event[] = data.map((e: any) => ({
                ...e,
                category: e.category || 'general'
            }));
            setEvents(mappedEvents);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('eventos').insert([newEvent]);
        if (!error) {
            setShowForm(false);
            setNewEvent({ title: '', description: '', start_time: '', end_time: '', location: '', category: 'general' });
            fetchEvents();
        } else {
            alert('Error saving event');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#A5002F] font-serif">Agenda Maestra 2026</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#A5002F] text-white rounded-lg hover:bg-[#8A0026] transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Nuevo Evento
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in-down">
                    <h3 className="text-lg font-semibold mb-4">Crear Nuevo Evento</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Título del Evento"
                                className="w-full p-2 border rounded"
                                value={newEvent.title}
                                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                required
                            />
                            <select
                                className="w-full p-2 border rounded"
                                value={newEvent.category}
                                onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}
                            >
                                <option value="general">General</option>
                                <option value="special">Especial</option>
                                <option value="workshop">Taller/Escuela</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Descripción"
                            className="w-full p-2 border rounded"
                            value={newEvent.description}
                            onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Inicio</label>
                                <input
                                    type="datetime-local"
                                    className="w-full p-2 border rounded"
                                    value={newEvent.start_time}
                                    onChange={e => setNewEvent({ ...newEvent, start_time: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Fin</label>
                                <input
                                    type="datetime-local"
                                    className="w-full p-2 border rounded"
                                    value={newEvent.end_time}
                                    onChange={e => setNewEvent({ ...newEvent, end_time: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Ubicación"
                            className="w-full p-2 border rounded"
                            value={newEvent.location}
                            onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#A5002F] text-white rounded hover:bg-[#8A0026]"
                            >
                                Guardar Evento
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos Eventos</h3>
                {loading ? (
                    <p>Cargando eventos...</p>
                ) : (
                    <div className="space-y-4">
                        {events.length === 0 ? (
                            <p className="text-gray-500 italic">No hay eventos programados.</p>
                        ) : (
                            events.map((event: any) => (
                                <div key={event.id} className="flex items-start gap-4 p-4 border-l-4 border-[#A5002F] bg-gray-50 rounded-r-lg">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900">{event.title}</h4>
                                        <p className="text-sm text-gray-600">{new Date(event.start_time).toLocaleDateString()} - {new Date(event.start_time).toLocaleTimeString()}</p>
                                        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                                    </div>
                                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full capitalize">
                                        {event.category}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

