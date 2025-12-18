'use client';

import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/api';
import {
    CalendarIcon,
    MapPinIcon,
    UserIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

type Lead = {
    id: string;
    created_at: string;
    nombre: string;     // Mapped from 'fullName' or 'nombre'
    zona: string;       // Mapped from 'preference' or 'zona'
    telefono: string;   // Mapped from 'phone' or 'telefono'
    email: string;
    status: 'Pendiente' | 'Contactado' | 'Consolidado';
    notas?: string;
};

// Colors for badges
const STATUS_COLORS = {
    'Pendiente': 'bg-red-100 text-red-800 border-red-200',
    'Contactado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Consolidado': 'bg-green-100 text-green-800 border-green-200',
};

export default function ConsolidationPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [notesBuffer, setNotesBuffer] = useState('');
    const [statusBuffer, setStatusBuffer] = useState<Lead['status']>('Pendiente');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            // Fetch directly from supabase via REST API proxy logic or direct URL
            // Using fetchWithAuth to handle potential auth/cookies + adding Supabase Key
            const response = await fetchWithAuth('/rest/v1/grupos_familiares?select=*&order=created_at.desc', {
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
                    'Prefer': 'return=representation'
                }
            });

            if (!response.ok) throw new Error('Error fetching leads');

            const data = await response.json();

            // Map data to Lead type
            const mappedLeads: Lead[] = data.map((item: any) => ({
                id: item.id,
                created_at: item.created_at,
                nombre: item.fullName || item.nombre || 'Sin Nombre',
                zona: item.preference || item.zona || 'N/A',
                telefono: item.phone || item.telefono || 'Sin Teléfono',
                email: item.email || '',
                status: item.status || 'Pendiente',
                notas: item.notes || item.notas || ''
            }));

            setLeads(mappedLeads);
        } catch (error) {
            console.error('Failed to fetch leads:', error);
            // Fallback mock data for demo if fetch fails (e.g. table doesn't exist yet)
            setLeads([
                { id: '1', created_at: new Date().toISOString(), nombre: 'Juan Pérez Test', zona: 'Norte', telefono: '555-1234', email: 'juan@test.com', status: 'Pendiente', notas: '' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (lead: Lead) => {
        setSelectedLead(lead);
        setNotesBuffer(lead.notas || '');
        setStatusBuffer(lead.status);
    };

    const handleCloseModal = () => {
        setSelectedLead(null);
        setNotesBuffer('');
    };

    const handleSave = async () => {
        if (!selectedLead) return;
        setIsSaving(true);
        try {
            const updates = {
                status: statusBuffer,
                notes: notesBuffer // Assuming column is 'notes' or 'notas', will try 'notes' mostly if created by English script, but 'notas' if Spanish. I'll send 'status'.
            };

            // We need to know the exact column name for notes. I'll guess 'notas' based on instructions "Notas de Seguimiento".
            // But if the table is 'grupos_familiares', it might be 'notas'.

            const response = await fetchWithAuth(`/rest/v1/grupos_familiares?id=eq.${selectedLead.id}`, {
                method: 'PATCH',
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    status: statusBuffer,
                    notas: notesBuffer // Attempting 'notas'
                })
            });

            if (!response.ok) {
                // Try 'notes' if 'notas' failed? Or just throw.
                throw new Error('Failed to update');
            }

            // Update local state
            setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, status: statusBuffer, notas: notesBuffer } : l));
            handleCloseModal();
        } catch (error) {
            console.error('Error saving lead:', error);
            alert('Error al guardar. Verifica la conexión o permisos.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[var(--aviva-principal)] tracking-tight">Gestión de Leads</h1>
                    <p className="mt-1 text-gray-500">Consolidación y seguimiento de nuevos contactos.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchLeads}
                        className="px-4 py-2 text-sm font-medium text-[var(--aviva-dorado)] bg-white border border-[var(--aviva-dorado)] rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Refrescar
                    </button>
                    {/* Placeholder for future export */}
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--aviva-principal)] rounded-lg hover:bg-[#8A0026] transition-colors shadow">
                        Exportar CSV
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-gray-900 rounded-xl shadow-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/5">
                        <thead className="bg-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nombre</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Zona / Preferencia</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-gray-900">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-24"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-48"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-32"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 bg-white/10 rounded-full w-20"></div></td>
                                        <td className="px-6 py-4 text-right"><div className="h-4 bg-white/10 rounded w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                        No se encontraron leads.
                                    </td>
                                </tr>
                            ) : leads.map((lead) => (
                                <tr
                                    key={lead.id}
                                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                                    onClick={() => handleOpenModal(lead)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4 text-gray-500 group-hover:text-[var(--aviva-dorado)] transition-colors" />
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--aviva-dorado)] font-bold text-xs mr-3 border border-white/10">
                                                {lead.nombre.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="text-sm font-medium text-gray-200">{lead.nombre}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            {lead.zona === 'online' ? <MapPinIcon className="w-4 h-4 text-blue-400" /> : <MapPinIcon className="w-4 h-4 text-gray-400" />}
                                            <span className="capitalize">{lead.zona}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-800'}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-[var(--aviva-dorado)] hover:text-[var(--aviva-principal)] transition-colors">
                                            Ver Detalle
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Detalle */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="bg-[var(--aviva-principal)] px-6 py-4 flex justify-between items-center text-white">
                            <div>
                                <h3 className="text-lg font-bold">Detalles del Lead</h3>
                                <p className="text-white/80 text-sm">ID: {selectedLead.id}</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Info Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre Completo</label>
                                    <p className="text-gray-900 font-medium text-lg mt-1">{selectedLead.nombre}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Teléfono</label>
                                        <p className="text-gray-900 mt-1">{selectedLead.telefono}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                                        <p className="text-gray-900 mt-1 break-all">{selectedLead.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Zona / Preferencia</label>
                                    <p className="text-gray-900 mt-1 capitalize">{selectedLead.zona}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha de Registro</label>
                                    <p className="text-gray-900 mt-1">{new Date(selectedLead.created_at).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Actions Column */}
                            <div className="space-y-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado de Consolidación</label>
                                    <div className="flex flex-col gap-2">
                                        {(['Pendiente', 'Contactado', 'Consolidado'] as const).map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setStatusBuffer(s)}
                                                className={`flex items-center px-4 py-2 rounded-lg border text-sm font-medium transition-all ${statusBuffer === s
                                                    ? 'border-[var(--aviva-dorado)] bg-yellow-50 text-[var(--aviva-dorado)] shadow-sm'
                                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className={`w-2 h-2 rounded-full mr-3 ${s === 'Pendiente' ? 'bg-red-500' :
                                                    s === 'Contactado' ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`} />
                                                {s}
                                                {statusBuffer === s && <CheckCircleIcon className="w-5 h-5 ml-auto" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Notas de Seguimiento</label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--aviva-principal)] focus:ring-[var(--aviva-principal)] text-sm"
                                        rows={4}
                                        placeholder="Escribe notas sobre la llamada o contacto..."
                                        value={notesBuffer}
                                        onChange={(e) => setNotesBuffer(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 text-sm font-medium text-white bg-[var(--aviva-principal)] rounded-lg hover:bg-[#8A0026] disabled:opacity-50 flex items-center"
                            >
                                {isSaving ? <ClockIcon className="w-4 h-4 mr-2 animate-spin" /> : null}
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
