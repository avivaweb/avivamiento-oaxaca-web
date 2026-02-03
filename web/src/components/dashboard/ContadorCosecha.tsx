'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform, animate } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { HiFire, HiUserGroup, HiSparkles, HiClock } from 'react-icons/hi2'

interface HarvestStats {
    asistenciaTotal: number
    cosechaTotal: number
    totalAltares: number
    lastUpdated: Date
}

const GOAL_ALTARES = 1000

function AnimatedNumber({ value }: { value: number }) {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

    useEffect(() => {
        spring.set(value)
    }, [value, spring])

    return <motion.span>{display}</motion.span>
}

export default function ContadorCosecha() {
    const [stats, setStats] = useState<HarvestStats>({
        asistenciaTotal: 0,
        cosechaTotal: 0,
        totalAltares: 0,
        lastUpdated: new Date()
    })
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        try {
            const { data, error } = await supabase
                .from('reportes_altar')
                .select('nuevos_convertidos, asistencia_total')

            if (error) throw error

            if (data) {
                const cosechaTotal = data.reduce((sum, r) => sum + (r.nuevos_convertidos || 0), 0)
                const asistenciaTotal = data.reduce((sum, r) => sum + (r.asistencia_total || 0), 0)
                const totalAltares = data.length

                setStats({
                    cosechaTotal,
                    asistenciaTotal,
                    totalAltares,
                    lastUpdated: new Date()
                })
            }
        } catch (error) {
            console.error('Error fetching harvest stats:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStats()

        const channel = supabase
            .channel('harvest_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'reportes_altar' }, () => {
                fetchStats()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const progress = Math.min((stats.totalAltares / GOAL_ALTARES) * 100, 100)

    const StatItem = ({ title, value, icon: Icon, colorClass, subtitle }: any) => (
        <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-aviva-gold/20 transition-colors group">
            <div className={`p-3 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform ${colorClass}`}>
                <Icon size={28} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">{title}</p>
            <h2 className="text-5xl font-black text-aviva-gold tracking-tighter">
                <AnimatedNumber value={value} />
            </h2>
            <p className="text-[10px] text-gray-500 mt-2 italic">{subtitle}</p>
        </div>
    )

    return (
        <div className="w-full bg-aviva-onyx border border-aviva-gold/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-aviva-gold/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-aviva-gold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                            <HiSparkles className="text-aviva-gold" />
                            Contador Global de Cosecha
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-gray-500 text-[10px] uppercase tracking-widest">
                            <HiClock className="text-aviva-gold/50" />
                            Última actualización: {stats.lastUpdated.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>

                    {/* Progress Bar Meta 2026 */}
                    <div className="w-full lg:w-96 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-bold text-aviva-gold uppercase tracking-widest">Meta Pasión 2026</span>
                            <span className="text-xl font-black text-white">{stats.totalAltares} <span className="text-[10px] text-gray-500 uppercase font-bold">/ 1,000 Altares</span></span>
                        </div>
                        <div className="h-4 bg-black/40 rounded-full border border-white/5 overflow-hidden p-1 shadow-inner">
                            <motion.div
                                className="h-full bg-gradient-to-r from-aviva-gold/40 via-aviva-gold to-yellow-600 rounded-full shadow-[0_0_15px_rgba(218,165,32,0.4)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-[9px] text-right text-gray-500 uppercase italic">Acelerando el establecimiento del Reino</p>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatItem
                        title="Nuevos Nacimientos"
                        value={stats.cosechaTotal}
                        icon={HiFire}
                        colorClass="text-orange-500"
                        subtitle="Almas rescatadas para el Reino"
                    />
                    <StatItem
                        title="Asistencia Total"
                        value={stats.asistenciaTotal}
                        icon={HiUserGroup}
                        colorClass="text-aviva-gold"
                        subtitle="Fieles manifestando la Vida Zoé"
                    />
                </div>
            </div>
        </div>
    )
}
