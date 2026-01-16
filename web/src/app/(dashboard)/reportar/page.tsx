'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
    UserGroupIcon,
    CurrencyDollarIcon,
    BookOpenIcon,
    FireIcon,
    PaperAirplaneIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import ReportSuccessModal from '@/components/reports/ReportSuccessModal';
import ImageUploader from '@/components/ImageUploader';

export default function ReportPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState<string>('');
    const [cellData, setCellData] = useState<{ id: string; name: string; supervisor_id: string } | null>(null);

    // Listas de Opciones
    const ZONAS = [
        "Jalpan",
        "Cuilápam",
        "Zaachila",
        "San Nicolás",
        "Cañada",
        "Centro / Oaxaca Juárez",
        "Etla / Valles Centrales"
    ];

    const CATEGORIAS_MILAGRO = [
        "Sanidad", "Finanzas", "Restauración Familiar", "Liberación", "Provisión", "Protección", "Otro"
    ];

    // Form State
    const [formData, setFormData] = useState({
        adults_attendance: '',
        children_attendance: '',
        new_decisions: '',
        offering: '',
        lesson_topic: '',
        testimonies: '',
        prayer_requests: '',
        zona: '',
        milagro_categoria: ''
    });

    const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

    // Load User's Cell Data and ID
    useEffect(() => {
        const fetchCellData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                setUserId(user.id);

                const { data, error } = await supabase
                    .from('grupos_familiares')
                    .select('id, nombre, supervisor_id')
                    .eq('user_id', user.id)
                    .single();

                if (data) {
                    setCellData({
                        id: data.id,
                        name: data.nombre,
                        supervisor_id: data.supervisor_id
                    });
                }
            } catch (err) {
                console.error('Error loading cell data:', err);
            }
        };

        fetchCellData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación: Testimonio min 500 caracteres (si hay texto)
        if (formData.testimonies.length > 0 && formData.testimonies.length < 500) {
            alert('El testimonio debe ser rico en detalles (mínimo 500 caracteres) para capturar la Vida Zoé.');
            return;
        }

        setLoading(true);

        try {
            if (!userId) throw new Error('Usuario no autenticado');

            const response = await fetch('/api/reports/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    cell_id: cellData?.id,
                    supervisor_id: cellData?.supervisor_id,
                    fotos_urls: uploadedPhotos
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar reporte');
            }

            setSuccess(true);
            // Reset form logic handled by refresh or explicit reset if needed
        } catch (error) {
            console.error(error);
            alert('Hubo un error al enviar el reporte. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // Format currency display
    const formatCurrency = (value: string) => {
        if (!value) return '';
        const number = parseFloat(value);
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(number);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    Reporte de Victoria <span className="text-[#DAA520]">Semanal</span>
                </h1>
                <p className="text-gray-400 mt-2">
                    {cellData ? `Reportando para: ${cellData.name}` : 'Cargando datos de célula...'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* SECCIÓN: INFORMACIÓN GENERAL */}
                <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6 shadow-lg shadow-[#DAA520]/5">
                    <div className="flex items-center mb-6 border-b border-white/10 pb-4">
                        <PaperAirplaneIcon className="w-6 h-6 text-[#DAA520] mr-3" />
                        <h2 className="text-xl font-bold text-white">Información General</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Zona de Expansión</label>
                        <select
                            name="zona"
                            required
                            value={formData.zona}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none appearance-none"
                        >
                            <option value="" className="bg-gray-900 text-gray-500">Selecciona la Zona...</option>
                            {ZONAS.map(opt => (
                                <option key={opt} value={opt} className="bg-gray-900">{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* SECCIÓN: COSECHA */}
                <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6 shadow-lg shadow-[#DAA520]/5">
                    <div className="flex items-center mb-6 border-b border-white/10 pb-4">
                        <UserGroupIcon className="w-6 h-6 text-[#DAA520] mr-3" />
                        <h2 className="text-xl font-bold text-white">Cosecha</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Asistencia Adultos</label>
                            <input
                                type="number"
                                name="adults_attendance"
                                required
                                min="0"
                                value={formData.adults_attendance}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Asistencia Niños</label>
                            <input
                                type="number"
                                name="children_attendance"
                                required
                                min="0"
                                value={formData.children_attendance}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none"
                                placeholder="0"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-[#DAA520] mb-2">
                                Nuevos Invitados / Pasión 2026
                            </label>
                            <input
                                type="number"
                                name="new_decisions"
                                required
                                min="0"
                                value={formData.new_decisions}
                                onChange={handleChange}
                                className="w-full bg-[#DAA520]/10 border border-[#DAA520]/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none placeholder-gray-500"
                                placeholder="Cantidad de nuevos invitados"
                            />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN: MAYORDOMÍA */}
                <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6 shadow-lg shadow-[#DAA520]/5">
                    <div className="flex items-center mb-6 border-b border-white/10 pb-4">
                        <CurrencyDollarIcon className="w-6 h-6 text-[#DAA520] mr-3" />
                        <h2 className="text-xl font-bold text-white">Mayordomía</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Ofrenda Total</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">$</span>
                            </div>
                            <input
                                type="number"
                                name="offering"
                                step="0.01"
                                required
                                min="0"
                                value={formData.offering}
                                onChange={handleChange}
                                className="w-full pl-8 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none"
                                placeholder="0.00"
                            />
                        </div>
                        {formData.offering && (
                            <p className="text-xs text-[#DAA520] mt-2 text-right font-mono">
                                {formatCurrency(formData.offering)}
                            </p>
                        )}
                    </div>
                </div>

                {/* SECCIÓN: EDIFICACIÓN */}
                <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6 shadow-lg shadow-[#DAA520]/5">
                    <div className="flex items-center mb-6 border-b border-white/10 pb-4">
                        <BookOpenIcon className="w-6 h-6 text-[#DAA520] mr-3" />
                        <h2 className="text-xl font-bold text-white">Edificación</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Manual / Lección Impartida</label>
                        <select
                            name="lesson_topic"
                            required
                            value={formData.lesson_topic}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none appearance-none"
                        >
                            <option value="" className="bg-gray-900 text-gray-500">Selecciona una opción...</option>
                            <option value="Vida Cristiana" className="bg-gray-900">Manual Vida Cristiana</option>
                            <option value="Paternidad" className="bg-gray-900">Manual Paternidad</option>
                            <option value="Consolidacion" className="bg-gray-900">Manual Consolidación</option>
                            <option value="Liderazgo" className="bg-gray-900">Escuela de Líderes</option>
                            <option value="Otro" className="bg-gray-900">Otro Tema</option>
                        </select>
                    </div>
                </div>

                {/* SECCIÓN: GLORIA Y PODER */}
                <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6 shadow-lg shadow-[#DAA520]/5">
                    <div className="flex items-center mb-6 border-b border-white/10 pb-4">
                        <FireIcon className="w-6 h-6 text-[#DAA520] mr-3" />
                        <h2 className="text-xl font-bold text-white">Gloria y Poder</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Categoría del Milagro</label>
                            <select
                                name="milagro_categoria"
                                value={formData.milagro_categoria}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none appearance-none"
                            >
                                <option value="" className="bg-gray-900 text-gray-500">Selecciona categoría (opcional)...</option>
                                {CATEGORIAS_MILAGRO.map(opt => (
                                    <option key={opt} value={opt} className="bg-gray-900">{opt}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Testimonios y Milagros</label>
                            <textarea
                                name="testimonies"
                                rows={4}
                                value={formData.testimonies}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none resize-none"
                                placeholder="Comparte breves testimonios de lo que Dios hizo..."
                            />
                            <p className="text-xs text-gray-500 mt-1 text-right">Mínimo 500 caracteres para reportar Vida Zoé</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Peticiones de Oración</label>
                            <textarea
                                name="prayer_requests"
                                rows={3}
                                value={formData.prayer_requests}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all outline-none resize-none"
                                placeholder="Necesidades específicas para orar..."
                            />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN: EVIDENCIAS FOTOGRÁFICAS */}
                <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6 shadow-lg shadow-[#DAA520]/5">
                    <div className="flex items-center mb-6 border-b border-white/10 pb-4">
                        <PhotoIcon className="w-6 h-6 text-[#DAA520] mr-3" />
                        <h2 className="text-xl font-bold text-white">Evidencias</h2>
                    </div>

                    {userId ? (
                        <ImageUploader
                            userId={userId}
                            onUploadComplete={setUploadedPhotos}
                            maxFiles={3}
                        />
                    ) : (
                        <p className="text-gray-500">Cargando identidad para subir fotos...</p>
                    )}
                </div>

                {/* BOTÓN ENVIAR */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-black font-extrabold py-4 px-6 rounded-xl shadow-lg shadow-[#DAA520]/20 transition-all flex items-center justify-center transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-3"></span>
                            Enviando...
                        </span>
                    ) : (
                        <span className="flex items-center text-lg">
                            <PaperAirplaneIcon className="w-6 h-6 mr-2" />
                            REPORTAR VICTORIA
                        </span>
                    )}
                </button>

            </form>

            <ReportSuccessModal isOpen={success} onClose={() => setSuccess(false)} />
        </div>
    );
}
