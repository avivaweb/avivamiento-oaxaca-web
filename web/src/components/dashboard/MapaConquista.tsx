'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { supabase } from '@/lib/supabase'
import { HiFire, HiMapPin, HiUserGroup } from 'react-icons/hi2'

// Fix for Leaflet default icon issues in Next.js
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

// Golden Pulse Icon for active zones
const createGoldIcon = () => L.divIcon({
    className: 'custom-gold-marker',
    html: `<div class="w-4 h-4 bg-aviva-gold rounded-full border-2 border-black shadow-[0_0_15px_#DAA520] animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
})

interface ZoneData {
    zona: string
    cosecha_total: number
    reportes_count: number
    asistencia_media: number
}

const ZONAS_COORDINATES: Record<string, [number, number]> = {
    "Jalpan": [17.0163, -96.7865],
    "Cuilápam": [17.0044, -96.8041],
    "Zaachila": [16.9472, -96.7497],
    "San Nicolás": [17.0601, -96.7123],
    "Cañada": [17.1500, -96.6500],
    "Centro": [17.0612, -96.7258],
    "Norte": [17.1000, -96.7300],
}

export default function MapaConquista() {
    const [data, setData] = useState<ZoneData[]>([])
    const [loading, setLoading] = useState(true)
    const [totalHarvest, setTotalHarvest] = useState(0)

    useEffect(() => {
        async function fetchStats() {
            setLoading(true)
            try {
                const { data: reports, error } = await supabase
                    .from('reportes_altar')
                    .select('zona, nuevos_convertidos, asistencia_total')

                if (error) throw error

                const stats: Record<string, ZoneData> = {}
                let totalCosecha = 0

                reports.forEach(r => {
                    if (!stats[r.zona]) {
                        stats[r.zona] = {
                            zona: r.zona,
                            cosecha_total: 0,
                            reportes_count: 0,
                            asistencia_media: 0
                        }
                    }
                    stats[r.zona].cosecha_total += r.nuevos_convertidos || 0
                    stats[r.zona].reportes_count += 1
                    totalCosecha += r.nuevos_convertidos || 0
                })

                setData(Object.values(stats))
                setTotalHarvest(totalCosecha)
            } catch (err) {
                console.error("Error fetching map data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    return (
        <div className="bg-black border border-aviva-gold/20 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Header / Stats Overlay */}
            <div className="absolute top-4 left-4 z-[1000] bg-black/80 backdrop-blur-md border border-aviva-gold/30 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                    <HiFire className="text-aviva-gold animate-bounce" size={20} />
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Cosecha Mundial 2026</p>
                        <p className="text-xl font-black text-white leading-tight">
                            {totalHarvest} <span className="text-aviva-gold text-xs uppercase font-normal">Nuevos Nacimientos</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="h-[400px] w-full">
                <MapContainer
                    center={[17.06, -96.72]}
                    zoom={11}
                    style={{ height: '100%', width: '100%', background: '#000' }}
                    zoomControl={false}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {data.map((zone) => {
                        const coords = ZONAS_COORDINATES[zone.zona]
                        if (!coords) return null

                        return (
                            <Marker
                                key={zone.zona}
                                position={coords}
                                icon={createGoldIcon()}
                            >
                                <Popup className="custom-popup">
                                    <div className="bg-aviva-onyx p-2 rounded-lg border border-aviva-gold text-white min-w-[150px]">
                                        <h3 className="text-aviva-gold font-black uppercase text-sm border-b border-aviva-gold/20 pb-1 mb-2">Zona: {zone.zona}</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase">
                                                    <HiFire className="text-aviva-gold" />
                                                    Nuevos
                                                </div>
                                                <span className="text-white font-bold">{zone.cosecha_total}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase">
                                                    <HiUserGroup className="text-blue-400" />
                                                    Altares
                                                </div>
                                                <span className="text-white font-bold">{zone.reportes_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    })}
                </MapContainer>
            </div>

            {/* Custom CSS for Popup */}
            <div dangerouslySetInnerHTML={{
                __html: `
                <style>
                    .leaflet-popup-content-wrapper {
                        background: transparent !important;
                        padding: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                    }
                    .leaflet-popup-tip {
                        background: #1F2937 !important;
                        border: 1px solid #DAA520 !important;
                    }
                    .leaflet-container {
                        background: #000 !important;
                    }
                </style>
            ` }} />
        </div>
    )
}
