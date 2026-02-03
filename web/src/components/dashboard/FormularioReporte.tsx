'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { useState, useRef } from 'react'
import { HiCamera, HiCloudArrowUp, HiCheckCircle, HiXMark, HiArrowPath } from 'react-icons/hi2'

// Esquema de validación alineado a la base de datos
const reportSchema = z.object({
    nombre_altar: z.string().min(3, "El nombre es muy corto"),
    zona: z.enum(["Santa Cruz Xoxocotlán", "Centro Histórico", "San Felipe del Agua", "Jalpan", "Cuilápam", "Zaachila", "San Nicolás", "Cañada", "Norte"]),
    asistencia_total: z.number().min(1, "Debe haber al menos 1 asistente"),
    nuevos_convertidos: z.number().min(0),
    peticiones_oracion: z.number().min(0),
    testimonio_destacado: z.string().min(10, "Cuéntanos un poco más de lo que Dios hizo"),
})

type ReportFormValues = z.infer<typeof reportSchema>

export default function FormularioReporte({ user_id }: { user_id: string }) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setUploadError(null)

        if (file) {
            // Validar tipo
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setUploadError("Solo se permiten imágenes JPG o PNG")
                return
            }
            // Validar tamaño (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError("La imagen debe pesar menos de 5MB")
                return
            }

            setImageFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const uploadImage = async (nombreAltar: string): Promise<string | null> => {
        if (!imageFile) return null

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16) // YYYY-MM-DDTHH-mm
        const cleanAltarName = nombreAltar.replace(/[^a-z0-9]/gi, '_').toLowerCase()
        const filePath = `${user_id}/${timestamp}_${cleanAltarName}.jpg`

        const { data, error } = await supabase.storage
            .from('evidencias_altares')
            .upload(filePath, imageFile, {
                contentType: 'image/jpeg',
                upsert: true
            })

        if (error) {
            console.error('Error uploading image:', error)
            throw new Error("Error al subir la imagen a la nube")
        }

        return data.path
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
        defaultValues: { nuevos_convertidos: 0, peticiones_oracion: 0 }
    })

    const onSubmit = async (data: ReportFormValues) => {
        setLoading(true)
        setUploadError(null)

        try {
            let fotoUrl = null

            if (imageFile) {
                fotoUrl = await uploadImage(data.nombre_altar)
            }

            const { error } = await supabase
                .from('reportes_altar')
                .insert([{
                    ...data,
                    lider_id: user_id,
                    foto_evidencia_url: fotoUrl
                }])

            if (error) throw error

            setSuccess(true)
            reset()
            setImageFile(null)
            setPreviewUrl(null)
            setTimeout(() => setSuccess(false), 5000)
        } catch (error: any) {
            setUploadError(error.message || "Error al sincronizar el reporte")
            console.error("Error subiendo reporte:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-black border border-aviva-gold/20 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-aviva-gold mb-1 uppercase tracking-tighter">Reporte de Altar</h2>
            <p className="text-gray-400 text-sm mb-6 italic">Manifestando la Vida Zoé en las casas</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Nombre del Altar */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-aviva-gold mb-1">Nombre del Altar</label>
                    <input
                        {...register("nombre_altar")}
                        className="w-full bg-aviva-onyx border border-white/10 p-3 rounded-lg text-white focus:border-aviva-gold outline-none transition-all"
                        placeholder="Ej: Altar de Fuego Jalpan"
                    />
                    {errors.nombre_altar && <span className="text-red-500 text-xs">{errors.nombre_altar.message}</span>}
                </div>

                {/* Zona */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-aviva-gold mb-1">Zona Estratégica</label>
                    <select
                        {...register("zona")}
                        className="w-full bg-aviva-onyx border border-white/10 p-3 rounded-lg text-white focus:border-aviva-gold outline-none"
                    >
                        <option value="Santa Cruz Xoxocotlán">Santa Cruz Xoxocotlán</option>
                        <option value="Centro Histórico">Centro Histórico</option>
                        <option value="San Felipe del Agua">San Felipe del Agua</option>
                        <option value="Jalpan">Jalpan</option>
                        <option value="Cuilápam">Cuilápam</option>
                        <option value="Zaachila">Zaachila</option>
                        <option value="San Nicolás">San Nicolás</option>
                        <option value="Cañada">Cañada</option>
                        <option value="Norte">Norte</option>
                    </select>
                </div>

                {/* Métricas en Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Asistencia</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            {...register("asistencia_total", { valueAsNumber: true })}
                            className="w-full bg-aviva-onyx border border-white/10 p-3 rounded-lg text-white"
                        />
                        {errors.asistencia_total && <span className="text-red-500 text-[10px]">{errors.asistencia_total.message}</span>}
                    </div>
                    <div>
                        <label className="block text-xs text-aviva-gold mb-1">Nuevos (Cosecha)</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            {...register("nuevos_convertidos", { valueAsNumber: true })}
                            className="w-full bg-aviva-onyx border border-white/10 p-4 rounded-lg text-white font-black text-xl text-center focus:border-aviva-gold outline-none ring-1 ring-aviva-gold/10"
                        />
                        {errors.nuevos_convertidos && <span className="text-red-500 text-[10px]">{errors.nuevos_convertidos.message}</span>}
                    </div>
                </div>

                {/* Evidencia de la Gloria (Testimonio) */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-aviva-gold mb-1 text-center mt-4">La Palabra del Testimonio</label>
                    <textarea
                        {...register("testimonio_destacado")}
                        rows={3}
                        className="w-full bg-aviva-onyx border border-white/10 p-3 rounded-lg text-white focus:border-aviva-gold outline-none italic"
                        placeholder="Describe milagros, sanidades o restauraciones de hoy..."
                    />
                    {errors.testimonio_destacado && <span className="text-red-500 text-xs">{errors.testimonio_destacado.message}</span>}
                </div>

                {/* Subida de Imagen (Evidencia Visual) */}
                <div className="mt-4">
                    <label className="block text-xs uppercase tracking-widest text-aviva-gold mb-2 text-center">Evidencia de la Gloria (Foto)</label>

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-4 transition-all flex flex-col items-center justify-center min-h-[120px] 
                            ${previewUrl ? 'border-aviva-gold bg-aviva-gold/5' : 'border-white/10 hover:border-aviva-gold/40 bg-aviva-onyx'}`}
                    >
                        {previewUrl ? (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-aviva-gold/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setImageFile(null)
                                        setPreviewUrl(null)
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black text-white transition-colors"
                                >
                                    <HiXMark size={16} />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-1 text-[10px] text-center text-white font-medium">
                                    Click para cambiar imagen
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-aviva-gold/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                    <HiCamera className="text-aviva-gold" size={24} />
                                </div>
                                <span className="text-xs text-gray-400 group-hover:text-aviva-gold transition-colors">Captura o elige una evidencia</span>
                                <span className="text-[10px] text-white/40 mt-1 uppercase tracking-tighter">(Máx 5MB • JPG/PNG)</span>
                            </>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>

                {uploadError && (
                    <div className="p-2 bg-red-900/20 border border-red-500/50 text-red-400 text-[10px] text-center rounded-lg uppercase tracking-wider">
                        {uploadError}
                    </div>
                )}

                <button
                    disabled={loading}
                    className="w-full bg-aviva-gold hover:bg-yellow-600 text-black font-black py-4 rounded-xl transition-all uppercase tracking-widest disabled:opacity-50 flex flex-col items-center justify-center gap-1 group shadow-[0_0_20px_rgba(218,165,32,0.2)]"
                >
                    {loading ? (
                        <>
                            <HiArrowPath className="animate-spin text-black" size={24} />
                            <span className="text-[10px] animate-pulse">Cargando Visión...</span>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <HiCloudArrowUp className="group-hover:translate-y-[-2px] transition-transform" size={20} />
                                <span>Enviar Reporte de Altar</span>
                            </div>
                        </>
                    )}
                </button>

                {success && (
                    <div className="mt-4 p-5 bg-aviva-gold/10 border border-aviva-gold/50 text-aviva-gold text-center rounded-xl flex flex-col items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 shadow-[0_0_15px_rgba(218,165,32,0.1)]">
                        <HiCheckCircle size={28} className="animate-bounce" />
                        <div className="space-y-1">
                            <p className="font-black uppercase tracking-tighter text-sm">¡Victoria registrada!</p>
                            <p className="text-[10px] opacity-80 uppercase tracking-widest leading-tight">Tu reporte ha sido integrado al Mapa de Conquista.</p>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}