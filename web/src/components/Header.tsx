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
                            <Link href="/" className="hover:text-aviva-gold transition-colors duration-300 uppercase italic font-bold">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/nosotros" className="hover:text-aviva-gold transition-colors duration-300 uppercase italic font-bold">
                                Iglesia
                            </Link>
                        </li>
                        <li>
                            <Link href="/grupos-familiares" className="hover:text-aviva-gold transition-colors duration-300 uppercase italic font-bold">
                                Grupos Familiares
                            </Link>
                        </li>
                        <li>
                            <Link href="/media" className="hover:text-aviva-gold transition-colors duration-300 uppercase italic font-bold">
                                Media
                            </Link>
                        </li>

                        {/* ACCESS: Leadership CTA */}
                        <li>
                            <Link
                                href="/dashboard"
                                className="bg-transparent text-aviva-gold px-6 py-2 rounded-full font-black text-xs hover:bg-aviva-gold hover:text-black transition-all border-2 border-aviva-gold uppercase tracking-widest ml-4 shadow-[0_0_15px_rgba(218,165,32,0.2)] italic"
                            >
                                Ejército Celular
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu Toggle (Simplified placeholder for ensuring structure) */}
                <div className="lg:hidden">
                    <button className="text-[#DAA520]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
