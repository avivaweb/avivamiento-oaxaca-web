"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function FloatingServiceButton() {
    const [isVisible, setIsVisible] = useState(false);
    const phoneNumber = "521234567890"; // Reemplazar con el número real
    const message = `¡Hola, Avivamiento! Necesito ayuda con lo siguiente (escribe el número):

1. NECESITO ORACIÓN (Urgente)
2. Quiero UNIRME a una CÉLULA (Consolidación)
3. HORARIOS y UBICACIÓN (Comunión)
4. Otras preguntas/Ministerios`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        // Mostrar el botón con una pequeña animación de entrada después de montar
        setIsVisible(true);
    }, []);

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Tooltip / Mensaje Inicial */}
            <div className="bg-white text-gray-800 px-4 py-3 rounded-xl shadow-lg mb-2 max-w-[250px] relative border border-gray-100">
                <p className="text-sm font-medium leading-tight">
                    ¡El Espíritu Santo te espera! <br />
                    <span className="text-blue-600">¿En qué te podemos ayudar hoy?</span>
                </p>
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
                {/* Botón de cerrar tooltip (opcional, pero buena UX) */}
            </div>

            {/* Botón Flotante */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center group"
                aria-label="Contactar por WhatsApp"
            >
                <FaWhatsapp className="w-8 h-8 md:w-10 md:h-10" />
                <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat Ministerial
                </span>
            </a>
        </div>
    );
}
