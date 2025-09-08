import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button'; // Import Button component

export default function ViewCellGroups() {
  const { user, loading: authLoading } = useAuth();
  const [cellGroups, setCellGroups] = useState([]);
  const [profiles, setProfiles] = useState([]); // To populate filter dropdowns
  const [zones, setZones] = useState([]); // State for zones
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filterMeetingDay, setFilterMeetingDay] = useState('');
  const [filterLeaderId, setFilterLeaderId] = useState('');
  const [filterSupervisorId, setFilterSupervisorId] = useState('');
  const [filterPastorId, setFilterPastorId] = useState('');
  const [filterZoneId, setFilterZoneId] = useState(''); // New filter for zone

  const meetingDays = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch zones first
      const { data: zonesData, error: zonesError } = await supabase
        .from('zones')
        .select('id, name');

      if (zonesError) {
        console.error('Error fetching zones:', zonesError);
        setError('No se pudieron cargar las zonas para el filtro.');
        setLoading(false);
        return;
      } else {
        setZones(zonesData);
      }

      let query = supabase
        .from('cell_groups')
        .select(`
          id,
          name,
          address_street,
          address_colonia,
          meeting_day,
          meeting_time,
          leader_id,
          supervisor_id,
          pastor_id,
          zone_id,
          profiles_leader:leader_id (full_name),
          profiles_supervisor:supervisor_id (full_name),
          profiles_pastor:pastor_id (full_name),
          zone:zone_id (name)
        `)
        .order('name', { ascending: true });

      // Apply role-based filtering
      if (user.role === 'Líder de Célula') {
        query = query.eq('leader_id', user.id);
      } else if (user.role === 'Supervisor') {
        query = query.eq('supervisor_id', user.id);
      } else if (user.role === 'Pastor de Zona') {
        // Assuming Pastor de Zona has a zone_id in their profile
        // For now, we'll fetch all and rely on RLS or a future profile-zone link
      }

      // Apply filters from state
      if (filterMeetingDay) {
        query = query.eq('meeting_day', filterMeetingDay);
      }
      if (filterLeaderId) {
        query = query.eq('leader_id', filterLeaderId);
      }
      if (filterSupervisorId) {
        query = query.eq('supervisor_id', filterSupervisorId);
      }
      if (filterPastorId) {
        query = query.eq('pastor_id', filterPastorId);
      }
      if (filterZoneId) {
        query = query.eq('zone_id', filterZoneId);
      }

      const { data: cellGroupsData, error: cellGroupsError } = await query;

      if (cellGroupsError) {
        console.error('Error fetching cell groups:', cellGroupsError);
        setError('No se pudieron cargar los grupos celulares.');
      } else {
        setCellGroups(cellGroupsData);
      }

      // Fetch profiles for filter dropdowns
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, role');

      if (profilesError) {
        console.error('Error fetching profiles for filters:', profilesError);
        // Don't block if profiles fail, just log error
      } else {
        setProfiles(profilesData);
      }

      setLoading(false);
    }

    if (!authLoading && user) {
      fetchData();
    }
  }, [user, authLoading, filterMeetingDay, filterLeaderId, filterSupervisorId, filterPastorId, filterZoneId]);

  const handleClearFilters = () => {
    setFilterMeetingDay('');
    setFilterLeaderId('');
    setFilterSupervisorId('');
    setFilterPastorId('');
    setFilterZoneId('');
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando autenticación...</p>
      </div>
    );
  }

  // Role-based access control
  if (!user || !['Pastor General', 'Pastor de Zona', 'Supervisor', 'Líder de Célula'].includes(user.role)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Acceso denegado. No tienes permiso para ver esta página.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando grupos celulares...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const canAddGroup = ['Pastor General', 'Pastor de Zona'].includes(user.role);

  return (
    <>
      <Helmet>
        <title>Ver Grupos Celulares - Avivamiento Oaxaca</title>
        <meta name="description" content="Lista de todos los grupos celulares de la iglesia Avivamiento, con detalles de ubicación, horario y líderes." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Grupos Celulares Registrados</h1>
        
        {/* Filter Section */}
        <div className="mb-6 p-4 bg-blanco-puro rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filtrar Grupos Celulares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="filterMeetingDay">Día de Reunión</Label>
              <Select onValueChange={setFilterMeetingDay} value={filterMeetingDay}>
                <SelectTrigger id="filterMeetingDay">
                  <SelectValue placeholder="Todos los días" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los días</SelectItem>
                  {meetingDays.map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterLeader">Líder</Label>
              <Select onValueChange={setFilterLeaderId} value={filterLeaderId}>
                <SelectTrigger id="filterLeader">
                  <SelectValue placeholder="Todos los líderes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los líderes</SelectItem>
                  {profiles.filter(p => p.role === 'Líder de Célula').map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>{profile.full_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterSupervisor">Supervisor</Label>
              <Select onValueChange={setFilterSupervisorId} value={filterSupervisorId}>
                <SelectTrigger id="filterSupervisor">
                  <SelectValue placeholder="Todos los supervisores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los supervisores</SelectItem>
                  {profiles.filter(p => p.role === 'Supervisor').map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>{profile.full_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterPastor">Pastor</Label>
              <Select onValueChange={setFilterPastorId} value={filterPastorId}>
                <SelectTrigger id="filterPastor">
                  <SelectValue placeholder="Todos los pastores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los pastores</SelectItem>
                  {profiles.filter(p => ['Pastor General', 'Pastor de Zona'].includes(p.role)).map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>{profile.full_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* New Zone Filter */}
            {user.role && ['Pastor General', 'Pastor de Zona', 'Superusuario'].includes(user.role) && (
              <div>
                <Label htmlFor="filterZone">Zona</Label>
                <Select onValueChange={setFilterZoneId} value={filterZoneId}>
                  <SelectTrigger id="filterZone">
                    <SelectValue placeholder="Todas las zonas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas las zonas</SelectItem>
                    {zones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="mt-4 text-right">
            <Button onClick={handleClearFilters} variant="outline">
              Limpiar Filtros
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          {canAddGroup && (
            <Link to="/add-cell-group">
              <button className="bg-rojo-espiritual hover:bg-rojo-espiritual-dark text-blanco-puro font-bold py-2 px-4 rounded">
                Añadir Nuevo Grupo
              </button>
            </Link>
          )}
          <p className="text-negro-sagrado">Mostrando {cellGroups.length} grupos</p>
        </div>

        {cellGroups.length === 0 ? (
          <p className="text-center text-negro-sagrado">No hay grupos celulares que coincidan con los filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-blanco-puro text-negro-sagrado uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Dirección</th>
                  <th className="py-3 px-6 text-left">Día/Hora</th>
                  <th className="py-3 px-6 text-left">Líder</th>
                  <th className="py-3 px-6 text-left">Supervisor</th>
                  <th className="py-3 px-6 text-left">Pastor</th>
                  <th className="py-3 px-6 text-left">Zona</th>
                  <th className="py-3 px-6 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {cellGroups.map((group) => (
                  <tr key={group.id} className="border-b border-gray-200 hover:bg-blanco-puro">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{group.name}</td>
                    <td className="py-3 px-6 text-left">{group.address_street}, {group.address_colonia}</td>
                    <td className="py-3 px-6 text-left">{group.meeting_day} {group.meeting_time}</td>
                    <td className="py-3 px-6 text-left">{group.profiles_leader?.full_name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{group.profiles_supervisor?.full_name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{group.profiles_pastor?.full_name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{group.zone?.name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">
                      <Link to={`/add-cell-group/${group.id}`} className="text-rojo-espiritual hover:underline">
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
