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
                            alt="Avivamiento Oaxaca Oficial"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* NAVIGATION: Canon Order */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center space-x-6 text-sm font-light tracking-wide">
                        <li>
                            <Link href="/" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/nosotros" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link href="/grupos-familiares" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Grupos Familiares
                            </Link>
                        </li>
                        <li>
                            <Link href="/mensajes" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Mensajes
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/media" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Media
                            </Link>
                        </li>
                        <li>
                            <Link href="/ministerios" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Ministerios
                            </Link>
                        </li>
                        <li>
                            <Link href="/eventos" className="hover:text-[#DAA520] transition-colors duration-300 uppercase">
                                Eventos
                            </Link>
                        </li>

                        {/* ACCESS: Leadership CTA */}
                        <li>
                            <Link
                                href="/dashboard/ejercito-celular"
                                className="bg-[#DAA520] text-black px-5 py-2 rounded-full font-bold text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(218,165,32,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] uppercase tracking-wider ml-4"
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
