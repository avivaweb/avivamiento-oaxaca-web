import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Generosidad | Honra al Dueño',
    description: 'La generosidad no es una transacción, es una declaración de señorío. Honra a Adonai con tus bienes.',
}

export default function GenerosityPage() {
    return (
        <div className="min-h-screen bg-[var(--aviva-principal)] text-[var(--aviva-blanco)] font-sans">

            {/* Hero Section */}
            <section className="relative py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--aviva-dorado)_0%,_transparent_20%)] opacity-30 blur-3xl"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="text-[var(--aviva-dorado)] font-bold tracking-[0.2em] uppercase text-sm block mb-4">Mayordomía del Reino</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        HONRA AL DUEÑO <span className="text-[var(--aviva-dorado)]">(ADONAI)</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed text-balance">
                        Tu generosidad no compra favores, desata cielos. <br />
                        Entendemos que no somos dueños, somos administradores de Su riqueza.
                    </p>
                </div>
            </section>

            {/* Concept Section */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-[var(--aviva-dorado)] mb-4">La Ofrenda es Adoración</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            "Honra a Jehová con tus bienes, y con las primicias de todos tus frutos; y serán llenos tus graneros con abundancia." (Proverbios 3:9-10)
                        </p>
                        <p className="text-gray-400 text-sm">
                            Cada vez que damos, declaramos que Él es nuestra Fuente y nuestro Sustento.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide border-l-4 border-[var(--aviva-dorado)] pl-4">
                            ¿Por qué damos?
                        </h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="text-[var(--aviva-dorado)]">✦</span>
                                Para extender el Reino en Oaxaca.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-[var(--aviva-dorado)]">✦</span>
                                Para sostener la casa de adoración.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-[var(--aviva-dorado)]">✦</span>
                                Como un acto de gratitud y obediencia.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Giving Options (Mock) */}
            <section className="py-20 px-6 bg-gradient-to-t from-black to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Presenta tu Ofrenda</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Bank Transfer */}
                        <div className="bg-[var(--aviva-principal)] border border-[var(--aviva-dorado)] p-8 rounded-2xl hover:bg-white/5 transition-all group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏦</div>
                            <h3 className="text-xl font-bold text-white mb-2">Transferencia Bancaria</h3>
                            <p className="text-gray-400 text-sm mb-6">Cuenta oficial de la Iglesia</p>
                            <div className="text-left bg-black/30 p-4 rounded-lg space-y-2 font-mono text-sm text-[var(--aviva-dorado)]">
                                <div className="flex justify-between"><span>Banco:</span> <span className="text-white">Bancomer</span></div>
                                <div className="flex justify-between"><span>CLABE:</span> <span className="text-white">012 345 67890123456 7</span></div>
                                <div className="flex justify-between"><span>Titular:</span> <span className="text-white">Avivamiento AC</span></div>
                            </div>
                        </div>

                        {/* In Person */}
                        <div className="bg-[var(--aviva-principal)] border border-white/20 p-8 rounded-2xl hover:border-[var(--aviva-dorado)] transition-all group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🙌</div>
                            <h3 className="text-xl font-bold text-white mb-2">En Nuestros Servicios</h3>
                            <p className="text-gray-400 text-sm mb-6">Trae tu ofrenda al alfolí durante nuestras reuniones generales.</p>
                            <Link href="/eventos" className="block w-full py-3 rounded-lg bg-white/10 hover:bg-[var(--aviva-dorado)] hover:text-black font-bold transition-all">
                                Ver Horarios de Reunión
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
