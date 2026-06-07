import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Crown, MapPin, Heart, Calendar, Clock, ArrowRight, Flame, Users, BookOpen } from 'lucide-react'
import MediaGallery from '@/components/media/MediaGallery'
import MediaSkeleton from '@/components/media/MediaSkeleton'
import { fetchMessagesFromDB } from '@/lib/mediaFetcher'
import { fetchHomepageMetrics, fetchUpcomingEvents } from '@/lib/homepageFetcher'
import HeroVideo from '@/components/media/HeroVideo'
import SubscriptionForm from '@/components/SubscriptionForm'
import Footer from '@/components/Footer'
import MiraclesSection from '@/components/MiraclesSection'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Avivamiento | Identidad, Propósito y Comunidad en Oaxaca",
  description:
    "Descubre tu diseño original y camina en la plenitud de la Vida Zoé. Únete a una comunidad de identidad y propósito en Oaxaca. Crecimiento personal, transformación y legado.",
  keywords: [
    "Identidad",
    "Propósito de Vida",
    "Comunidad en Oaxaca",
    "Crecimiento Personal",
    "Vida Zoé",
    "Pasión 2026",
    "Transformación",
    "Diseño Original",
    "Avivamiento Oaxaca",
  ],
}

/* ── Helpers ─────────────────────────────────── */
function formatEventDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('es-MX', { month: 'short' }).replace('.', ''),
    weekday: d.toLocaleDateString('es-MX', { weekday: 'long' }),
    full: d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

const CATEGORY_STYLES: Record<string, { border: string; text: string; bg: string }> = {
  Congreso:  { border: 'border-aviva-red/30',   text: 'text-aviva-red',   bg: 'bg-aviva-red/10'   },
  Oración:   { border: 'border-purple-500/30',  text: 'text-purple-400',  bg: 'bg-purple-900/20'  },
  Social:    { border: 'border-aviva-gold/30',  text: 'text-aviva-gold',  bg: 'bg-aviva-gold/10'  },
  Kermés:    { border: 'border-green-500/30',   text: 'text-green-400',   bg: 'bg-green-900/20'   },
  Semanal:   { border: 'border-blue-500/30',    text: 'text-blue-400',    bg: 'bg-blue-900/20'    },
  Especial:  { border: 'border-aviva-gold/30',  text: 'text-aviva-gold',  bg: 'bg-aviva-gold/10'  },
}

/* ── Metric icon map ─────────────────────────── */
const METRIC_ICONS = { Crown, MapPin, Heart, BookOpen, Users }

export default async function Home() {
  // Fetch en paralelo: mensajes, métricas y eventos
  const [messages, metrics, upcomingEvents] = await Promise.all([
    fetchMessagesFromDB(),
    fetchHomepageMetrics(),
    fetchUpcomingEvents(3),
  ])

  const latestMessage = messages[0]

  // Métricas dinámicas
  const metricCards = [
    {
      icon: Crown,
      value: `${metrics.yearsOfGlory}`,
      label: "Años de Gloria",
      description: "Un legado continuo edificando identidad y propósito en Oaxaca.",
    },
    {
      icon: MapPin,
      value: `${metrics.zonesCount}`,
      label: "Zonas de Conquista",
      description: "Alcance territorial en los Valles Centrales de Oaxaca.",
    },
    {
      icon: Users,
      value: metrics.activeGroupsCount > 0 ? `${metrics.activeGroupsCount}+` : "Miles",
      label: metrics.activeGroupsCount > 0 ? "Células Activas" : "de Vidas Transformadas",
      description:
        metrics.activeGroupsCount > 0
          ? "Grupos familiares activos en los Valles Centrales."
          : "Familias restauradas, identidades despertadas, propósitos activados.",
    },
  ]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-aviva-bone">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO — "La Epifanía"
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
        aria-label="Hero — Tu diseño original te está esperando"
      >
        {/* Background Image */}
        <Image
          src="/hero_ene.png"
          alt="Avivamiento — Legado y Transformación en Oaxaca"
          fill
          priority
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4="
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl w-full px-6 mx-auto flex flex-col items-center">
          {/* Logo */}
          <Image
            src="/logo-aviva.png"
            alt="Logo Avivamiento"
            width={180}
            height={180}
            priority
            className="mx-auto mb-10 h-auto drop-shadow-2xl animate-float"
          />

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-gradient-gold mb-6 tracking-tight leading-[1.05] uppercase">
            Tu diseño original<br />te está esperando
          </h1>

          <p className="text-lg md:text-2xl text-aviva-bone/90 font-light leading-relaxed max-w-2xl mx-auto mb-4 text-balance">
            No es una religión; es el despertar a tu verdadera identidad en Cristo. La Obra Terminada ya es una realidad consumada en tu vida.
          </p>
          <p className="text-base md:text-lg text-aviva-bone/50 font-light mb-10 max-w-xl mx-auto">
            Despierta a la plenitud de la <strong className="text-aviva-gold font-semibold">Vida Zoé</strong> y manifiesta tu propósito eterno.
          </p>

          {/* CTA */}
          <Link
            href={`https://wa.me/${siteConfig.whatsapp.number}?text=Hola,%20quiero%20descubrir%20mi%20propósito`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aviva-red inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest animate-pulse-gold"
            id="hero-cta"
          >
            <Flame className="w-5 h-5" />
            Descubre tu Propósito
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.3em] text-aviva-bone">Descubre más</span>
          <div className="w-px h-8 bg-gradient-to-b from-aviva-gold to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: EL ALTAR — Métricas Dinámicas
      ═══════════════════════════════════════════════════════ */}
      <section
        className="w-full max-w-6xl mx-auto px-6 py-24 md:py-32"
        aria-label="El Altar — Métricas de impacto"
      >
        <div className="text-center mb-16">
          <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-60">
            El Altar
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Un Legado de <span className="text-gradient-gold">Impacto</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metricCards.map((metric) => {
            const Icon = metric.icon
            return (
              <article
                key={metric.label}
                className="group relative glass-light rounded-2xl p-8 md:p-10 text-center hover:border-aviva-gold/30 transition-all duration-500 hover:-translate-y-1 shadow-gold-subtle"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center group-hover:shadow-gold transition-all duration-500">
                  <Icon className="w-6 h-6 text-aviva-gold" />
                </div>
                <p className="text-5xl md:text-6xl font-black text-gradient-gold mb-2 tracking-tight">
                  {metric.value}
                </p>
                <p className="text-sm font-black text-aviva-bone uppercase tracking-widest mb-4">
                  {metric.label}
                </p>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {metric.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div className="divider-gold w-full max-w-md mx-auto" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: AGENDA DE FUEGO — Eventos dinámicos
      ═══════════════════════════════════════════════════════ */}
      <section
        className="w-full max-w-6xl mx-auto px-6 py-24 md:py-32"
        aria-label="Agenda de Fuego — Próximos encuentros"
      >
        <div className="text-center mb-16">
          <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-60">
            Agenda de Fuego
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            Próximos <span className="text-gradient-gold">Encuentros</span>
          </h2>
        </div>

        {upcomingEvents.length > 0 ? (
          /* Bento Grid — Dinámico */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Card Principal — primer evento próximo */}
            {(() => {
              const heroEvent = upcomingEvents[0]
              const style = CATEGORY_STYLES[heroEvent.category] ?? CATEGORY_STYLES.Especial
              const date = formatEventDate(heroEvent.date_start)
              return (
                <article className="lg:col-span-3 relative overflow-hidden rounded-2xl glass-light group hover:border-aviva-red/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-aviva-red/10 via-transparent to-aviva-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative p-8 md:p-12">
                    {/* Badge */}
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${style.bg} border ${style.border} ${style.text} text-[10px] font-black uppercase tracking-widest mb-6`}>
                      <Flame className="w-3 h-3" />
                      {heroEvent.category}
                    </span>

                    <h3 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight uppercase">
                      {heroEvent.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="text-gradient-gold">{heroEvent.title.split(' ').slice(-1)}</span>
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-aviva-gold" />
                        {date.full}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-aviva-gold" />
                        {heroEvent.location}
                      </span>
                    </div>

                    {heroEvent.description && (
                      <p className="text-gray-400 font-light leading-relaxed max-w-lg mb-8">
                        {heroEvent.description}
                      </p>
                    )}

                    <Link
                      href={heroEvent.cta_link ?? `/eventos`}
                      target={heroEvent.cta_link ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="btn-aviva-red inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest"
                      id="agenda-hero-cta"
                    >
                      {heroEvent.cta_label ?? 'Ver más'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              )
            })()}

            {/* Cards secundarias */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Reunión Dominical — siempre presente */}
              <div className="flex-1 rounded-2xl glass-light p-8 group hover:border-aviva-gold/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-aviva-gold" />
                  </div>
                  <span className="text-[10px] text-aviva-gold font-black uppercase tracking-[0.3em]">
                    {siteConfig.schedule[0].day}
                  </span>
                </div>
                <p className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                  {siteConfig.schedule[0].time}
                </p>
                <p className="text-sm text-gray-400 font-light">
                  {siteConfig.schedule[0].description} —{' '}
                  <strong className="text-aviva-gold">Un encuentro con tu diseño original.</strong>
                </p>
              </div>

              {/* Reunión de Oración — siempre presente */}
              <div className="flex-1 rounded-2xl glass-light p-8 group hover:border-aviva-gold/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-aviva-gold" />
                  </div>
                  <span className="text-[10px] text-aviva-gold font-black uppercase tracking-[0.3em]">
                    {siteConfig.schedule[1].day}
                  </span>
                </div>
                <p className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                  {siteConfig.schedule[1].time}
                </p>
                <p className="text-sm text-gray-400 font-light">
                  {siteConfig.schedule[1].description} — Conecta con lo eterno.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Estado vacío: no hay próximos eventos */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reunión Dominical */}
            <div className="rounded-2xl glass-light p-10 group hover:border-aviva-gold/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-aviva-gold" />
                </div>
                <span className="text-[10px] text-aviva-gold font-black uppercase tracking-[0.3em]">
                  {siteConfig.schedule[0].day}
                </span>
              </div>
              <p className="text-4xl font-black text-white tracking-tight mb-3">
                {siteConfig.schedule[0].time}
              </p>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {siteConfig.schedule[0].description} —{' '}
                <strong className="text-aviva-gold">Un encuentro con tu diseño original.</strong>
              </p>
            </div>

            {/* Reunión de Oración */}
            <div className="rounded-2xl glass-light p-10 group hover:border-aviva-gold/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-aviva-gold" />
                </div>
                <span className="text-[10px] text-aviva-gold font-black uppercase tracking-[0.3em]">
                  {siteConfig.schedule[1].day}
                </span>
              </div>
              <p className="text-4xl font-black text-white tracking-tight mb-3">
                {siteConfig.schedule[1].time}
              </p>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {siteConfig.schedule[1].description} — Conecta con lo eterno.
              </p>
            </div>
          </div>
        )}

        {/* Ver todos los eventos */}
        <div className="text-center mt-10">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-aviva-gold/60 hover:text-aviva-gold text-xs font-bold uppercase tracking-widest transition-colors"
            id="ver-agenda-link"
          >
            Ver agenda completa
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: MAPA DE CÉLULAS — Banner CTA
      ═══════════════════════════════════════════════════════ */}
      <section
        className="w-full relative overflow-hidden py-24 md:py-32"
        aria-label="Mapa de Células — Encuentra tu comunidad local"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-aviva-wine/20 via-black to-aviva-wine/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.06)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center shadow-gold">
            <Users className="w-7 h-7 text-aviva-gold" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase mb-6">
            Hay una mesa servida<br />
            <span className="text-gradient-gold">cerca de ti</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Nuestras células familiares son hogares de gracia, pertenencia y restauración. Un espacio para caminar en comunidad, honrar tu diseño original y manifestar Su gloria en cada rincón de Oaxaca.
          </p>

          <Link
            href="/grupos-familiares"
            className="inline-flex items-center gap-3 px-10 py-5 bg-aviva-gold text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white hover:shadow-gold-lg transition-all duration-500"
            id="celulas-cta"
          >
            Encontrar mi Célula
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div className="divider-gold w-full max-w-md mx-auto" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: ARCHIVO DE REVELACIÓN — Último Mensaje
      ═══════════════════════════════════════════════════════ */}
      {latestMessage && (
        <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32" aria-label="Último mensaje">
          <div className="text-center mb-12">
            <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-60">
              Instrucción Actual
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Archivo de <span className="text-gradient-gold">Revelación</span>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-gold-subtle border border-white/5 hover:border-aviva-gold/20 transition-colors duration-500">
            <HeroVideo video={latestMessage} />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: MEDIA GALLERY
      ═══════════════════════════════════════════════════════ */}
      <Suspense fallback={<MediaSkeleton />}>
        <MediaGallery limit={3} />
      </Suspense>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: MURO DE MILAGROS
      ═══════════════════════════════════════════════════════ */}
      <MiraclesSection />

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: QUOTE BREAK — Culture Statement
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full py-20 md:py-28 px-6" aria-label="Declaración de identidad">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl text-aviva-bone/90 font-light leading-snug tracking-tight">
            No somos una audiencia. <br className="hidden md:block" />
            <strong className="text-gradient-gold font-black uppercase">
              Somos una cultura de diseño.
            </strong>{' '}
            <br />
            <span className="text-aviva-bone/50">
              Activamos la revelación de la Obra Terminada para transformar la realidad de nuestro Metrón.
            </span>
          </p>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div className="divider-gold w-full max-w-md mx-auto" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 9: SUBSCRIPTION CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full max-w-lg mx-auto px-6 py-20 md:py-24 text-center" aria-label="Suscripción">
        <h3 className="text-lg font-bold text-aviva-bone mb-2">Mantente conectado</h3>
        <p className="text-sm text-gray-500 mb-6">Recibe visión, agenda de encuentros y material de activación.</p>
        <SubscriptionForm />
      </section>

      {/* FOOTER */}
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  )
}
