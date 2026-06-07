"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { Menu, X } from 'lucide-react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-black/60 backdrop-blur-md text-white py-4 sticky top-0 z-50 border-b border-aviva-gold/20 transition-all duration-300">
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* IDENTITY: Official Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="relative w-[200px] h-[52px]">
                        <Image
                            src="/logo_oficial_horizontal_letrablanca.png"
                            alt="Avivamiento Oaxaca — Pasión 2026"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* NAVIGATION: Config-driven links */}
                <nav className="hidden lg:block" aria-label="Navegación principal">
                    <ul className="flex items-center space-x-8 text-sm font-medium tracking-wide">
                        {siteConfig.navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="p-2 text-aviva-bone/80 hover:text-aviva-gold transition-colors duration-300 uppercase font-bold text-xs tracking-widest"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        {/* GENEROSIDAD: Donar Button */}
                        <li className="ml-4">
                            <Link
                                href="/donar"
                                className="bg-aviva-gold text-black px-6 py-2 rounded-full font-black text-xs hover:bg-white transition-all shadow-[0_4px_15px_rgba(218,165,32,0.4)] uppercase tracking-widest block"
                            >
                                DONAR
                            </Link>
                        </li>

                        {/* ACCESS: Leadership CTA */}
                        <li className="ml-6 border-l border-white/10 pl-6">
                            <Link
                                href="/dashboard"
                                className="text-aviva-bone/40 hover:text-aviva-gold transition-all text-[10px] font-bold uppercase tracking-[0.3em]"
                            >
                                Acceso Líderes
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <Link
                        href="/donar"
                        className="bg-aviva-gold text-black px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg"
                    >
                        DONAR
                    </Link>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-aviva-gold p-2 hover:opacity-80 transition-opacity" 
                        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Drawer Panel */}
            <div 
                className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-aviva-onyx border-l border-aviva-gold/20 p-6 flex flex-col gap-8 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-aviva-gold">Navegar</span>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-aviva-gold hover:opacity-80 transition-opacity"
                        aria-label="Cerrar menú"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-6" aria-label="Navegación móvil">
                    <ul className="flex flex-col gap-6">
                        {siteConfig.navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-aviva-bone/80 hover:text-aviva-gold transition-colors duration-300 block py-2 text-sm font-bold uppercase tracking-widest"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto flex flex-col gap-4 border-t border-white/5 pt-6">
                    <Link
                        href="/donar"
                        onClick={() => setIsOpen(false)}
                        className="bg-aviva-gold text-black text-center py-3 rounded-full font-black text-xs hover:bg-white transition-all shadow-[0_4px_15px_rgba(218,165,32,0.3)] uppercase tracking-widest block"
                    >
                        DONAR
                    </Link>
                    <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-center text-aviva-bone/40 hover:text-aviva-gold transition-all text-[10px] font-bold uppercase tracking-[0.3em] py-2"
                    >
                        Acceso Líderes
                    </Link>
                </div>
            </div>
        </header>
    )
}
