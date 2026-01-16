import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className="bg-[var(--aviva-principal)] text-[var(--aviva-blanco)] py-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-xl tracking-wider">AVIVAMIENTO</span>
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-6 text-sm md:text-base font-serif">
                        <li>
                            <Link href="/" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/nosotros" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link href="/grupos-familiares" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Grupos Familiares
                            </Link>
                        </li>
                        <li>
                            <Link href="/mensajes" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Mensajes
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/media" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Media
                            </Link>
                        </li>
                        <li>
                            <Link href="/ministerios" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Ministerios
                            </Link>
                        </li>
                        <li>
                            <Link href="/eventos" className="hover:text-[var(--aviva-dorado)] transition-colors duration-300">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard"
                                className="bg-[var(--aviva-dorado)] text-[#000000] px-4 py-2 rounded-md font-sans font-bold hover:bg-[#B8860B] transition-all shadow-lg hover:shadow-[#DAA520]/20"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
