'use client'

import { useState } from 'react'
import { z } from 'zod'
import { HomeIcon, UserGroupIcon, HeartIcon, SparklesIcon, MapPinIcon } from '@heroicons/react/24/outline'

const CellGroupSchema = z.object({
  fullName: z.string().min(5, "Nombre completo requerido"),
  phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
  email: z.string().email("Email inválido").optional().or(z.literal('')),
  zone: z.string().min(3, "Indica tu colonia o zona de referencia"),
})

type FormData = z.infer<typeof CellGroupSchema>

const ZONES_LIST = [
  'Jalpan', 'Cuilápam', 'Zaachila', 'San Nicolás', 'Cañada', 'Centro/Oaxaca Juárez', 'Etla'
]

export default function CellGroupPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    zone: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const validatedData = CellGroupSchema.parse(formData)

      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validatedData, preference: 'presencial' }), // Defaulting to presencial as per focus
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 400 && data.details) throw new Error('Verifica los datos.')
        throw new Error(data.error || 'Error al procesar')
      }

      setSuccess(true)
      setFormData({ fullName: '', phone: '', email: '', zone: '' })

    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.issues.forEach(err => {
          if (err.path[0]) newErrors[err.path[0] as keyof FormData] = err.message
        })
        setErrors(newErrors)
      } else if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#333333] font-sans selection:bg-[#DAA520] selection:text-white">

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-xs animate-fade-in">
            Ejército Celular
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#333333]">
            Tu lugar en la familia
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            Un Grupo Familiar es una casa que abre sus puertas para manifestar el amor de Dios.
            Es el lugar donde dejamos de ser extraños para convertirnos en familia,
            compartiendo la Palabra y creciendo en nuestro diseño original.
          </p>
        </div>
      </section>

      {/* ZONES DISPLAY (Mobile: List, Desktop: Flex) */}
      <section className="py-8 px-4 bg-white/50 border-y border-[#DAA520]/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-bold text-[#DAA520] uppercase mb-6 tracking-wide">
            Presencia en 7 Territorios
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {ZONES_LIST.map((zone) => (
              <span key={zone} className="flex items-center text-gray-600 text-sm md:text-base font-medium px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <MapPinIcon className="w-4 h-4 text-[#DAA520] mr-2" />
                {zone}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT & FORM SPLIT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 py-16 px-6 items-center">

        {/* Left Column: Values */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="bg-[#DAA520]/10 p-3 rounded-xl text-[#DAA520]">
                <UserGroupIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif mb-2">Comunión</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  No fuimos creados para caminar solos. En casa encontrarás hermanos que celebrarán tus victorias y te sostendrán en las pruebas.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#DAA520]/10 p-3 rounded-xl text-[#DAA520]">
                <HeartIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif mb-2">Cuidado Pastoral</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Una cobertura espiritual cercana. Un padre y una madre espiritual que velarán por tu alma y te impulsarán a tu destino.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#DAA520]/10 p-3 rounded-xl text-[#DAA520]">
                <SparklesIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif mb-2">Crecimiento</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Dejamos de ser niños fluctuantes para madurar. Aquí serás entrenado, procesado y enviado a cumplir tu propósito.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-[#DAA520]/20 relative overflow-hidden">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#DAA520]"></div>

          <h3 className="text-2xl font-bold font-serif text-center mb-2">Únete a una Casa</h3>
          <p className="text-center text-gray-500 text-sm mb-8">
            Compártenos tus datos para conectarte con el líder más cercano.
          </p>

          {success ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-2">
                <HomeIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#DAA520]">¡Victoria!</h3>
              <p className="text-gray-600">
                Un líder de tu zona se pondrá en contacto contigo muy pronto para darte la bienvenida a casa.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-sm text-gray-400 hover:text-[#DAA520] underline mt-4"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/50 transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 dígitos"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/50 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Colonia / Zona</label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  placeholder="Ej. Centro, San Felipe, Xoxo..."
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]/50 transition-all ${errors.zone ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.zone && <p className="text-xs text-red-500 mt-1">{errors.zone}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#DAA520] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-[#DAA520]/30 hover:bg-[#B8860B] transition-all transform active:scale-[0.98] uppercase tracking-wide text-sm"
                >
                  {loading ? 'Procesando...' : 'Quiero unirme a un grupo'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}