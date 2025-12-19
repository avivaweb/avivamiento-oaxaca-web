import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className="bg-[var(--aviva-principal)] text-[var(--aviva-blanco)] py-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    {/* Placeholder for small logo/icon if needed, or just text for now to keep it clean given the main logo is on home */}
                    <span className="font-bold text-xl tracking-wider">AVIVAMIENTO</span>
                </Link>
                <nav>
                    <ul className="flex space-x-6 text-sm md:text-base font-medium">
                        <li>
                            <Link href="/" className="hover:text-[var(--aviva-dorado)] transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/nosotros" className="hover:text-[var(--aviva-dorado)] transition-colors">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link href="/grupos-familiares" className="hover:text-[var(--aviva-dorado)] transition-colors">
                                Grupos Familiares
                            </Link>
                        </li>
                        <li>
                            <Link href="/eventos" className="hover:text-[var(--aviva-dorado)] transition-colors">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link href="/sermones" className="hover:text-[var(--aviva-dorado)] transition-colors">
                                Sermones
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
