'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/events/CountdownTimer';
import { siteConfig } from '@/config/site';
import { supabase } from '@/lib/supabase';
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Heart,
  Users,
  Sparkles,
  Filter,
  ExternalLink,
  Play,
  Headphones,
} from 'lucide-react';
import { FaWhatsapp, FaGoogle, FaApple } from 'react-icons/fa';

// ══════════════════════════════════════════════════════════
//  TIPOS Y DATOS
// ══════════════════════════════════════════════════════════

interface AgendaEvent {
  id: string;
  title: string;
  subtitle?: string;
  date: string;        // ISO date
  time: string;
  endTime?: string;
  location: string;
  description: string;
  category: 'Congreso' | 'Oración' | 'Social' | 'Kermés' | 'Semanal' | 'Especial';
  price?: string;
  ctaLabel?: string;
  ctaLink?: string;
  editorial: '6-hogar' | '9-propósito' | '3-claridad';
  recurring?: boolean;
  is_hero?: boolean;
}

function mapDbEventToAgendaEvent(dbEvent: any): AgendaEvent {
  const dStart = new Date(dbEvent.date_start);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const year = dStart.getFullYear();
  const month = String(dStart.getMonth() + 1).padStart(2, '0');
  const day = String(dStart.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  return {
    id: dbEvent.id,
    title: dbEvent.title,
    subtitle: dbEvent.subtitle || undefined,
    date: dateStr,
    time: formatTime(dStart),
    endTime: dbEvent.date_end ? formatTime(new Date(dbEvent.date_end)) : undefined,
    location: dbEvent.location,
    description: dbEvent.description || '',
    category: dbEvent.category,
    price: dbEvent.price || undefined,
    ctaLabel: dbEvent.cta_label || undefined,
    ctaLink: dbEvent.cta_link || undefined,
    editorial: dbEvent.editorial || '9-propósito',
    recurring: dbEvent.is_recurring,
    is_hero: dbEvent.is_hero
  };
}

// ══════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════

const getCategoryStyle = (cat: AgendaEvent['category']) => {
  switch (cat) {
    case 'Congreso':    return { bg: 'bg-aviva-red/10', border: 'border-aviva-red/30', text: 'text-aviva-red', dot: 'bg-aviva-red' };
    case 'Oración':     return { bg: 'bg-purple-900/20', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-500' };
    case 'Social':      return { bg: 'bg-aviva-gold/10', border: 'border-aviva-gold/30', text: 'text-aviva-gold', dot: 'bg-aviva-gold' };
    case 'Kermés':      return { bg: 'bg-green-900/20', border: 'border-green-500/30', text: 'text-green-400', dot: 'bg-green-500' };
    case 'Semanal':     return { bg: 'bg-blue-900/20', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' };
    default:            return { bg: 'bg-white/5', border: 'border-white/10', text: 'text-gray-400', dot: 'bg-gray-500' };
  }
};

const getEditorialIcon = (ed: AgendaEvent['editorial']) => {
  switch (ed) {
    case '6-hogar':     return Heart;
    case '9-propósito': return Sparkles;
    case '3-claridad':  return Clock;
  }
};

const formatEventDate = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00');
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('es-MX', { month: 'short' }).replace('.', ''),
    weekday: d.toLocaleDateString('es-MX', { weekday: 'long' }),
    full: d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
};

const getGoogleCalendarLink = (event: AgendaEvent) => {
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  const startDate = event.date.replace(/-/g, '');
  const startTime = event.time.replace(':', '') + '00';
  const endTime = event.endTime ? event.endTime.replace(':', '') + '00' : (parseInt(event.time) + 2).toString().padStart(2, '0') + '0000';
  const dates = `${startDate}T${startTime}/${startDate}T${endTime}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
};

const getICalLink = (event: AgendaEvent) => {
  const startDate = event.date.replace(/-/g, '');
  const startTime = event.time.replace(':', '') + '00';
  const endTime = event.endTime ? event.endTime.replace(':', '') + '00' : (parseInt(event.time) + 2).toString().padStart(2, '0') + '0000';
  const ical = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}T${startTime}
DTEND:${startDate}T${endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ical)}`;
};

type CategoryFilter = 'Todos' | AgendaEvent['category'];

// ══════════════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════

export default function EventosPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('Todos');
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date_start', { ascending: true });

        if (error) throw error;

        if (data) {
          setEvents(data.map(mapDbEventToAgendaEvent));
        }
      } catch (err) {
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const filters: CategoryFilter[] = ['Todos', 'Congreso', 'Oración', 'Social', 'Kermés', 'Semanal', 'Especial'];

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'Todos') return events;
    return events.filter(e => e.category === activeFilter);
  }, [events, activeFilter]);

  const heroEvent = useMemo(() => {
    return events.find(e => e.is_hero) || events[0];
  }, [events]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-aviva-bone flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-aviva-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm uppercase tracking-widest text-aviva-gold">Cargando Agenda de Fuego...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-aviva-bone font-sans selection:bg-aviva-red selection:text-white flex flex-col">

      {/* ═══════════════════════════════════════════════════
          HERO — Próximo Gran Hito
         ═══════════════════════════════════════════════════ */}
      {heroEvent && (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-aviva-wine/20 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(165,0,47,0.15)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(218,165,32,0.08)_0%,transparent_50%)]" />

          {/* Floating particles effect */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-aviva-red/30 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-aviva-gold/20 rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-aviva-red/20 rounded-full animate-pulse delay-1000" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-aviva-red font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs"
            >
              Próximo Gran Hito • {formatEventDate(heroEvent.date).full}
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic"
            >
              {heroEvent.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-aviva-red">{heroEvent.title.split(' ').slice(-1)}</span>
            </motion.h1>

            {heroEvent.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg sm:text-xl text-aviva-bone/60 font-light italic max-w-lg mx-auto leading-relaxed"
              >
                {heroEvent.subtitle}
              </motion.p>
            )}

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <CountdownTimer
                targetDate={`${heroEvent.date}T${heroEvent.time}:00-06:00`}
                label="Cuenta regresiva"
              />
            </motion.div>

            {/* Price badge */}
            {heroEvent.price && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-3"
              >
                <span className="bg-aviva-gold/10 border border-aviva-gold/30 rounded-full px-4 py-1.5 text-aviva-gold text-xs font-bold uppercase tracking-wider">
                  <Ticket size={12} className="inline mr-1.5 -mt-0.5" />
                  {heroEvent.price}
                </span>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {heroEvent.ctaLink && (
                <a
                  href={heroEvent.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-congreso-boleto"
                  className="group relative overflow-hidden bg-aviva-red hover:bg-aviva-red/90 text-white font-black py-4 px-8 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(165,0,47,0.3)] hover:shadow-[0_0_40px_rgba(165,0,47,0.5)] active:scale-[0.98] flex items-center gap-3"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <FaWhatsapp size={18} className="relative z-10" />
                  <span className="relative z-10">{heroEvent.ctaLabel || 'Asegurar mi lugar'}</span>
                </a>
              )}

              <a
                href={getGoogleCalendarLink(heroEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-aviva-bone/50 hover:text-aviva-bone text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors py-3 px-6 border border-white/10 rounded-xl hover:border-white/20"
              >
                <Calendar size={14} />
                <span>Agendar recordatorio</span>
              </a>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-5 h-8 border-2 border-white/10 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-1 h-2 bg-aviva-red/50 rounded-full"
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          GRID DE EVENTOS — Agenda de Fuego
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-3">
              Calendario Operativo
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
              Agenda de <span className="text-aviva-red">Fuego</span>
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            <Filter size={14} className="text-gray-500 mr-1" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeFilter === f
                    ? 'bg-aviva-red text-white shadow-[0_0_15px_rgba(165,0,47,0.3)]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event, idx) => {
              const style = getCategoryStyle(event.category);
              const date = formatEventDate(event.date);
              const EditorialIcon = getEditorialIcon(event.editorial);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] border ${style.border} rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500`}
                >
                  {/* Top bar with category */}
                  <div className={`flex items-center justify-between px-5 py-3 ${style.bg} border-b ${style.border}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${style.text}`}>
                        {event.category}
                        {event.recurring && ' • Semanal'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <EditorialIcon size={12} />
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Date + Content Row */}
                    <div className="flex gap-4">
                      {/* Date block */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase font-bold text-aviva-red leading-none">
                          {date.month}
                        </span>
                        <span className="text-xl font-black text-white leading-none">
                          {date.day}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight mb-1 group-hover:text-aviva-gold transition-colors">
                          {event.title}
                        </h3>
                        {event.subtitle && (
                          <p className="text-aviva-bone/40 text-xs italic mb-2">&ldquo;{event.subtitle}&rdquo;</p>
                        )}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {event.time} hrs
                        {event.endTime && ` — ${event.endTime} hrs`}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {event.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mt-3 border-l-2 border-white/5 pl-3 italic">
                      {event.description}
                    </p>

                    {/* Price badge */}
                    {event.price && (
                      <div className="mt-4 inline-flex items-center gap-1.5 bg-aviva-gold/10 border border-aviva-gold/20 rounded-lg px-3 py-1">
                        <Ticket size={12} className="text-aviva-gold" />
                        <span className="text-aviva-gold text-xs font-bold">{event.price}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {/* Google Calendar */}
                      <a
                        href={getGoogleCalendarLink(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        <FaGoogle size={11} />
                        <span>Google</span>
                      </a>

                      {/* iCal */}
                      <a
                        href={getICalLink(event)}
                        download={`${event.id}.ics`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        <FaApple size={11} />
                        <span>iCal</span>
                      </a>

                      {/* CTA (register / ticket) */}
                      {event.ctaLink && (
                        <a
                          href={event.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-aviva-red hover:bg-aviva-red/80 text-white text-[10px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(165,0,47,0.2)] ml-auto"
                        >
                          <FaWhatsapp size={12} />
                          <span>{event.ctaLabel || 'Registrarme'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/5">
              <Users size={32} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">No hay eventos en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PODCAST — Mujeres en Victoria
         ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(165,0,47,0.05)_0%,transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-aviva-red font-bold tracking-[0.3em] uppercase text-[10px] mb-3">
              Contenido Previo al Congreso
            </p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter italic">
              Podcast <span className="text-aviva-gold">Mujeres en Victoria</span>
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto italic">
              Cada sábado 5:00 PM. Prepara tu espíritu antes del gran día.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-aviva-red/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* YouTube Embed (privacy-enhanced) */}
            <div className="aspect-video w-full relative bg-aviva-onyx">
              {siteConfig.youtube.channelId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=UU${siteConfig.youtube.channelId.substring(2)}&autoplay=0`}
                  title="Mujeres en Victoria — Podcast"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-aviva-red/10 border border-aviva-red/20 flex items-center justify-center">
                    <Play size={32} className="text-aviva-red ml-1" />
                  </div>
                  <p className="text-gray-500 text-sm">YouTube Channel ID no configurado</p>
                </div>
              )}
            </div>

            {/* Podcast Info Bar */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aviva-red/10 border border-aviva-red/20 flex items-center justify-center">
                  <Headphones size={18} className="text-aviva-red" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Mujeres en Victoria</p>
                  <p className="text-gray-500 text-[11px]">Sábados 5:00 PM • En vivo por YouTube</p>
                </div>
              </div>

              <a
                href={`https://www.youtube.com/channel/${siteConfig.youtube.channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-aviva-red/10 border border-aviva-red/20 text-aviva-red text-xs font-bold uppercase tracking-wider hover:bg-aviva-red hover:text-white transition-all"
              >
                <ExternalLink size={12} />
                <span>Ver en YouTube</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          UBICACIÓN
         ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
                Nuestra Casa
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic mb-4">
                Auditorio <span className="text-aviva-gold">Avivamiento</span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
                El lugar donde el cielo toca la tierra. Te esperamos para vivir juntos cada momento de transformación.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin size={16} className="text-aviva-gold shrink-0" />
                  <span>Símbolos Patrios 404, Reforma Agraria, Oaxaca</span>
                </div>
                <a
                  href="https://maps.app.goo.gl/YourMapLinkHere"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-aviva-gold text-xs font-bold uppercase tracking-wider hover:text-aviva-gold-dark transition-colors"
                >
                  <ExternalLink size={12} />
                  Ver en Google Maps
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative h-[300px] md:h-auto min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15264.41724490807!2d-96.726593!3d17.066922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c723f5eb5f3333%3A0x62919a3b2b000000!2sOaxaca%2C%20Oax.!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}