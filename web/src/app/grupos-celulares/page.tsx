'use client'

import { useState } from 'react'
import { z } from 'zod'

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
          // Transform Zod-like server errors back to state if possible, 
          // or just use a generic message for now if structure differs.
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
        // Generic error (network, 500, etc) uses a special 'form' key or alert
        alert(error.message) // Simple fallback, or add a general error state
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--aviva-blanco)] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-[var(--aviva-principal)] mb-2 text-center">Únete a un Grupo</h1>
          <p className="text-[var(--aviva-texto)] text-center mb-8">Conecta, crece y comparte la vida en comunidad.</p>

          {success ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-[var(--aviva-principal)] mb-2">¡Gracias por registrarte!</h3>
              <p className="text-[var(--aviva-texto)]">Un líder se pondrá en contacto contigo pronto.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-[var(--aviva-dorado)] font-semibold hover:underline"
              >
                Volver al formulario
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--aviva-texto)] mb-1">Nombre Completo</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.fullName
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-[var(--aviva-dorado)]'
                    } text-[var(--aviva-texto)] bg-white`}
                  placeholder="Tu nombre"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--aviva-texto)] mb-1">Teléfono (WhatsApp)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.phone
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-[var(--aviva-dorado)]'
                    } text-[var(--aviva-texto)] bg-white`}
                  placeholder="10 dígitos"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--aviva-texto)] mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.email
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-[var(--aviva-dorado)]'
                    } text-[var(--aviva-texto)] bg-white`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="preference" className="block text-sm font-medium text-[var(--aviva-texto)] mb-1">Preferencia</label>
                <select
                  id="preference"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--aviva-dorado)] text-[var(--aviva-texto)] bg-white"
                >
                  <option value="presencial">Presencial</option>
                  <option value="online">Online</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--aviva-principal)] text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-opacity disabled:opacity-70 shadow-lg"
              >
                {loading ? 'Enviando...' : 'Quiero Unirme'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}