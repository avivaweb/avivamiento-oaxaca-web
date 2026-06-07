import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaSpotify, FaMapMarkerAlt } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

export default function Footer() {
    const { social, address, schedule, navLinks, slogan } = siteConfig;

    return (
        <footer className="bg-aviva-onyx text-aviva-bone border-t border-aviva-gold/20">

            {/* ── Slogan Banner ─────────────────────────── */}
            <div className="w-full py-8 text-center border-b border-white/5">
                <p className="text-2xl md:text-3xl font-serif italic text-aviva-gold tracking-wide opacity-80">
                    &ldquo;{slogan}&rdquo;
                </p>
            </div>

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
                        <p className="text-sm font-light leading-relaxed text-gray-400 text-pretty border-l-2 border-aviva-gold/40 pl-4">
                            <strong className="text-aviva-gold block mb-1 uppercase tracking-widest text-xs font-black">
                                Nuestra Familia
                            </strong>
                            Una comunidad de identidad en Oaxaca dedicada a restaurar el diseño original de cada persona a través de la Vida Zoé.
                        </p>
                    </div>

                    {/* COL 2: LOCATION + MAP */}
                    <div>
                        <h4 className="font-bold text-sm mb-6 text-aviva-gold uppercase tracking-[0.2em]">
                            Ubicación
                        </h4>
                        <div className="space-y-4 text-sm font-light text-gray-400">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-aviva-gold mt-1 shrink-0 text-base" />
                                <span>
                                    <strong className="text-aviva-bone/80">{address.label}</strong><br />
                                    {address.street},<br />
                                    {address.locality}
                                </span>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="rounded-xl overflow-hidden border border-white/10 shadow-gold-subtle mt-4">
                                <iframe
                                    src={address.mapEmbedUrl}
                                    width="100%"
                                    height="160"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Avivamiento Oaxaca — San Raymundo Jalpan"
                                    className="grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>

                            {/* Schedule */}
                            <div className="space-y-2 border-t border-white/5 pt-4 mt-4">
                                {schedule.map((item) => (
                                    <p key={item.name} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-aviva-gold shrink-0" />
                                        <span>
                                            <strong className="text-aviva-bone/70">{item.day} {item.time}</strong>{' '}
                                            <span className="text-gray-500">— {item.description}</span>
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COL 3: STRATEGIC LINKS */}
                    <div>
                        <h4 className="font-bold text-sm mb-6 text-aviva-gold uppercase tracking-[0.2em]">
                            Navegar
                        </h4>
                        <nav className="flex flex-col space-y-3 text-sm text-gray-400" aria-label="Enlaces del footer">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-aviva-gold transition-colors duration-300 flex items-center gap-2 group font-medium text-xs uppercase tracking-widest"
                                >
                                    <span className="w-0 group-hover:w-3 h-px bg-aviva-gold transition-all duration-300" />
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/donar"
                                className="text-aviva-gold hover:text-white transition-colors duration-300 flex items-center gap-2 group font-black text-xs uppercase tracking-widest mt-2"
                            >
                                <span className="w-0 group-hover:w-3 h-px bg-white transition-all duration-300" />
                                DONAR
                            </Link>
                        </nav>
                    </div>

                    {/* COL 4: DIGITAL CONNECTION */}
                    <div>
                        <h4 className="font-bold text-sm mb-6 text-aviva-gold uppercase tracking-[0.2em]">
                            Conexión Digital
                        </h4>

                        {/* Social Icons */}
                        <div className="flex gap-4 mb-8">
                            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-aviva-gold hover:border-aviva-gold/40 transition-all duration-300" aria-label="Facebook">
                                <FaFacebookF size={16} />
                            </a>
                            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-aviva-gold hover:border-aviva-gold/40 transition-all duration-300" aria-label="Instagram">
                                <FaInstagram size={17} />
                            </a>
                            <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-aviva-gold hover:border-aviva-gold/40 transition-all duration-300" aria-label="YouTube">
                                <FaYoutube size={17} />
                            </a>
                            <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-aviva-gold hover:border-aviva-gold/40 transition-all duration-300" aria-label="TikTok">
                                <FaTiktok size={15} />
                            </a>
                        </div>

                        {/* Spotify Section */}
                        <div className="bg-black/60 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-2 mb-3 text-[#1DB954] font-bold text-xs uppercase tracking-widest">
                                <FaSpotify size={16} />
                                <span>Spotify</span>
                            </div>
                            <div className="space-y-1 text-xs">
                                <a href={social.spotify.avivaBand} target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-aviva-bone hover:bg-white/5 p-2 rounded-lg transition-all flex justify-between items-center group">
                                    <span>AvivaBand</span>
                                    <span className="text-aviva-gold opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </a>
                                <a href={social.spotify.mujeresEnVictoria} target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-aviva-bone hover:bg-white/5 p-2 rounded-lg transition-all flex justify-between items-center group">
                                    <span>Mujeres en Victoria</span>
                                    <span className="text-aviva-gold opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </a>
                                <a href={social.spotify.sermones} target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-aviva-bone hover:bg-white/5 p-2 rounded-lg transition-all flex justify-between items-center group">
                                    <span>Mensajes</span>
                                    <span className="text-aviva-gold opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} Avivamiento Oaxaca. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-aviva-gold transition-colors">Privacidad</a>
                        <a href="/login" className="hover:text-aviva-gold transition-colors">Acceso Pastoral</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}
