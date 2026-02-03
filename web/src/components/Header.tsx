import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className="bg-black text-white py-4 shadow-md sticky top-0 z-50 border-b border-[#DAA520]/30 transition-all duration-300">
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* IDENTITY: Official Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="relative w-[220px] h-[60px]">
                        <Image
                            src="/logo_oficial_horizontal_letrablanca.png"
                            alt="Avivamiento Oaxaca - Pasión 2026: Elevando 1,000 Altares Familiares"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* NAVIGATION: Canon Order */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center space-x-8 text-sm font-medium tracking-wide">
                        <li>
                            <Link href="/" className="p-2 hover:text-aviva-gold transition-colors duration-300 uppercase font-bold text-xs tracking-widest text-white">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/nosotros" className="p-2 hover:text-aviva-gold transition-colors duration-300 uppercase font-bold text-xs tracking-widest">
                                Iglesia
                            </Link>
                        </li>
                        <li>
                            <Link href="/grupos-familiares" className="p-2 hover:text-aviva-gold transition-colors duration-300 uppercase font-bold text-xs tracking-widest">
                                Grupos Familiares
                            </Link>
                        </li>
                        <li>
                            <Link href="/media" className="p-2 hover:text-aviva-gold transition-colors duration-300 uppercase font-bold text-xs tracking-widest italic">
                                Media
                            </Link>
                        </li>

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
                                className="text-aviva-bone/60 hover:text-aviva-gold transition-all text-[10px] font-bold uppercase tracking-[0.3em]"
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
                    <button className="text-aviva-gold p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
