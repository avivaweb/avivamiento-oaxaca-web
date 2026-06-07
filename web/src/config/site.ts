export const siteConfig = {
    name: "Avivamiento Oaxaca",
    slogan: "El tiempo de la canción ha llegado",
    description:
        "Descubre tu propósito original y únete a un movimiento de alto impacto. Activando 1,000 Altares para restaurar la identidad y establecer un legado en Oaxaca.",

    whatsapp: {
        get number() {
            return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
        },
    },
    analytics: {
        get gaId() {
            return process.env.NEXT_PUBLIC_GA_ID || "";
        },
    },
    contact: {
        /** Formatted phone for structured data (JSON-LD / schema.org) */
        get phone() {
            const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
            // 529514283375 → +52-951-428-3375
            if (raw.length === 12) {
                return `+${raw.slice(0, 2)}-${raw.slice(2, 5)}-${raw.slice(5, 8)}-${raw.slice(8)}`;
            }
            return raw;
        },
    },
    youtube: {
        get channelId() {
            return process.env.NEXT_PUBLIC_YOUTUBE_ID || "";
        },
        get apiKey() {
            return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY || "";
        },
    },

    /* ── Social links ─────────────────────────────────────── */
    social: {
        facebook: "https://www.facebook.com/AvivamientoElLugarDeSuPresencia/",
        instagram: "https://www.instagram.com/avivamientooaxaca/",
        youtube: "https://www.youtube.com/@AvivamientoOaxacaOficial",
        tiktok: "https://www.tiktok.com/@avivamiento_oaxaca",
        spotify: {
            avivaBand: "https://open.spotify.com/search/AvivaBand",
            mujeresEnVictoria: "https://open.spotify.com/show/4Prj1pzkAPNe0Mvk0LKLEo",
            sermones: "https://open.spotify.com/search/Avivamiento%20Oaxaca%20Sermones",
        },
    },

    /* ── Address & geo ────────────────────────────────────── */
    address: {
        label: "Sede Principal · San Raymundo Jalpan",
        street: "Carretera Nueva Oaxaca-Zaachila, Privada Rehoboth 101",
        locality: "San Raymundo Jalpan, Oaxaca",
        postalCode: "71280",
        country: "MX",
        lat: 16.9932,
        lng: -96.7795,
        /** Google Maps embed URL (no API key needed for embeds) */
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.1!2d-96.7795!3d16.9932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSan+Raymundo+Jalpan!5e0!3m2!1ses!2smx!4v1700000000000",
    },

    /* ── Schedule ─────────────────────────────────────────── */
    schedule: [
        {
            name: "Reunión General",
            day: "Domingos",
            time: "11:00 AM",
            description: "Celebración de la Vida Zoé",
        },
        {
            name: "Reunión de Oración",
            day: "Martes",
            time: "6:30 PM",
            description: "Intercesión y Activación",
        },
        {
            name: "Escuela de Ministerios",
            day: "Domingos",
            time: "4:00 PM",
            description: "Formación Doctrinal y Liderazgo",
        },
    ],

    /* ── Navigation links ─────────────────────────────────── */
    navLinks: [
        { label: "Historia", href: "/nosotros" },
        { label: "Células", href: "/grupos-familiares" },
        { label: "Eventos", href: "/eventos" },
        { label: "Transmisión", href: "/media" },
    ],
};
