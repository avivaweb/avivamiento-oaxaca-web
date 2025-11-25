import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaSpotify } from 'react-icons/fa'

export default function Footer() {
    return (
        <>
            <div className="mt-8 text-[var(--aviva-blanco)] text-center">
                <h4 className="text-lg font-semibold mb-2">Horarios:</h4>
                <ul className="text-sm space-y-1 mb-4">
                    <li><strong>Martes:</strong> Reunión de Oración - 6:30 pm</li>
                    <li><strong>Domingos:</strong> Reunión General - 11:00 am</li>
                </ul>
                <p className="text-sm"><strong>Email:</strong> avivamiento.medios@gmail.com</p>
            </div>
            <div className="mt-8 text-[var(--aviva-blanco)] text-center">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://www.facebook.com/AvivamientoElLugarDeSuPresencia/" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="https://www.instagram.com/avivamientooaxaca/" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://www.youtube.com/@AvivamientoOax" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
                        <FaYoutube size={24} />
                    </a>
                    <a href="https://www.tiktok.com/@avivamiento_oaxaca" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
                        <FaTiktok size={24} />
                    </a>
                    <a href="https://whatsapp.com/channel/0029VaQXxVlH5JLuZOYELE2A" target="_blank" rel="noopener noreferrer" className="text-[var(--aviva-blanco)] hover:text-[var(--aviva-dorado)] transition-colors">
                        <FaWhatsapp size={24} />
                    </a>
                </div>
                <div className="flex justify-center space-x-4">
                    <div className="flex flex-col items-center text-[var(--aviva-blanco)] space-y-1">
                        <FaSpotify size={20} />
                        <span>Aviva-Band</span>
                    </div>
                    <div className="flex flex-col items-center text-[var(--aviva-blanco)] space-y-1">
                        <FaSpotify size={20} />
                        <span>Mujeres en Victoria</span>
                    </div>
                    <div className="flex flex-col items-center text-[var(--aviva-blanco)] space-y-1">
                        <FaSpotify size={20} />
                        <span>Sermones Dominicales</span>
                    </div>
                </div>
            </div>
        </>
    )
}
