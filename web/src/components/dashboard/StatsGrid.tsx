'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    UsersIcon,
    HeartIcon,
    CurrencyDollarIcon,
    HomeIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
    totalSouls: number;
    totalAttendance: number;
    totalOffering: number;
    activeCells: number;
}

export default function StatsGrid() {
    const [stats, setStats] = useState<DashboardStats>({
        totalSouls: 0,
        totalAttendance: 0,
        totalOffering: 0,
        activeCells: 0
    });
    const [loading, setLoading] = useState(true);
    const [selectedZone, setSelectedZone] = useState<string>('Todas');

    // Zones for filtering
    const ZONAS = [
        "Todas", // Global
        "Jalpan",
        "Cuilápam",
        "Zaachila",
        "San Nicolás",
        "Cañada",
        "Centro / Oaxaca Juárez",
        "Etla / Valles Centrales"
    ];

    useEffect(() => {
        fetchStats();
    }, [selectedZone]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('celula_reports')
                .select('new_decisions, new_decisions_adults, new_decisions_kids, adults_attendance, children_attendance, offering, cell_id, zona');

            // Apply Zone Filter if not 'Todas'
            if (selectedZone !== 'Todas') {
                query = query.eq('zona', selectedZone);
            }

            const { data, error } = await query;

            if (error) throw error;

            if (data) {
                // Calculate Metrics
                const totalSouls = data.reduce((acc, curr) => {
                    // Prefer split metrics if available, fallback to legacy Total
                    const adults = curr.new_decisions_adults || 0;
                    const kids = curr.new_decisions_kids || 0;
                    const total = curr.new_decisions || 0;
                    // If split exists use it, otherwise total
                    return acc + (adults + kids > 0 ? adults + kids : total);
                }, 0);

                const totalAttendance = data.reduce((acc, curr) => {
                    return acc + (curr.adults_attendance || 0) + (curr.children_attendance || 0);
                }, 0);

                const totalOffering = data.reduce((acc, curr) => acc + (Number(curr.offering) || 0), 0);

                // Count unique active cells in this selection
                const uniqueCells = new Set(data.map(r => r.cell_id)).size;

                setStats({
                    totalSouls,
                    totalAttendance,
                    totalOffering,
                    activeCells: uniqueCells
                });
            }
        } catch (error) {
            console.error('Error fetching global stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
    };

    const StatCard = ({ title, value, icon: Icon, colorClass, delay }: any) => (
        <div className={`bg-[#111111] border border-[#DAA520]/30 rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-[#DAA520] transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4`} style={{ animationDelay: `${delay}ms` }}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
                    {loading ? (
                        <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
                    ) : (
                        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
                    )}
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Filter Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-[#DAA520]">✦</span> Tablero de Control {selectedZone !== 'Todas' ? `(${selectedZone})` : 'Global'}
                </h2>
                <div className="flex items-center gap-3">
                    <FunnelIcon className="w-5 h-5 text-gray-400" />
                    <select
                        value={selectedZone}
                        onChange={(e) => setSelectedZone(e.target.value)}
                        className="bg-black text-white border border-[#DAA520]/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#DAA520] hover:border-[#DAA520]/60 transition-colors"
                    >
                        {ZONAS.map(zone => (
                            <option key={zone} value={zone} className="bg-gray-900">{zone}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Almas"
                    value={stats.totalSouls}
                    icon={HeartIcon}
                    colorClass="text-[#DAA520]"
                    delay={0}
                />
                <StatCard
                    title="Asistencia Global"
                    value={stats.totalAttendance}
                    icon={UsersIcon}
                    colorClass="text-blue-400"
                    delay={100}
                />
                <StatCard
                    title="Mayordomía Total"
                    value={formatCurrency(stats.totalOffering)}
                    icon={CurrencyDollarIcon}
                    colorClass="text-green-400"
                    delay={200}
                />
                <StatCard
                    title="Casas Activas"
                    value={stats.activeCells}
                    icon={HomeIcon}
                    colorClass="text-white"
                    delay={300}
                />
            </div>
        </div>
    );
}
