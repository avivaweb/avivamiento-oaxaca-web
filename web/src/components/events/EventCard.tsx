import React from 'react';
import { Event } from '@/types/event';
import {
    CalendarIcon,
    MapPinIcon,
    ClockIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface EventCardProps {
    event: Event;
    view?: 'grid' | 'list';
}

export default function EventCard({ event, view = 'grid' }: EventCardProps) {
    const isAuditorio = !event.location || event.location.toLowerCase().includes('auditorio');
    const locationText = event.location || 'Auditorio Avivamiento';

    // Category Styles (refined for improved readability with new buttons)
    const categoryStyles = {
        special: 'border-l-4 border-amber-500 bg-neutral-900',
        general: 'border-l-4 border-red-700 bg-neutral-900',
        workshop: 'border-l-4 border-slate-400 bg-neutral-900',
    };

    const style = categoryStyles[event.category] || categoryStyles.general;

    // Date Formatting
    const startDate = new Date(event.start_time);
    const timeStr = startDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = startDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });

    // Google Calendar URL Generator
    const getGoogleCalendarUrl = () => {
        const title = encodeURIComponent(event.title);
        const details = encodeURIComponent(event.description || '');
        const location = encodeURIComponent(locationText);

        // Format dates to YYYYMMDDTHHMMSSZ (UTC)
        // IMPORTANT: Simplistic UTC conversation. Since we usually store as per request timezone or UTC in DB.
        // Assuming event.start_time is an ISO string already.
        // We add 2 hours for end time default if not present
        const start = new Date(event.start_time);
        const end = event.end_time ? new Date(event.end_time) : new Date(start.getTime() + 2 * 60 * 60 * 1000);

        const formatDate = (date: Date) => {
            return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
        };

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(start)}/${formatDate(end)}&details=${details}&location=${location}`;
    };

    // Google Maps URL
    const getGoogleMapsUrl = () => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`;
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--aviva-dorado)]/10 ${style} ${view === 'list' ? 'flex flex-col md:flex-row md:items-center gap-6' : 'flex flex-col gap-4'}
      `}
        >
            {/* Date/Time Badge for Grid - Repositioned/Styled */}
            {view === 'grid' && (
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                        <CalendarIcon className="h-4 w-4 text-neutral-500" />
                        <span>{dateStr}</span>
                    </div>
                    {/* Category Indicator Dot if needed, currently border-l handles it */}
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
                <h3 className={`font-bold text-white tracking-tight mb-2 ${view === 'list' ? 'text-2xl' : 'text-xl'}`}>
                    {event.title}
                </h3>
                {event.description && (
                    <p className="text-sm text-neutral-400 line-clamp-2 mb-3 leading-relaxed">{event.description}</p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                    <a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-xs font-semibold hover:bg-amber-500 hover:text-neutral-900 transition-all duration-300"
                    >
                        <CalendarIcon className="h-4 w-4" />
                        <span>Agendar</span>
                    </a>

                    <a
                        href={getGoogleMapsUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-neutral-500 hover:text-white transition-colors"
                    >
                        <span>Ver mapa</span>
                        <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    </a>
                </div>
            </div>

            {/* Details Box - Location & Time */}
            <div className={`mt-auto pt-4 border-t border-white/5 flex flex-col gap-3 ${view === 'list' ? 'md:items-end md:mt-0 md:pt-0 md:border-t-0 md:border-l md:pl-6 md:min-w-[200px]' : ''}`}>

                {/* Time */}
                <div className="flex items-center gap-2 text-neutral-200">
                    <ClockIcon className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-bold tracking-wide">{timeStr}</span>
                </div>

                {/* Location - Dynamic Highlighting */}
                <div
                    className={`
                flex items-center gap-2 text-sm p-2 rounded-lg transition-colors
                ${!isAuditorio
                            ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' // Highlight for non-Auditorio
                            : 'text-neutral-400' // Default
                        }
            `}
                >
                    <MapPinIcon className={`h-4 w-4 ${!isAuditorio ? 'text-amber-400 animate-pulse' : ''}`} />
                    <span className="font-medium">{locationText}</span>
                </div>
            </div>
        </div>
    );
}
