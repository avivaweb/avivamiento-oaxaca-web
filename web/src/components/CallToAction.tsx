import Link from 'next/link'

export default function CallToAction() {
    return (
        <div className="my-8 text-center p-6 bg-aviva-bone/10 rounded-xl backdrop-blur-sm border border-aviva-bone/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-aviva-bone mb-3 uppercase tracking-tighter">
                ESTABLECE UN ALTAR EN TU CASA
            </h2>
            <p className="text-lg text-aviva-gold font-bold mb-6 max-w-2xl mx-auto">
                No es una reunión. Es la manifestación de <span className="text-white">Vida Zoé</span> en tu hogar. <br />
                Únete a los 1,000 Altares Familiares de Pasión 2026.
            </p>
            <Link
                href="/grupos-familiares"
                className="inline-block bg-aviva-gold text-black font-black text-xl py-4 px-12 rounded-full min-h-[48px] border border-aviva-bone/20 hover:bg-white transition-all transform hover:scale-105 shadow-2xl hover:shadow-aviva-gold/40 uppercase tracking-widest"
            >
                Unirse a un Altar
            </Link>
        </div>
    )
}
