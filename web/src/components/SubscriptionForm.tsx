'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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
                    className="w-full px-4 py-3 bg-[#111111] border border-[#DAA520]/30 text-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] transition-colors"
                />
                <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Número de WhatsApp (opcional)"
                    className="w-full px-4 py-3 bg-[#111111] border border-[#DAA520]/30 text-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] transition-colors"
                />
                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3 bg-[#DAA520] text-black font-bold uppercase tracking-wider rounded-lg border border-[#DAA520] shadow-[0_0_15px_rgba(218,165,32,0.3)] min-h-[48px] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Procesando...' : 'Recibir Visión 2026'}
                </motion.button>
            </form>
            {message && (
                <p className="mt-4 text-sm text-[var(--aviva-blanco)]">
                    {message}
                </p>
            )}
        </>
    )
}
