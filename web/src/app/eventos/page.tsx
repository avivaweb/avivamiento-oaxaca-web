'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import { FaGoogle, FaWhatsapp } from 'react-icons/fa';

// Event Type Definition
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Congreso' | 'Vigilia' | 'Academia' | 'Evento de Zona';
  registerLink?: string;
  mapLink?: string;
}

// Mock Data (Operational Calendar)
const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Congreso Pasión 2026',
    date: '2026-03-20',
    time: '18:00 hrs',
    location: 'Auditorio Avivamiento',
    description: 'Tres días de impartición, adoración y palabra profética para activar el diseño de Dios en tu vida.',
    category: 'Congreso',
    registerLink: 'https://wa.me/529514283375?text=Deseo%20registrarme%20al%20Congreso%20Pasi%C3%B3n%202026'
  },
  {
    id: '2',
    title: 'Vigilia de Rompimiento',
    date: '2026-02-15',
    time: '21:00 hrs',
    location: 'Sede Central',
    description: 'Una noche para buscar el rostro de Dios y clamar por nuestra ciudad. "El Altar que nunca se apaga".',
    category: 'Vigilia'
  },
  {
    id: '3',
    title: 'Inicio de Academia de Reformadores',
    date: '2026-02-05',
    time: '19:00 hrs',
    location: 'Aulas Avivamiento / Online',
    description: 'Formación teológica y ministerial para líderes. Inscríbete al nuevo ciclo.',
    category: 'Academia',
    registerLink: 'https://wa.me/529514283375?text=Informaci%C3%B3n%20Academia%20de%20Reformadores'
  }
];

// Helper: Generate Google Calendar Link
const getGoogleCalendarLink = (event: Event) => {
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  // Simple mock timestamps (real impl needs proper date parsing)
  const dates = `${event.date.replace(/-/g, '')}T180000/${event.date.replace(/-/g, '')}T210000`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
};

// Helper: Get Badge Color
const getBadgeColor = (category: Event['category']) => {
  switch (category) {
    case 'Congreso': return 'bg-[#DAA520] text-white';
    case 'Vigilia': return 'bg-purple-900 text-white';
    case 'Academia': return 'bg-blue-900 text-white';
    case 'Evento de Zona': return 'bg-green-700 text-white';
    default: return 'bg-gray-800 text-white';
  }
};

export default function EventsPage() {
  // Filter past events
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = EVENTS.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#333333] font-sans selection:bg-[#DAA520] selection:text-white flex flex-col">

      {/* HERO */}
      <div className="pt-24 pb-12 px-6 text-center border-b border-[#DAA520]/20 bg-white">
        <span className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-xs animate-fade-in block mb-4">
          Agenda Oficial
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#333333] mb-4">
          Calendario Operativo <span className="text-[#DAA520]">2026</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          Mantente conectado con la vida de la iglesia. No te pierdas ningún tiempo de visitación.
        </p>
      </div>

      <main className="flex-grow container mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fade-in-up">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Top Badge */}
                <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase tracking-wider ${getBadgeColor(event.category)} rounded-bl-xl`}>
                  {event.category}
                </div>

                <div className="text-[#DAA520] mb-4">
                  <CalendarIcon className="w-8 h-8" />
                </div>

                {/* Date Block */}
                <div className="mb-4">
                  <div className="text-3xl font-serif font-bold text-[#333333] leading-none mb-1">
                    {new Date(event.date + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}
                  </div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    {new Date(event.date + 'T00:00:00').toLocaleDateString('es-MX', { weekday: 'long' })}
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    {event.time}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-serif mb-4 group-hover:text-[#DAA520] transition-colors">
                  {event.title}
                </h3>

                <div className="flex items-start gap-2 text-sm text-gray-500 mb-6">
                  <MapPinIcon className="w-4 h-4 mt-1 shrink-0" />
                  <span>{event.location}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 border-l-2 border-[#DAA520]/20 pl-4">
                  {event.description}
                </p>

                {/* Actions */}
                <div className="space-y-3 mt-auto">
                  <a
                    href={getGoogleCalendarLink(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaGoogle className="text-[#DAA520]" />
                    Agendar en mi Calendario
                  </a>

                  {event.registerLink && (
                    <a
                      href={event.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#DAA520] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#B8860B] shadow-lg hover:shadow-xl transition-all"
                    >
                      <TicketIcon className="w-4 h-4" />
                      Registro / Preventa
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-lg">No hay eventos próximos programados.</p>
            </div>
          )}
        </div>

        {/* LOCATION MAP */}
        <section className="bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6 flex flex-col justify-center p-4">
            <span className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-xs">
              Nuestra Casa
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] leading-tight">
              Auditorio Avivamiento
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              El lugar donde el cielo toca la tierra. Te esperamos para vivir juntos un tiempo de adoración y palabra.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <MapPinIcon className="w-5 h-5 text-[#DAA520]" />
                <span className="font-medium">Símbolos Patrios 404, Reforma Agraria, Oaxaca.</span>
              </div>
              <a
                href="https://maps.app.goo.gl/YourMapLinkHere"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[#DAA520] font-bold underline hover:text-[#B8860B]"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>

          <div className="flex-1 h-[400px] w-full rounded-2xl overflow-hidden shadow-inner relative bg-gray-200">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15264.41724490807!2d-96.726593!3d17.066922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c723f5eb5f3333%3A0x62919a3b2b000000!2sOaxaca%2C%20Oax.!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}