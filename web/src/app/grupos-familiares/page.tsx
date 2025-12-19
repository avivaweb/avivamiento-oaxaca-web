'use client'

import { useState } from 'react'
import { z } from 'zod'
import { FaHeart, FaUsers, FaPlaceOfWorship } from 'react-icons/fa'
import { GiShepherdsCrook, GiOpenBook, GiThreeFriends, GiSandsOfTime } from 'react-icons/gi'
import { BiBible } from 'react-icons/bi'

const CellGroupSchema = z.object({
  fullName: z.string().min(5, "Nombre completo requerido"),
  phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
  email: z.string().email("Email inválido"),
  preference: z.enum(['presencial', 'online']),
})

type FormData = z.infer<typeof CellGroupSchema>

export default function CellGroupPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    preference: 'presencial',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // 1. Validate with Zod Client-side
      const validatedData = CellGroupSchema.parse(formData)

      // 2. Submit to our new API route
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle server-side validation errors or generic errors
        if (response.status === 400 && data.details) {
          throw new Error('Verifica los datos ingresados.')
        }
        throw new Error(data.error || 'Error al procesar la solicitud')
      }

      console.log('Form submitted successfully:', data)
      setSuccess(true)
      setFormData({ fullName: '', phone: '', email: '', preference: 'presencial' })

    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.issues.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message
          }
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
    <div className="min-h-screen bg-[var(--aviva-principal)] text-[var(--aviva-blanco)]">

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20 filter blur-sm"></div> {/* Placeholder for background */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--aviva-dorado)] mb-4 tracking-tighter">
            Grupos Familiares
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 italic">
            "Donde la Iglesia se hace familia."
          </p>
        </div>
      </section>

      {/* --- VISION SECTION (Acts 2) --- */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-[var(--aviva-dorado)]">El Objetivo de Nuestros Grupos</h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed text-balance">
            <p>
              El objetivo de nuestros grupos es restaurar el modelo de la Iglesia naciente (<span className="text-white font-semibold">Hechos 2</span>), llevando la presencia de Dios de las grandes celebraciones a la intimidad de tu hogar.
            </p>
            <blockquote className="my-10 p-6 border-l-4 border-[var(--aviva-dorado)] bg-white/5 italic text-2xl text-white font-serif max-w-3xl mx-auto shadow-2xl">
              "La célula es la Iglesia penetrando en las estructuras del mundo"
            </blockquote>
          </div>
        </div>
      </section>

      {/* --- BENEFITS GRID --- */}
      <section className="py-16 px-4 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <GiShepherdsCrook className="w-10 h-10" />,
              title: "Pastoreo",
              desc: "Que nadie camine solo. Recibe la atención y el cuidado que una multitud dificulta."
            },
            {
              icon: <GiOpenBook className="w-10 h-10" />,
              title: "Edificación",
              desc: "Formamos discípulos maduros que conozcan la Palabra y vivan en el poder del Espíritu."
            },
            {
              icon: <FaHeart className="w-10 h-10" />,
              title: "Evangelismo",
              desc: "Ser un faro de luz en cada colonia, facilitando un encuentro personal con Cristo."
            },
            {
              icon: <GiThreeFriends className="w-10 h-10" />,
              title: "Comunión",
              desc: "Amigos que se convierten en hermanos, orando unos por otros en todo tiempo."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all group hover:-translate-y-1">
              <div className="text-[var(--aviva-dorado)] mb-4 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] transition-shadow">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto py-12 px-4">

        {/* --- WHAT YOU WILL FIND --- */}
        <div className="space-y-8">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 h-full">
            <h2 className="text-2xl font-bold text-[var(--aviva-dorado)] mb-2">¿Qué encontrarás aquí?</h2>
            <p className="text-gray-400 mb-6 italic">“Un espacio diseñado para tu transformación.”</p>

            <ul className="space-y-4">
              {[
                { title: "Enseñanza Práctica", desc: "Palabra apostólica aplicada a tus desafíos (familia, finanzas, salud)." },
                { title: "Comunión Real", desc: "Un ambiente seguro donde compartimos la vida." },
                { title: "Adoración y Oración", desc: "Un ambiente cargado de la presencia de Dios donde ocurren milagros." },
                { title: "Descubrimiento de Dones", desc: "Identifica y desarrolla los talentos que Dios te ha dado." }
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="min-w-[8px] h-[8px] mt-2 rounded-full bg-[var(--aviva-dorado)]" />
                  <div>
                    <strong className="block text-white text-lg">{point.title}</strong>
                    <span className="text-gray-400 text-sm">{point.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">🚀 ¡Únete al Ejército Celular!</h3>
              <p className="text-gray-400 text-sm mb-2">
                <strong className="text-[var(--aviva-dorado)]">¿Sabías que...?</strong> La iglesia más grande del mundo nació en las casas. ¡Tú puedes ser parte de este mover en Oaxaca!
              </p>
              <div className="flex gap-2 flex-wrap text-xs text-gray-500 mt-2">
                <span className="bg-white/10 px-3 py-1 rounded-full">📍 Cerca de ti (7 Zonas)</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">👶 Para todas las edades</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- OPTIMIZED FORM --- */}
        <div className="flex items-center">
          <div className="w-full bg-[var(--aviva-blanco)] rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-extrabold text-[var(--aviva-principal)] mb-2 text-center">
                Únete a una Familia
              </h3>
              <p className="text-center text-gray-600 mb-6 font-medium text-balance">
                "Déjanos tus datos y un Pastor de Zona se pondrá en contacto contigo para darte la bienvenida a tu nueva familia."
              </p>

              {success ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 animate-bounce">🎉</div>
                  <h3 className="text-xl font-bold text-[var(--aviva-principal)] mb-2">¡Solicitud Recibida!</h3>
                  <p className="text-gray-600">Tu Pastor de Zona te contactará pronto.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-[var(--aviva-dorado)] font-bold hover:underline"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Nombre Completo</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all text-gray-800 bg-gray-50 ${errors.fullName
                        ? 'border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:ring-yellow-100 focus:border-[var(--aviva-dorado)]'
                        }`}
                      placeholder="Ej. Juan Pérez"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500 font-medium">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all text-gray-800 bg-gray-50 ${errors.phone
                        ? 'border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:ring-yellow-100 focus:border-[var(--aviva-dorado)]'
                        }`}
                      placeholder="10 dígitos"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500 font-medium">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all text-gray-800 bg-gray-50 ${errors.email
                        ? 'border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:ring-yellow-100 focus:border-[var(--aviva-dorado)]'
                        }`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="preference" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Preferencia</label>
                    <select
                      id="preference"
                      name="preference"
                      value={formData.preference}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-[var(--aviva-dorado)] text-gray-800 bg-gray-50"
                    >
                      <option value="presencial">Presencial (En un hogar)</option>
                      <option value="online">Online (Zoom)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--aviva-principal)] text-white py-4 rounded-xl font-bold text-lg min-h-[48px] border border-white/20 hover:bg-opacity-90 active:scale-95 transition-all shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {loading ? 'Enviando...' : 'QUIERO UNIRME AHORA'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}