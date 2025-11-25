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
        </>
    )
}
