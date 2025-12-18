'use client'

import { useState } from 'react'

export default function SubscriptionForm() {
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

            if (response.status === 201 || response.status === 200) {
                setMessage('¡Te has unido a nuestro Aviva-News! Revisa tu correo.')
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
        <>
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
                    className="bg-[#A5002F] hover:bg-[#8A0026] text-white px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-[#A5002F]/20 font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto transform hover:-translate-y-0.5"
                >
                    {loading ? 'Suscribiendo...' : 'Avísame cuando lancen'}
                </button>
            </form>
            {message && (
                <p className="mt-4 text-sm text-[var(--aviva-blanco)]">
                    {message}
                </p>
            )}
        </>
    )
}
