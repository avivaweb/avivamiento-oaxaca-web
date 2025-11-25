'use client';

import { useState, useEffect } from 'react';
import { fetchWithAuth } from '@/lib/api';
import { 
  UsersIcon, 
  MapPinIcon, 
  CalendarIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';

interface Cell {
  id: string;
  name: string;
  leader: string;
  members: number;
  location: string;
  nextMeeting: string;
  status: 'active' | 'inactive';
}

interface Zone {
  id: string;
  name: string;
  description?: string;
  cells?: Cell[];
}

export default function MisCelulasPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [cells, setCells] = useState<Cell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchZonesAndCells();
  }, []);

  const fetchZonesAndCells = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch zones from API
      const zonesResponse = await fetchWithAuth('/zones');
      
      if (!zonesResponse.ok) {
        throw new Error('Error al cargar zonas');
      }

      const zonesData = await zonesResponse.json();
      setZones(zonesData);

      // Fetch cells from API
      const cellsResponse = await fetchWithAuth('/cells');
      
      if (!cellsResponse.ok) {
        throw new Error('Error al cargar células');
      }

      const cellsData = await cellsResponse.json();
      
      // Transform API data to match our interface
      const transformedCells: Cell[] = cellsData.map((cell: any) => ({
        id: cell.id,
        name: cell.name,
        leader: cell.leader?.name || 'Sin líder asignado',
        members: cell.members?.length || 0,
        location: cell.location || 'Ubicación no especificada',
        nextMeeting: cell.nextMeeting || new Date().toISOString(),
        status: cell.isActive ? 'active' : 'inactive',
      }));

      setCells(transformedCells);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      
      // Fallback to mock data if API fails
      setCells([
        {
          id: '1',
          name: 'Célula Jóvenes Centro',
          leader: 'Juan Pérez',
          members: 15,
          location: 'Calle Principal #123',
          nextMeeting: '2024-01-15',
          status: 'active',
        },
        {
          id: '2',
          name: 'Célula Familias Norte',
          leader: 'María García',
          members: 12,
          location: 'Av. Norte #456',
          nextMeeting: '2024-01-16',
          status: 'active',
        },
        {
          id: '3',
          name: 'Célula Adultos Sur',
          leader: 'Pedro López',
          members: 18,
          location: 'Calle Sur #789',
          nextMeeting: '2024-01-17',
          status: 'active',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A5002F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando células...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Células</h1>
          <p className="mt-2 text-gray-600">
            Gestiona y supervisa tus células
          </p>
          {error && (
            <p className="mt-2 text-sm text-yellow-600">
              ⚠️ Mostrando datos de ejemplo (API no disponible)
            </p>
          )}
        </div>
        <button className="flex items-center px-4 py-2 bg-[#A5002F] text-white rounded-lg hover:bg-[#8A0026] transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" />
          Nueva Célula
        </button>
      </div>

      {/* Zonas disponibles */}
      {zones.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Zonas Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zones.map((zone) => (
              <div key={zone.id} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">{zone.name}</h3>
                {zone.description && (
                  <p className="text-sm text-gray-600 mt-1">{zone.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Células</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{cells.length}</p>
            </div>
            <UsersIcon className="w-8 h-8 text-[#A5002F]" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Miembros</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {cells.reduce((sum, cell) => sum + cell.members, 0)}
              </p>
            </div>
            <UsersIcon className="w-8 h-8 text-[#A5002F]" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Células Activas</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {cells.filter(c => c.status === 'active').length}
              </p>
            </div>
            <UsersIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Lista de Células */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lista de Células</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {cells.map((cell) => (
            <div key={cell.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{cell.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      cell.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cell.status === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      Líder: {cell.leader}
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      {cell.members} miembros
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {cell.location}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Próxima reunión: {new Date(cell.nextMeeting).toLocaleDateString('es-ES')}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm font-medium text-[#A5002F] border border-[#A5002F] rounded-lg hover:bg-[#A5002F] hover:text-white transition-colors">
                    Ver Detalles
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-[#A5002F] rounded-lg hover:bg-[#8A0026] transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}