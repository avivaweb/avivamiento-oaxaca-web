'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaSpotify } from 'react-icons/fa'

export default function Home() {
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, whatsapp_number: whatsapp }),
      })

      const data = await response.json()

      if (response.status === 201 || response.status === 200) {
        setMessage('¡Gracias! Tu hogar de fe te espera.')
        setEmail('')
        setWhatsapp('')
      } else if (response.status === 409) {
        setMessage('¡Ya estás suscrito!')
      } else {
        setMessage('Error al suscribirse')
      }
    } catch (error) {
      setMessage('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] flex items-center justify-center">
      <div className="text-center max-w-xl w-full px-4 mx-auto">
        <Image
          src="/logo-aviva.png"
          alt="Logo Avivamiento"
          width={200}
          height={200}
          priority
          className="mx-auto mb-4 h-auto"
        />
        <h1 className="text-4xl font-bold text-[var(--aviva-blanco)] mb-4">Avivamiento: El Lugar de Su Presencia</h1>
        <h2 className="text-2xl font-semibold text-[var(--aviva-blanco)] mb-4">Descubre tu lugar para conectar, crecer y encontrar comunidad.</h2>
        <h3 className="text-xl font-semibold text-[var(--aviva-blanco)] mb-6">Únete a nuestra comunidad y recibe inspiración, contenido exclusivo y acceso a eventos especiales.</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
            required
            className="w-full px-4 py-2 border border-[var(--aviva-blanco)] bg-[var(--aviva-blanco)] text-[var(--aviva-texto)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--aviva-dorado)]"
          />
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Número de WhatsApp (opcional)"
            className="w-full px-4 py-2 border border-[var(--aviva-blanco)] bg-[var(--aviva-blanco)] text-[var(--aviva-texto)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--aviva-dorado)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--aviva-blanco)] text-[var(--aviva-principal)] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Suscribiendo...' : 'Avísame cuando lancen'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-[var(--aviva-blanco)]">
            {message}
          </p>
        )}
        <div className="mt-8 text-[var(--aviva-blanco)] text-center">
          <h4 className="text-lg font-semibold mb-2">Horarios:</h4>
          <ul className="text-sm space-y-1 mb-4">
            <li><strong>Martes:</strong> Reunión de Oración - 6:30 pm</li>
            <li><strong>Domingos:</strong> Reunión General - 11:00 am</li>
          </ul>
          <p className="text-sm"><strong>Email:</strong> avivamiento.medios@gmail.com</p>
        </div>
        <div className="mt-8 text-[var(--aviva-blanco)] text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://www.facebook.com/AvivamientoElLugarDeSuPresencia/" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.instagram.com/avivamientooaxaca/" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.youtube.com/@AvivamientoOax" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
              <FaYoutube size={24} />
            </a>
            <a href="https://www.tiktok.com/@avivamiento_oaxaca" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
              <FaTiktok size={24} />
            </a>
            <a href="https://whatsapp.com/channel/0029VaQXxVlH5JLuZOYELE2A" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
              <FaWhatsapp size={24} />
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            <div className="flex flex-col items-center text-[var(--aviva-blanco)] space-y-1">
              <FaSpotify size={20} />
              <span>Aviva-Band</span>
            </div>
            <div className="flex flex-col items-center text-[var(--aviva-blanco)] space-y-1">
              <FaSpotify size={20} />
              <span>Mujeres en Victoria</span>
            </div>
            <div className="flex flex-col items-center text-[var(--aviva-blanco)] space-y-1">
              <FaSpotify size={20} />
              <span>Sermones Dominicales</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
