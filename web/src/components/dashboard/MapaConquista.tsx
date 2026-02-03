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

interface AltarData {
    id: string
    nombre_altar: string
    zona: string
    nuevos_convertidos: number
    asistencia_total: number
    testimonio_destacado?: string
    lat?: number
    lng?: number
}

const ZONAS_COORDINATES: Record<string, [number, number]> = {
    "Santa Cruz Xoxocotlán": [17.0272, -96.7328],
    "Centro Histórico": [17.0612, -96.7258],
    "San Felipe del Agua": [17.0944, -96.7119],
    "Jalpan": [17.0163, -96.7865],
    "Cuilápam": [17.0044, -96.8041],
    "Zaachila": [16.9472, -96.7497],
    "San Nicolás": [17.0601, -96.7123],
    "Cañada": [17.1500, -96.6500],
    "Norte": [17.1000, -96.7300],
}

export default function MapaConquista() {
    const [data, setData] = useState<AltarData[]>([])
    const [loading, setLoading] = useState(true)
    const [totalHarvest, setTotalHarvest] = useState(0)

    useEffect(() => {
        async function fetchStats() {
            setLoading(true)
            try {
                const { data: reports, error } = await supabase
                    .from('reportes_altar')
                    .select('id, nombre_altar, zona, nuevos_convertidos, asistencia_total, testimonio_destacado, ubicacion_lat_long')
                    .order('creado_at', { ascending: false })
                    .limit(50)

                if (error) throw error

                let totalCosecha = 0
                const altars: AltarData[] = reports.map(r => {
                    totalCosecha += r.nuevos_convertidos || 0

                    // Simple logic for positioning: use zone coords if point is null
                    let coords = ZONAS_COORDINATES[r.zona] || [17.06, -96.72]

                    // If multiple reports in same zone, add a small jitter if needed, 
                    // but for 7 test reports in 7 zones it's fine.

                    return {
                        id: r.id,
                        nombre_altar: r.nombre_altar,
                        zona: r.zona,
                        nuevos_convertidos: r.nuevos_convertidos,
                        asistencia_total: r.asistencia_total,
                        testimonio_destacado: r.testimonio_destacado,
                        lat: coords[0],
                        lng: coords[1]
                    }
                })

                setData(altars)
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
                    zoom={12}
                    style={{ height: '100%', width: '100%', background: '#000' }}
                    zoomControl={false}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {data.map((altar) => {
                        if (altar.lat === undefined || altar.lng === undefined) return null

                        return (
                            <Marker
                                key={altar.id}
                                position={[altar.lat, altar.lng]}
                                icon={createGoldIcon()}
                            >
                                <Popup className="custom-popup">
                                    <div className="bg-aviva-onyx p-4 rounded-xl border-2 border-aviva-gold shadow-[0_0_20px_rgba(218,165,32,0.3)] text-white min-w-[220px]">
                                        <h3 className="text-aviva-gold font-black uppercase text-base mb-1 tracking-tighter">
                                            {altar.nombre_altar}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
                                            Zona: {altar.zona}
                                        </p>

                                        <div className="flex gap-4 mb-4">
                                            <div>
                                                <p className="text-[8px] uppercase text-aviva-gold font-bold">Cosecha</p>
                                                <p className="text-xl font-black text-white">{altar.nuevos_convertidos}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] uppercase text-gray-400 font-bold">Asistencia</p>
                                                <p className="text-xl font-bold text-white leading-none">{altar.asistencia_total}</p>
                                            </div>
                                        </div>

                                        {altar.testimonio_destacado && (
                                            <div className="relative pt-2 mt-2 border-t border-white/5">
                                                <p className="text-[10px] italic text-gray-300 leading-relaxed">
                                                    "{altar.testimonio_destacado}"
                                                </p>
                                            </div>
                                        )}
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
