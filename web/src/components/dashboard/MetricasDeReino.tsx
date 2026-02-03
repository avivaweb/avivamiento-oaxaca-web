'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { HiUsers, HiFire, HiMap, HiSparkles } from 'react-icons/hi2'
import { useAuth } from '@/hooks/useAuth'
import ContadorCosecha from './ContadorCosecha'

interface MetricsData {
    cosechaTotal: number
    altaresActivos: number
    zonaConquista: string
    evidenciasPoder: number
}
export default function MetricasDeReino() {
    const { user } = useAuth()
    const [metrics, setMetrics] = useState<MetricsData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMetrics = async () => {
            if (!user) return
            try {
                const rol = user.rol
                let query = supabase
                    .from('reportes_altar')
                    .select('nuevos_convertidos, zona, testimonio_destacado')

                // Multi-role logic: If leader, filter by their ID
                if (rol === 'Lider de Celula') {
                    query = query.eq('lider_id', user.id)
                }

                const { data, error } = await query

                if (error) throw error

                if (data) {
                    const cosechaTotal = data.reduce((sum, r) => sum + (r.nuevos_convertidos || 0), 0)
                    const altaresActivos = data.length

                    // Identify zone with most reports
                    const zoneCounts: Record<string, number> = {}
                    data.forEach(r => {
                        if (r.zona) {
                            zoneCounts[r.zona] = (zoneCounts[r.zona] || 0) + 1
                        }
                    })
                    let topZone = "N/A"
                    let maxCount = 0
                    Object.entries(zoneCounts).forEach(([zone, count]) => {
                        if (count > maxCount) {
                            maxCount = count
                            topZone = zone
                        }
                    })

                    const evidenciasPoder = data.filter(r => r.testimonio_destacado && r.testimonio_destacado.trim() !== '').length

                    setMetrics({
                        cosechaTotal,
                        altaresActivos,
                        zonaConquista: topZone,
                        evidenciasPoder
                    })
                }
            } catch (error) {
                console.error('Error fetching metrics:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMetrics()

        // Subscribe to real-time changes
        const channel = supabase
            .channel('realtime_metrics')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'reportes_altar' }, () => {
                fetchMetrics()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user])

    const MetricCard = ({ title, value, icon: Icon, colorClass, progress }: {
        title: string,
        value: string | number,
        icon: any,
        colorClass: string,
        progress: number
    }) => (
        <div className="relative overflow-hidden group bg-black/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl transition-all duration-500 hover:border-aviva-gold/40 hover:translate-y-[-2px] shadow-2xl">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <div className="h-1 w-8 bg-white/10 rounded-full overflow-hidden self-center">
                    <div
                        className={`h-full bg-current ${colorClass}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{title}</p>
                <h3 className="text-3xl lg:text-4xl font-black tracking-tighter text-white">
                    {loading ? (
                        <div className="h-10 w-24 bg-white/5 animate-pulse rounded-md" />
                    ) : (
                        value
                    )}
                </h3>
            </div>

            {/* Background Decorative Element */}
            <div className={`absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700 ${colorClass}`}>
                <Icon size={80} />
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                {!loading && (
                    <div
                        className={`h-full transition-all duration-1000 ease-out bg-current ${colorClass}`}
                        style={{ width: `${progress}%` }}
                    />
                )}
            </div>
        </div>
    )

    return (
        <div className="space-y-8 w-full">
            {/* Contador Global Hero Section */}
            <ContadorCosecha />

            {/* Grid de Sub-Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <MetricCard
                    title="Cosecha Total"
                    value={metrics?.cosechaTotal || 0}
                    icon={HiUsers}
                    colorClass="text-aviva-gold"
                    progress={metrics ? Math.min((metrics.cosechaTotal / 1000) * 100, 100) : 0} // Target 1000 for visual progress
                />
                <MetricCard
                    title="Altares Activos"
                    value={metrics?.altaresActivos || 0}
                    icon={HiFire}
                    colorClass="text-orange-500"
                    progress={metrics ? Math.min((metrics.altaresActivos / 100) * 100, 100) : 0} // Target 100 for visual progress
                />
                <MetricCard
                    title="Zona de Conquista"
                    value={metrics?.zonaConquista || '---'}
                    icon={HiMap}
                    colorClass="text-blue-500"
                    progress={85} // Dynamic enough? Let's keep it steady for vision
                />
                <MetricCard
                    title="Evidencias de Poder"
                    value={metrics?.evidenciasPoder || 0}
                    icon={HiSparkles}
                    colorClass="text-purple-500"
                    progress={metrics ? Math.min((metrics.evidenciasPoder / metrics.altaresActivos) * 100, 100) || 0 : 0}
                />
            </div>
        </div>
    )
}
