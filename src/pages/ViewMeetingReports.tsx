import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function ViewMeetingReports() {
  const { user, loading: authLoading } = useAuth();
  const [reports, setReports] = useState([]);
  const [cellGroupsForFilter, setCellGroupsForFilter] = useState([]); // For cell group filter dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterCellGroupId, setFilterCellGroupId] = useState(''); // New filter for cell group ID

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      setError(null);
      
      if (!user) {
        setLoading(false);
        return;
      }

      let query = supabase
        .from('meeting_reports')
        .select(`
          id,
          meeting_date,
          total_attendees,
          total_kids,
          new_visitors,
          christ_decisions,
          offering_amount,
          testimonies,
          prayer_requests,
          leader_observations,
          cell_group_id,
          cell_groups (name, leader_id, profiles_leader:leader_id (full_name))
        `)
        .order('meeting_date', { ascending: false });

      let accessibleCellGroupIds = [];

      // Determine accessible cell groups based on role
      if (user.role === 'Líder de Célula') {
        const { data: leaderCellGroups, error: cellGroupError } = await supabase
          .from('cell_groups')
          .select('id, name')
          .eq('leader_id', user.id);

        if (cellGroupError) {
          console.error("Error fetching leader's cell groups:", cellGroupError);
          setError('No se pudieron cargar los reportes de tus grupos.');
          setLoading(false);
          return;
        }
        accessibleCellGroupIds = leaderCellGroups.map(group => group.id);
        setCellGroupsForFilter(leaderCellGroups);
      } else if (user.role === 'Supervisor') {
        const { data: supervisorCellGroups, error: cellGroupError } = await supabase
          .from('cell_groups')
          .select('id, name')
          .eq('supervisor_id', user.id);

        if (cellGroupError) {
          console.error("Error fetching supervisor's cell groups:", cellGroupError);
          setError('No se pudieron cargar los reportes de tus grupos supervisados.');
          setLoading(false);
          return;
        }
        accessibleCellGroupIds = supervisorCellGroups.map(group => group.id);
        setCellGroupsForFilter(supervisorCellGroups);
      } else if (['Pastor General', 'Pastor de Zona'].includes(user.role)) {
        const { data: allCellGroups, error: cellGroupError } = await supabase
          .from('cell_groups')
          .select('id, name');
        
        if (cellGroupError) {
          console.error("Error fetching all cell groups:", cellGroupError);
          setError('No se pudieron cargar los grupos celulares.');
          setLoading(false);
          return;
        }
        accessibleCellGroupIds = allCellGroups.map(group => group.id);
        setCellGroupsForFilter(allCellGroups);
      }

      // Apply cell group ID filter if selected
      if (filterCellGroupId) {
        query = query.eq('cell_group_id', filterCellGroupId);
      } else if (accessibleCellGroupIds.length > 0) {
        // If no specific cell group is selected, but user has restricted access, filter by accessible groups
        query = query.in('cell_group_id', accessibleCellGroupIds);
      } else if (user.role === 'Líder de Célula' || user.role === 'Supervisor') {
        // If a leader/supervisor has no assigned cell groups, show no reports
        setReports([]);
        setLoading(false);
        return;
      }

      // Apply date range filters
      if (filterStartDate) {
        query = query.gte('meeting_date', filterStartDate);
      }
      if (filterEndDate) {
        query = query.lte('meeting_date', filterEndDate);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching reports:', fetchError);
        setError('No se pudieron cargar los reportes.');
      } else {
        setReports(data);
      }
      setLoading(false);
    }

    if (!authLoading && user) {
      fetchReports();
    }
  }, [user, authLoading, filterStartDate, filterEndDate, filterCellGroupId]);

  const handleClearFilters = () => {
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterCellGroupId('');
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando autenticación...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Por favor, <Link to="/login" className="text-rojo-espiritual hover:underline">inicia sesión</Link> para ver los reportes.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando reportes...</p>
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

  return (
    <>
      <Helmet>
        <title>Ver Reportes de Reunión - Avivamiento Oaxaca</title>
        <meta name="description" content="Visualiza los reportes semanales de las reuniones de grupos celulares de la iglesia Avivamiento." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Reportes de Reunión</h1>
        
        {/* Filter Section */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filtrar Reportes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="filterStartDate">Fecha Inicio</Label>
              <Input id="filterStartDate" type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterEndDate">Fecha Fin</Label>
              <Input id="filterEndDate" type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
            </div>
            {/* Cell Group Filter for Supervisors and Pastors */}
            {user.role && (user.role === 'Supervisor' || ['Pastor General', 'Pastor de Zona'].includes(user.role)) && (
              <div>
                <Label htmlFor="filterCellGroup">Grupo Celular</Label>
                <Select onValueChange={setFilterCellGroupId} value={filterCellGroupId}>
                  <SelectTrigger id="filterCellGroup">
                    <SelectValue placeholder="Todos los grupos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los grupos</SelectItem>
                    {cellGroupsForFilter.map((group) => (
                      <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
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

        {reports.length === 0 ? (
          <p className="text-center text-gray-600">No hay reportes de reunión que coincidan con los filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Grupo Celular</th>
                  <th className="py-3 px-6 text-left">Líder</th>
                  <th className="py-3 px-6 text-left">Asistentes</th>
                  <th className="py-3 px-6 text-left">Decisiones</th>
                  <th className="py-3 px-6 text-left">Ofrenda</th>
                  <th className="py-3 px-6 text-left">Testimonios</th>
                  <th className="py-3 px-6 text-left">Observaciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{new Date(report.meeting_date).toLocaleDateString()}</td>
                    <td className="py-3 px-6 text-left">{report.cell_groups?.name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{report.cell_groups?.profiles_leader?.full_name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{report.total_attendees}</td>
                    <td className="py-3 px-6 text-left">{report.christ_decisions}</td>
                    <td className="py-3 px-6 text-left">${report.offering_amount?.toFixed(2) || '0.00'}</td>
                    <td className="py-3 px-6 text-left line-clamp-2" title={report.testimonies}>{report.testimonies || 'N/A'}</td>
                    <td className="py-3 px-6 text-left line-clamp-2" title={report.leader_observations}>{report.leader_observations || 'N/A'}</td>
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

