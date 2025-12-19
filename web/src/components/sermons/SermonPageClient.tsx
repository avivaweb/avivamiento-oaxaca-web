'use client';

import { useState, useMemo } from 'react';
import { Sermon } from '@/types/sermon';
import SermonFilters from './SermonFilters';
import SermonCard from './SermonCard';

interface SermonPageClientProps {
    initialSermons: Sermon[];
}

export default function SermonPageClient({ initialSermons }: SermonPageClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPastor, setSelectedPastor] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    // Extract unique Pastors and Topics from data
    const pastors = useMemo(() => {
        const uniquePastors = Array.from(new Set(initialSermons.map(s => s.pastor).filter(Boolean)));
        return uniquePastors.sort();
    }, [initialSermons]);

    const topics = useMemo(() => {
        const uniqueTopics = Array.from(new Set(initialSermons.map(s => s.topic).filter(Boolean)));
        return uniqueTopics.sort();
    }, [initialSermons]);

    // Filter Logic
    const filteredSermons = useMemo(() => {
        return initialSermons.filter((sermon) => {
            const matchesSearch =
                sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sermon.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPastor = selectedPastor ? sermon.pastor === selectedPastor : true;
            const matchesTopic = selectedTopic ? sermon.topic === selectedTopic : true;

            return matchesSearch && matchesPastor && matchesTopic;
        });
    }, [initialSermons, searchTerm, selectedPastor, selectedTopic]);

    return (
        <div>
            <SermonFilters
                pastors={pastors}
                topics={topics}
                searchTerm={searchTerm}
                selectedPastor={selectedPastor}
                selectedTopic={selectedTopic}
                onSearchChange={setSearchTerm}
                onPastorChange={setSelectedPastor}
                onTopicChange={setSelectedTopic}
            />

            <div className="flex justify-between items-center mb-6 text-gray-400 text-sm">
                <p>Mostrando {filteredSermons.length} sermones</p>
            </div>

            {filteredSermons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSermons.map((sermon) => (
                        <SermonCard key={sermon.id} sermon={sermon} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-xl text-gray-400">No se encontraron sermones con estos filtros.</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedPastor('');
                            setSelectedTopic('');
                        }}
                        className="mt-4 text-[var(--aviva-principal)] hover:underline"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>
    );
}
