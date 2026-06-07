import { Metadata } from 'next';
import Link from 'next/link';
import { Flame, Users, Church, MapPin, Heart } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '@/config/site';
import Footer from '@/components/Footer';
import TimelineWrapper from '@/components/nosotros/TimelineWrapper';

export const metadata: Metadata = {
  title: 'Nuestra Historia | Avivamiento Oaxaca',
  description:
    'Conoce el trayecto profético de Avivamiento Oaxaca. Desde el Diseño Original en 2015 hasta Pasión 2026: una historia de obediencia, territorio y Vida Zoé.',
  openGraph: {
    title: 'Nuestra Historia | Avivamiento Oaxaca',
    description:
      'Conoce el trayecto profético de Avivamiento Oaxaca. Desde el Diseño Original en 2015 hasta Pasión 2026.',
  },
};

/* ═══════════════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════════════ */
const STATS = [
  { label: 'Años de Fidelidad', value: '11+', icon: Flame },
  { label: 'Grupos Familiares', value: '40+', icon: Users },
  { label: 'Zonas Territoriales', value: '7', icon: MapPin },
  { label: 'Familias Impactadas', value: '500+', icon: Heart },
];

/* ═══════════════════════════════════════════════════════════
   VALUES
   ═══════════════════════════════════════════════════════════ */
const VALUES = [
  {
    title: 'Identidad',
    copy: 'Creemos que cada persona fue diseñada con un propósito eterno. No estás aquí por accidente: fuiste trazado por el Arquitecto del universo.',
  },
  {
    title: 'Comunidad',
    copy: 'La Vida Zoé se multiplica en comunión. Cada Grupo Familiar es un laboratorio donde la restauración se hace práctica, tangible y generacional.',
  },
  {
    title: 'Territorio',
    copy: 'Oaxaca no es solo nuestro domicilio — es nuestra asignación. Cada Altar encendido es un acto de reforma territorial.',
  },
  {
    title: 'Excelencia',
    copy: 'Servimos con estándar de Reino. La mediocridad no es compatible con el diseño original. Todo lo que hacemos refleja quién nos envió.',
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-black text-aviva-bone flex flex-col">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-aviva-gold/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aviva-gold/30 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <span className="text-aviva-gold font-black tracking-[0.5em] text-[10px] uppercase mb-8 block">
            Cantares 2:11‑13
          </span>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
            <span className="bg-gradient-to-r from-aviva-gold to-aviva-red bg-clip-text text-transparent">
              Nuestra
            </span>
            <br />
            <span className="text-white">Historia</span>
          </h1>

          <p className="text-xl md:text-2xl text-aviva-bone/70 max-w-2xl mx-auto leading-relaxed font-light italic">
            &ldquo;El tiempo de la canción ha llegado. Las flores han aparecido en la tierra y la voz de la tórtola se ha oído.&rdquo;
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STATS RIBBON
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full border-y border-white/5 bg-aviva-onyx/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center group animate-fade-in">
              <stat.icon className="w-6 h-6 text-aviva-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-aviva-bone/50 font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          INTRO PARAGRAPH
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div>
          <Church className="w-10 h-10 text-aviva-gold/40 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-aviva-bone/80 leading-relaxed font-light animate-fade-in">
            Avivamiento no nació de un programa religioso. Nació de un <strong className="text-aviva-gold font-bold">Diseño Eterno</strong>: restaurar la identidad
            original del ser humano y establecer un legado generacional que transforme Oaxaca.
            Cada año ha sido un paso profético hacia la manifestación plena de la{' '}
            <strong className="text-white font-bold italic">Vida Zoé</strong>.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TIMELINE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-20">
          <span className="text-aviva-gold font-black tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-70">
            Trayecto Profético
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
            Línea del <span className="text-aviva-gold">Tiempo</span>
          </h2>
        </div>

        {/* Client Component for Framer Motion logic */}
        <TimelineWrapper />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VALUES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full bg-gradient-to-b from-black via-aviva-onyx/20 to-black py-32 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-aviva-gold font-black tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-70">
              ADN de Avivamiento
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
              Nuestros <span className="text-aviva-gold">Valores</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="bg-aviva-onyx/30 border border-white/5 rounded-3xl p-10 hover:border-aviva-gold/20 transition-all duration-500 group animate-fade-in"
              >
                <h3 className="text-2xl font-black text-aviva-gold uppercase tracking-tighter italic mb-4 group-hover:tracking-tight transition-all">
                  {val.title}
                </h3>
                <p className="text-aviva-bone/70 leading-relaxed font-light text-sm">{val.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          QUOTE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <blockquote className="text-2xl md:text-4xl text-aviva-bone/30 italic font-light leading-snug animate-fade-in">
          &ldquo;No somos una organización religiosa.{' '}
          <span className="text-aviva-gold/50">Somos el resultado de un Diseño Eterno activado en Oaxaca.</span>&rdquo;
        </blockquote>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA — CONTACT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full max-w-4xl mx-auto px-6 pb-32">
        <div className="relative bg-gradient-to-br from-aviva-onyx/60 to-black border border-aviva-gold/20 rounded-[40px] p-12 md:p-16 text-center overflow-hidden animate-fade-in">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-aviva-gold/5 blur-3xl pointer-events-none" />

          <span className="text-aviva-gold font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">
            Siguiente Paso
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6">
            Comienza tu <span className="text-aviva-gold">Historia</span>
          </h2>
          <p className="text-aviva-bone/60 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            El invierno terminó. Si algo resonó en tu espíritu mientras leías, es porque el Diseño Original ya se está activando en ti. Da el primer paso.
          </p>

          <Link
            href={`https://wa.me/${siteConfig.whatsapp.number}?text=Hola%2C%20quiero%20conocer%20m%C3%A1s%20de%20Avivamiento%20Oaxaca.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-aviva-gold text-black font-black uppercase tracking-wider text-sm px-10 py-4 rounded-full hover:bg-aviva-gold-dark hover:shadow-[0_0_40px_rgba(218,165,32,0.4)] transition-all duration-300 group"
          >
            <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Escríbenos por WhatsApp
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}