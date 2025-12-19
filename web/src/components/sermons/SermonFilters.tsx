import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

interface SermonFiltersProps {
    pastors: string[];
    topics: string[];
    selectedPastor: string;
    selectedTopic: string;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onPastorChange: (value: string) => void;
    onTopicChange: (value: string) => void;
}

export default function SermonFilters({
    pastors,
    topics,
    selectedPastor,
    selectedTopic,
    searchTerm,
    onSearchChange,
    onPastorChange,
    onTopicChange,
}: SermonFiltersProps) {

    return (
        <div className="space-y-8 mb-12">
            {/* Top Bar: Search and Pastor Select */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#1a1a1a]/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">

                {/* Search Bar */}
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg leading-5 bg-black/40 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[var(--aviva-dorado)] focus:border-[var(--aviva-dorado)] sm:text-sm transition-all duration-200"
                        placeholder="Buscar por título o palabra clave..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* Pastor Select */}
                <div className="relative w-full md:w-auto min-w-[250px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FunnelIcon className="h-4 w-4 text-[var(--aviva-principal)]" />
                    </div>
                    <select
                        value={selectedPastor}
                        onChange={(e) => onPastorChange(e.target.value)}
                        className="block w-full pl-10 pr-10 py-2.5 text-base border-white/10 bg-black/40 text-white focus:outline-none focus:ring-[var(--aviva-dorado)] focus:border-[var(--aviva-dorado)] sm:text-sm rounded-lg appearance-none cursor-pointer hover:bg-black/60 transition-colors"
                    >
                        <option value="">Filtrar por Pastor (Todos)</option>
                        {pastors.map((pastor) => (
                            <option key={pastor} value={pastor} className="bg-[#1a1a1a]">
                                {pastor}
                            </option>
                        ))}
                    </select>
                    {/* Custom Arrow Icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Topics Tabs */}
            <div className="flex flex-col gap-3">
                <h3 className="text-gray-400 text-sm uppercase tracking-widest font-semibold ml-1">Explorar por Temas</h3>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onTopicChange('')}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${selectedTopic === ''
                            ? 'bg-[var(--aviva-principal)] text-black shadow-lg shadow-[var(--aviva-principal)]/20'
                            : 'bg-[#1a1a1a] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                    >
                        Todos
                    </button>

                    {topics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => onTopicChange(topic)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${selectedTopic === topic
                                ? 'bg-[var(--aviva-principal)] text-black shadow-lg shadow-[var(--aviva-principal)]/20'
                                : 'bg-[#1a1a1a] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
