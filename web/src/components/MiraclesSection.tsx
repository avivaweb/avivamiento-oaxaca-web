"use client";

import Link from "next/link";

const videos = [
    {
        id: "nyMOjLCmYnE",
        title: "Testimonio Dolor de Cintura",
    },
    {
        id: "8RNNkLxeSI8",
        title: "Testimonio Liberación",
    },
    {
        id: "gBv0_wjkhAw",
        title: "Testimonio Dolor de Espalda",
    },
];

export default function MiraclesSection() {
    return (
        <section className="w-full py-16 px-4 bg-gradient-to-b from-black/20 to-transparent">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--aviva-dorado)] mb-4 uppercase tracking-tight">
                        ¡Lo que Dios está haciendo hoy!
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--aviva-blanco)] font-light max-w-2xl mx-auto">
                        Testimonios de Sanidad y Libertad que alimentarán tu Fe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="aspect-[9/16] w-full max-w-[320px] mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-[var(--aviva-dorado)]/30 hover:border-[var(--aviva-dorado)] transition-colors duration-300 relative group"
                        >
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/mensajes"
                        className="inline-block bg-[var(--aviva-dorado)] text-[var(--aviva-principal)] font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        Ver más testimonios y adoración
                    </Link>
                </div>
            </div>
        </section>
    );
}
