'use client';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { HeartIcon, ShieldCheckIcon, GlobeAltIcon, BanknotesIcon } from '@heroicons/react/24/outline';

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-black text-[#ECE7DE] font-sans selection:bg-aviva-gold selection:text-black">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aviva-gold/5 via-transparent to-transparent opacity-50"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                        Cultura de Generosidad
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter uppercase italic">
                        NUESTRA <span className="text-aviva-gold">INVERSIÓN</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-aviva-bone/80 max-w-2xl mx-auto leading-relaxed font-light italic">
                        "Tu generosidad permite que el Altar para la Ciudad siga ardiendo y transformando familias en Oaxaca."
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">

                {/* Why Give Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Alcance Local",
                            desc: "Apoyo a Grupos Familiares en las 7 zonas estratégicas de Oaxaca.",
                            icon: GlobeAltIcon
                        },
                        {
                            title: "Impacto Social",
                            desc: "Programas de ayuda y restauración de identidad en nuestra comunidad.",
                            icon: HeartIcon
                        },
                        {
                            title: "Transparencia",
                            desc: "Gestión administrativa íntegra y reportes de avance de visión.",
                            icon: ShieldCheckIcon
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-aviva-onyx/20 border border-white/5 p-8 rounded-3xl hover:border-aviva-gold/20 transition-all text-center group">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-aviva-gold group-hover:text-black transition-colors">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white uppercase mb-4 tracking-wider">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Donation Methods */}
                <div className="bg-aviva-onyx/40 border border-white/5 backdrop-blur-xl rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <BanknotesIcon className="w-64 h-64 text-aviva-gold" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase italic">
                            Canales de <span className="text-aviva-gold">Ofrenda</span>
                        </h2>

                        <div className="space-y-8">
                            <div className="border-l-2 border-aviva-gold pl-6 py-2">
                                <p className="text-[10px] uppercase font-black tracking-widest text-aviva-gold mb-2">Transferencia Bancaria (México)</p>
                                <div className="space-y-1 font-mono text-sm">
                                    <p className="text-white">Banco: <span className="text-aviva-bone/60">BANCO DEL BAJÍO</span></p>
                                    <p className="text-white">Cuenta: <span className="text-aviva-bone/60 text-lg">0364805820101</span></p>
                                    <p className="text-white">CLABE: <span className="text-aviva-bone/60 text-lg">030610900030584742</span></p>
                                    <p className="text-white">Titular: <span className="text-aviva-bone/60">CENTRO DE CRISTIANDAD AVIVAMIENTO</span></p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <ShieldCheckIcon className="w-5 h-5 text-aviva-gold" />
                                    Donación Segura
                                </h4>
                                <p className="text-sm text-gray-400 font-light leading-relaxed">
                                    Toda aportación es procesada de forma segura. Si requieres un recibo de deducibilidad o tienes dudas sobre tu donación, por favor contáctanos vía WhatsApp.
                                </p>
                                <Link
                                    href="https://wa.me/529514283375"
                                    className="inline-block mt-6 text-aviva-gold font-bold text-xs uppercase tracking-widest hover:underline"
                                >
                                    Contactar Administración →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Quote */}
                <div className="text-center py-12">
                    <p className="text-xl md:text-2xl text-aviva-gold/40 italic font-light">
                        "Cada semilla sembrada es un paso hacia la Reforma de Oaxaca."
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
}
