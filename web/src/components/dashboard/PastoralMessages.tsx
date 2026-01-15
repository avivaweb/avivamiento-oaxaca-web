'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import { Report } from '@/types/db';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function PastoralMessages() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        if (!user) return;
        fetchMessages();
    }, [user]);

    const fetchMessages = async () => {
        try {
            // Fetch reports where user_id is curren user AND comentario_pastoral is NOT NULL
            const { data, error } = await supabase
                .from('celula_reports')
                .select('*')
                .eq('user_id', user!.id)
                .not('comentario_pastoral', 'is', null)
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;
            if (data) setMessages(data as Report[]);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;
    if (messages.length === 0) return null;

    return (
        <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] rounded-xl p-6 border border-[#DAA520]/30 shadow-[0_0_20px_rgba(218,165,32,0.1)] relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <ChatBubbleLeftRightIcon className="w-32 h-32" />
            </div>

            <div className="relative z-10">
                <h3 className="text-[#DAA520] font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-2xl">♛</span> Mensajes de la Casa
                </h3>

                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-white/5 rounded-lg p-4 border-l-2 border-[#DAA520] hover:bg-white/10 transition-colors">
                            <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">
                                {new Date(msg.date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                            <p className="text-white font-serif italic text-lg leading-relaxed">
                                "{msg.comentario_pastoral}"
                            </p>
                            <div className="mt-2 flex justify-end">
                                <span className="text-[#DAA520] text-xs font-bold">- Pastor General</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
