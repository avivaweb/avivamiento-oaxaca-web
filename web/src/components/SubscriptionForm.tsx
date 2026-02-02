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
                setMessage('¡Victoria! Te has unido a la red de Pasión 2026. Revisa tu correo.')
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
                    className="w-full px-4 py-2 border border-aviva-bone/20 bg-aviva-onyx text-aviva-bone rounded-lg focus:outline-none focus:ring-2 focus:ring-aviva-gold"
                />
                <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Número de WhatsApp (opcional)"
                    className="w-full px-4 py-2 border border-aviva-bone/20 bg-aviva-onyx text-aviva-bone rounded-lg focus:outline-none focus:ring-2 focus:ring-aviva-gold"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-aviva-gold hover:bg-white text-black px-8 py-3 rounded-full transition-all shadow-xl hover:shadow-aviva-gold/20 font-black text-lg min-h-[48px] border border-aviva-bone/10 w-full md:w-auto transform hover:-translate-y-1"
                >
                    {loading ? 'Procesando...' : 'Recibir Visión 2026'}
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
