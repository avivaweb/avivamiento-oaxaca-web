'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { StarIcon } from '@heroicons/react/24/outline'; // Or custom badge

interface VictoryPreview {
    id: string;
    zona: string;
    leader_name: string; // Fetch or join? Supabase join complex in client? Will try fetching name or just display 'Líder'.
    // Actually, user_id is in reports. Need profile.
    testimonies: string;
    created_at: string;
}

export default function RecentVictories() {
    const [victories, setVictories] = useState<VictoryPreview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVictories = async () => {
            try {
                // Fetch last 5 reports with profile info if possible via join?
                // Supabase client join syntax:
                const { data, error } = await supabase
                    .from('celula_reports')
                    .select(`
                        id,
                        zona,
                        testimonies,
                        created_at,
                        profiles!user_id (full_name) 
                    `)
                    .order('created_at', { ascending: false })
                    .limit(5);

                // Note: The above query requires a foreign key relationship between celula_reports.user_id and profiles.id in Supabase.
                // If it doesn't exist, we fallback to fetching stats or just displaying user_id.
                // Assuming relationship exists since user_id references auth.users which profiles.id references. 
                // But normally 'profiles' table is linked. 
                // Let's assume the join works. If not, I'll catch error and do separate fetch.

                if (error) {
                    // Fallback: Fetch without join, then fetch profiles
                    const { data: simpleData, error: simpleError } = await supabase
                        .from('celula_reports')
                        .select('id, zona, testimonies, created_at, user_id')
                        .order('created_at', { ascending: false })
                        .limit(5);

                    if (simpleError) throw simpleError;
                    if (simpleData) {
                        // Enrich
                        const userIds = simpleData.map(r => r.user_id);
                        const { data: profiles } = await supabase.from('profiles').select('id, full_name').in('id', userIds);
                        const map = new Map(profiles?.map(p => [p.id, p]));

                        setVictories(simpleData.map(r => ({
                            ...r,
                            leader_name: map.get(r.user_id)?.full_name || 'Líder'
                        })));
                    }
                } else if (data) {
                    setVictories(data.map((r: any) => ({
                        id: r.id,
                        zona: r.zona,
                        testimonies: r.testimonies,
                        created_at: r.created_at,
                        leader_name: r.profiles?.full_name || 'Líder'
                    })));
                }

            } catch (err) {
                console.error('Error loading victories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVictories();
    }, []);

    if (loading) return <div className="h-40 bg-white/5 rounded-xl animate-pulse"></div>;
    if (victories.length === 0) return null;

    return (
        <div className="bg-[#111111] border border-[#DAA520]/20 rounded-xl p-6">
            <h3 className="text-[#DAA520] font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                <StarIcon className="w-4 h-4" /> Últimas Victorias
            </h3>

            <div className="space-y-4">
                {victories.map((victory) => (
                    <div key={victory.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-[#DAA520]/30 transition-colors">
                        <div className="mt-1">
                            <div className="w-8 h-8 rounded-full bg-[#DAA520]/20 flex items-center justify-center text-[#DAA520] text-xs font-bold">
                                {victory.zona ? victory.zona[0] : 'Z'}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <p className="text-white font-bold text-sm truncate">{victory.leader_name}</p>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {new Date(victory.created_at).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-[#DAA520] text-xs uppercase font-bold tracking-wide mt-0.5">{victory.zona || 'Zona General'}</p>
                            <p className="text-gray-300 text-sm mt-2 line-clamp-2 italic">
                                "{victory.testimonies || 'Sin descripción'}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
