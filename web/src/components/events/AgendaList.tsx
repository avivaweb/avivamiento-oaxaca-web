import React from 'react';
import { Event } from '@/types/event';
import EventCard from './EventCard';

interface AgendaListProps {
    events: Event[];
}

export default function AgendaList({ events }: AgendaListProps) {
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );

    if (events.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-neutral-500 text-lg">No hay eventos programados para este mes.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {sortedEvents.map(event => (
                <EventCard key={event.id} event={event} view="list" />
            ))}
        </div>
    );
}
