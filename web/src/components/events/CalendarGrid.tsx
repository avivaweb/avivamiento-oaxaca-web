import React from 'react';
import { Event } from '@/types/event';
import EventCard from './EventCard';

interface CalendarGridProps {
    currentDate: Date;
    events: Event[];
}

export default function CalendarGrid({ currentDate, events }: CalendarGridProps) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday

    // Create array of empty slots for padding before first day
    const prefixDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    // Create array of days
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.start_time);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === month &&
                eventDate.getFullYear() === year;
        });
    };

    return (
        <div className="w-full">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-4 mb-4 text-center">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                    <div key={day} className="text-neutral-500 font-semibold uppercase text-sm tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-4">
                {/* Empty cells for previous month */}
                {prefixDays.map((i) => (
                    <div key={`prefix-${i}`} className="min-h-[120px] bg-neutral-900/30 rounded-lg p-2 opacity-50"></div>
                ))}

                {/* Days of current month */}
                {days.map((day) => {
                    const dayEvents = getEventsForDay(day);
                    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

                    return (
                        <div
                            key={day}
                            className={`min-h-[120px] bg-neutral-900/50 rounded-lg p-2 border ${isToday ? 'border-amber-500/50' : 'border-white/5'} flex flex-col gap-2 transition-colors hover:bg-neutral-800/50`}
                        >
                            <span className={`text-sm font-bold ${isToday ? 'text-amber-500' : 'text-neutral-400'} block mb-1`}>
                                {day}
                            </span>

                            <div className="flex flex-col gap-2">
                                {dayEvents.map(event => (
                                    // For the grid view, we might want a mini-card or just a dot if too many
                                    // But the req asked for "Tarjetas de Evento", let's use a simplified card or the card itself scaled?
                                    // Using full EventCard in a small grid might be too big. 
                                    // Let's make a "Mini" version or just render the title with color.
                                    // Req says: "Vista Dual: Calendario (Grid) o Agenda (Lista)". Usually Grid Calendar cards are small.
                                    // I will just render a small block with title and time and color strip.

                                    <div
                                        key={event.id}
                                        className={`
                      text-xs p-1.5 rounded border-l-2 truncate cursor-pointer hover:opacity-80
                      ${event.category === 'special' ? 'border-amber-500 bg-amber-500/10 text-amber-100' :
                                                event.category === 'workshop' ? 'border-slate-400 bg-slate-400/10 text-slate-200' :
                                                    'border-red-700 bg-red-900/20 text-red-100'}
                    `}
                                        title={event.title}
                                    >
                                        <div className="font-semibold truncate">{event.title}</div>
                                        <div className="opacity-70 text-[10px]">{new Date(event.start_time).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
