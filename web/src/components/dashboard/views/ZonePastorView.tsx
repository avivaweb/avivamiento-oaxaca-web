'use client';

import { ChartBarIcon, MapIcon } from '@heroicons/react/24/outline';

export default function ZonePastorView() {
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <ChartBarIcon className="w-6 h-6 mr-2 text-[#DAA520]" />
                        Estadísticas de Zona
                    </h3>
                    <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#DAA520] focus:border-[#DAA520] block p-2.5">
                        <option>Último Mes</option>
                        <option>Último Trimestre</option>
                        <option>Este Año</option>
                    </select>
                </div>

                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">Gráfica de Crecimiento de Zona (Proyección)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Células Top (Asistencia)</h4>
                    <ul className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Célula Norte #{i}</span>
                                <span className="text-[#A5002F] font-bold">2{i} personas</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Crecimiento Reciente</h4>
                    <ul className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Sector Sur</span>
                                <span className="text-green-600 font-bold">+{i * 2}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
