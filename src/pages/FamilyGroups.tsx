import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select.tsx';
import { Input } from '@/components/ui/input.tsx';

const FamilyGroups = () => {
  const [familyGroups, setFamilyGroups] = useState([]);
  const [zones, setZones] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [selectedZone, setSelectedZone] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupsAndZones = async () => {
      setIsLoading(true);
      setError(null);
      console.log('Fetching family groups and zones from Supabase...');
      try {
        const [groupsResponse, zonesResponse] = await Promise.all([
          supabase.from('grupos_familiares').select('*'),
          supabase.from('zonas').select('id, name')
        ]);

        if (groupsResponse.error) {
          console.error('Supabase error fetching groups:', groupsResponse.error);
          throw groupsResponse.error;
        }
        if (zonesResponse.error) {
          console.error('Supabase error fetching zones:', zonesResponse.error);
          throw zonesResponse.error;
        }

        const groupsData = groupsResponse.data || [];
        const zonesData = zonesResponse.data || [];
        console.log('Successfully fetched groups:', groupsData);
        console.log('Successfully fetched zones:', zonesData);

        const zonesMap = zonesData.reduce((acc, zone) => {
          acc[zone.id] = zone.name;
          return acc;
        }, {});

        const groupsWithZoneNames = groupsData.map(group => ({
          ...group,
          zone_name: zonesMap[group.zone.id] || 'Sin zona asignada',
        }));

        setFamilyGroups(groupsWithZoneNames);
        setZones(zonesData);
        setFilteredGroups(groupsWithZoneNames);
      } catch (err) {
        console.error('Error fetching family groups or zones:', err.message);
        setError('No se pudieron cargar los grupos familiares. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
        console.log('Finished fetching family groups and zones.');
      }
    };

    fetchGroupsAndZones();
  }, []);

  useEffect(() => {
    let currentFiltered = familyGroups;

    if (selectedZone !== 'all') {
      currentFiltered = currentFiltered.filter(group => group.zone_id === selectedZone);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFiltered = currentFiltered.filter(
        group =>
          group.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          group.address.toLowerCase().includes(lowerCaseSearchTerm) ||
          (group.leader_name && group.leader_name.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    setFilteredGroups(currentFiltered);
  }, [familyGroups, selectedZone, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-2xl font-semibold text-spiritual-red mb-2">Cargando Grupos Familiares...</p>
          <p className="text-gray-600">Estamos preparando todo para ti.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Ocurrió un Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold text-center text-spiritual-red mb-12 drop-shadow-lg">
        Localizador de Grupos Familiares
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="w-full md:w-1/3">
          <Select onValueChange={value => setSelectedZone(value)} defaultValue="all">
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left text-gray-700 hover:border-spiritual-red focus:outline-none focus:ring-2 focus:ring-spiritual-red focus:border-transparent">
              <SelectValue placeholder="Filtrar por Zona" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto z-10">
              <SelectGroup>
                <SelectLabel>Zonas</SelectLabel>
                <SelectItem value="all">Todas las Zonas</SelectItem>
                {zones.map(zone => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-2/3">
          <Input
            type="text"
            placeholder="Buscar por dirección, líder o nombre del grupo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-spiritual-red focus:border-transparent"
          />
        </div>
      </div>

      {filteredGroups.length === 0 ? (
         <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No se encontraron resultados</h2>
            <p className="text-gray-600">Intenta ajustar los filtros o el término de búsqueda.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.map(group => (
            <div key={group.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-spiritual-red/20">
              <h2 className="text-2xl font-bold text-negro-sagrado mb-3">{group.name}</h2>
              <p className="text-gray-800 mb-2"><span className="font-semibold text-gray-600">Líder:</span> {group.leader_name || 'No asignado'}</p>
              <p className="text-gray-800 mb-2"><span className="font-semibold text-gray-600">Dirección:</span> {group.address}</p>
              <p className="text-gray-800 mb-2"><span className="font-semibold text-gray-600">Horario:</span> {group.schedule || 'No especificado'}</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="inline-block bg-spiritual-red/10 text-spiritual-red text-sm font-semibold px-3 py-1 rounded-full">{group.zone_name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyGroups;