import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaSpotify, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#990000] to-[#800000] text-[#F5F5DC] border-t-4 border-[#DAA520]">
            <div className="container mx-auto px-6 py-16">

                {/* 4-COLUMN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* COL 1: IDENTITY */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            {/* Logo Text / Image - Using text for now based on context */}
                            <span className="font-serif font-bold text-2xl tracking-tight text-white">
                                AVIVAMIENTO <br />
                                <span className="text-[#DAA520] text-lg">O A X A C A</span>
                            </span>
                        </div>
                        <p className="text-sm font-light leading-relaxed text-[#F5F5DC]/90 text-pretty">
                            <strong className="text-[#DAA520] block mb-2 uppercase tracking-widest text-xs">Pasión 2026</strong>
                            Una casa apostólica comprometida con avivar, transformar y reformar nuestra generación. Somos la Nueva Raza.
                        </p>
                    </div>

                    {/* COL 2: CANON NAVIGATION */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-white relative inline-block">
                            Explora
                            <span className="block h-1 w-8 bg-[#DAA520] mt-2 rounded-full"></span>
                        </h4>
                        <nav className="flex flex-col space-y-3 text-sm">
                            <Link href="/" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block">Inicio</Link>
                            <Link href="/nosotros" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block">Nosotros</Link>
                            <Link href="/grupos-familiares" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block">Grupos Familiares</Link>
                            <Link href="/ministerios" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block">Ministerios</Link>
                            <Link href="/mensajes" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block">Mensajes</Link>
                            <Link href="/blog" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block">Blog y Noticias</Link>
                            <Link href="/media" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block">Media Center</Link>
                            <Link href="/eventos" className="hover:text-[#DAA520] transition-colors hover:translate-x-1 duration-300 inline-block text-[#DAA520] font-bold">Calendario Oficial</Link>
                        </nav>
                    </div>

                    {/* COL 3: CONTACT */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-white relative inline-block">
                            Contacto
                            <span className="block h-1 w-8 bg-[#DAA520] mt-2 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#DAA520] mt-1 shrink-0" />
                                <span>
                                    <strong>Auditorio Avivamiento</strong><br />
                                    Símbolos Patrios 404, <br />
                                    Col. Reforma Agraria, Oaxaca.
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#DAA520] shrink-0" />
                                <span>+52 (951) 428-3375</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-[#DAA520] shrink-0" />
                                <a href="mailto:avivamiento.medios@gmail.com" className="hover:text-white transition-colors">
                                    avivamiento.medios@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* COL 4: SOCIAL */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-white relative inline-block">
                            Conecta
                            <span className="block h-1 w-8 bg-[#DAA520] mt-2 rounded-full"></span>
                        </h4>
                        <div className="flex flex-wrap gap-4 mb-6">
                            <a
                                href="https://whatsapp.com/channel/0029VaQXxVlH5JLuZOYELE2A"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all transform hover:-translate-y-1"
                                aria-label="WhatsApp Channel"
                            >
                                <FaWhatsapp size={20} />
                            </a>
                            <a
                                href="https://www.youtube.com/@AvivamientoOax"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-1"
                                aria-label="YouTube Channel"
                            >
                                <FaYoutube size={20} />
                            </a>
                            <a
                                href="https://www.facebook.com/AvivamientoElLugarDeSuPresencia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1"
                                aria-label="Facebook Page"
                            >
                                <FaFacebookF size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/avivamientooaxaca/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all transform hover:-translate-y-1"
                                aria-label="Instagram Profile"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="https://open.spotify.com/show/4Prj1pzkAPNe0Mvk0LKLEo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1DB954] hover:text-white transition-all transform hover:-translate-y-1"
                                aria-label="Spotify Podcast"
                            >
                                <FaSpotify size={20} />
                            </a>
                        </div>
                        <p className="text-xs text-[#F5F5DC]/60 italic font-light">
                            "Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero."
                        </p>
                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="mt-16 pt-8 border-t border-[#F5F5DC]/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#F5F5DC]/60 font-light">
                    <p>© 2026 Avivamiento Oaxaca | Asociación Religiosa. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
                        <a href="/login" className="hover:text-white transition-colors">Acceso Pastoral</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}

