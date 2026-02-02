import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaSpotify, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-aviva-bone border-t-4 border-aviva-gold">
            <div className="container mx-auto px-6 py-16">

                {/* 4-COLUMN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* COL 1: IDENTITY */}
                    <div className="space-y-6">
                        <Link href="/" className="block relative w-48 h-auto">
                            <Image
                                src="/Logo_oficial_blanco.png"
                                alt="Avivamiento Oaxaca Oficial"
                                width={200}
                                height={80}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-sm font-light leading-relaxed text-gray-300 text-pretty border-l-2 border-aviva-gold pl-4">
                            <strong className="text-aviva-gold block mb-1 uppercase tracking-widest text-xs">Pasión 2026</strong>
                            Un mover de Dios llamado a avivar, transformar y reformar nuestra generación.
                        </p>
                    </div>

                    {/* COL 2: LOCATION & SCHEDULE */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-aviva-bone uppercase tracking-wider">
                            Ubicación y Horarios
                        </h4>
                        <div className="space-y-6 text-sm font-light text-gray-300">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-aviva-gold mt-1 shrink-0 text-lg" />
                                <span>
                                    <strong>Sede Principal</strong><br />
                                    Carretera Nueva Oaxaca-Zaachila,<br />
                                    Privada Rehoboth 101, <br />
                                    San Raymundo Jalpan, Oaxaca.
                                </span>
                            </div>
                            <div className="space-y-2 border-t border-gray-800 pt-4">
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-aviva-gold"></span>
                                    <span><strong>Martes 6:30 pm</strong> (Oración)</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-aviva-gold"></span>
                                    <span><strong>Domingos 11:00 am</strong> (Reunión General)</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* COL 3: STRATEGIC LINKS */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-aviva-bone uppercase tracking-wider">
                            Enlaces
                        </h4>
                        <nav className="flex flex-col space-y-3 text-sm text-gray-300">
                            <Link href="/" className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-aviva-gold transition-all"></span> Inicio
                            </Link>
                            <Link href="/nosotros" className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-aviva-gold transition-all"></span> Nosotros
                            </Link>
                            <Link href="/ministerios" className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-aviva-gold transition-all"></span> Ministerios
                            </Link>
                            <Link href="/grupos-familiares" className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-aviva-gold transition-all"></span> Altares Familiares
                            </Link>
                            <Link href="/eventos" className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-aviva-gold transition-all"></span> Eventos
                            </Link>
                            <Link href="/mensajes" className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-aviva-gold transition-all"></span> Mensajes
                            </Link>
                            <Link href="/blog" className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-aviva-gold transition-all"></span> Blog
                            </Link>
                        </nav>
                    </div>

                    {/* COL 4: DIGITAL CONNECTION */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-aviva-bone uppercase tracking-wider">
                            Conexión Digital
                        </h4>

                        {/* Social Icons */}
                        <div className="flex gap-4 mb-8">
                            <a href="https://www.facebook.com/AvivamientoElLugarDeSuPresencia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aviva-gold transition-colors transform hover:scale-110">
                                <FaFacebookF size={22} />
                            </a>
                            <a href="https://www.instagram.com/avivamientooaxaca/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aviva-gold transition-colors transform hover:scale-110">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.youtube.com/@AvivamientoOaxacaOficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aviva-gold transition-colors transform hover:scale-110">
                                <FaYoutube size={24} />
                            </a>
                            <a href="https://www.tiktok.com/@avivamiento_oaxaca" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-aviva-gold transition-colors transform hover:scale-110">
                                <FaTiktok size={22} />
                            </a>
                        </div>

                        {/* Spotify Special Section */}
                        <div className="bg-[#191414] rounded-xl p-4 border border-gray-800">
                            <div className="flex items-center gap-2 mb-3 text-[#1DB954] font-bold text-sm">
                                <FaSpotify size={20} />
                                <span>Spotify Channels</span>
                            </div>
                            <div className="space-y-2 text-xs">
                                <a href="https://open.spotify.com/search/AvivaBand" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-aviva-bone hover:bg-aviva-bone/5 p-2 rounded transition-all flex justify-between items-center group">
                                    <span>1. AvivaBand</span>
                                    <span className="text-aviva-gold opacity-0 group-hover:opacity-100">↗</span>
                                </a>
                                <a href="https://open.spotify.com/show/4Prj1pzkAPNe0Mvk0LKLEo" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-aviva-bone hover:bg-aviva-bone/5 p-2 rounded transition-all flex justify-between items-center group">
                                    <span>2. Mujeres en Victoria</span>
                                    <span className="text-aviva-gold opacity-0 group-hover:opacity-100">↗</span>
                                </a>
                                <a href="https://open.spotify.com/search/Avivamiento%20Oaxaca%20Sermones" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-aviva-bone hover:bg-aviva-bone/5 p-2 rounded transition-all flex justify-between items-center group">
                                    <span>3. Sermones</span>
                                    <span className="text-aviva-gold opacity-0 group-hover:opacity-100">↗</span>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
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
