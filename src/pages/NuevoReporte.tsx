import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export default function NuevoReporte() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [cellGroup, setCellGroup] = useState(null);
  const [formData, setFormData] = useState({
    meeting_date: '',
    total_attendees: '',
    total_kids: '',
    new_visitors: '',
    visitor_names: '',
    christ_decisions: '',
    offering_amount: '',
    testimonies: '',
    prayer_requests: '',
    leader_observations: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeaderCellGroup() {
      setLoading(true);
      setError(null);

      if (!user || user.role !== 'Líder de Célula') {
        toast({
          title: "Acceso Denegado",
          description: "Solo los líderes de célula pueden enviar reportes.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      // Fetch the cell group where the current user is the leader
      const { data, error } = await supabase
        .from('cell_groups')
        .select('id, name')
        .eq('leader_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching cell group for leader:', error);
        setError('No se encontró un grupo celular asociado a tu cuenta. Por favor, contacta a tu supervisor.');
        setLoading(false);
        return;
      }

      setCellGroup(data);
      // Set default meeting date to today
      setFormData(prev => ({ ...prev, meeting_date: new Date().toISOString().split('T')[0] }));
      setLoading(false);
    }

    if (!authLoading && user) {
      fetchLeaderCellGroup();
    }
  }, [user, authLoading, navigate, toast]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Client-side validation
    if (!cellGroup) {
      toast({
        title: "Error",
        description: "No se pudo asociar el reporte a un grupo celular. Contacta a soporte.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    if (!formData.meeting_date) {
      toast({
        title: "Error de Validación",
        description: "La fecha de la reunión es requerida.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    if (new Date(formData.meeting_date) > new Date()) {
      toast({
        title: "Error de Validación",
        description: "La fecha de la reunión no puede ser en el futuro.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    if (isNaN(parseInt(formData.total_attendees))) {
      toast({
        title: "Error de Validación",
        description: "El número de asistentes debe ser un número válido.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    if (formData.new_visitors > 0 && !formData.visitor_names.trim()) {
      toast({
        title: "Error de Validación",
        description: "Si hay visitantes nuevos, sus nombres y contacto son requeridos.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('meeting_reports')
        .insert([
          {
            ...formData,
            cell_group_id: cellGroup.id,
            total_attendees: parseInt(formData.total_attendees) || 0,
            total_kids: parseInt(formData.total_kids) || 0,
            new_visitors: parseInt(formData.new_visitors) || 0,
            christ_decisions: parseInt(formData.christ_decisions) || 0,
            offering_amount: parseFloat(formData.offering_amount) || 0,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Reporte Enviado",
        description: "El reporte de la reunión ha sido enviado exitosamente.",
      });
      navigate('/view-meeting-reports'); // Redirect to view reports
    } catch (err) {
      console.error('Error submitting report:', err);
      let errorMessage = "Ocurrió un error inesperado al enviar el reporte.";
      if (err.message.includes("duplicate key value")) {
        errorMessage = "Ya existe un reporte para esta fecha y grupo celular.";
      } else if (err.message.includes("network")) {
        errorMessage = "Problema de conexión. Por favor, verifica tu internet.";
      } else {
        errorMessage = err.message; // Fallback to generic message
      }
      setError(errorMessage);
      toast({
        title: "Error al Enviar Reporte",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando...</p>
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

  if (!cellGroup) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>No se encontró un grupo celular asociado a tu cuenta. Por favor, contacta a tu supervisor para que te asigne a un grupo.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Nuevo Reporte de Reunión - Avivamiento Oaxaca</title>
        <meta name="description" content="Formulario para enviar el reporte semanal de la reunión de grupo celular." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-blanco-puro py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-lg shadow-md border border-gray-200">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reporte de Reunión de {cellGroup.name}
            </h2>
            <p className="mt-2 text-center text-sm text-negro-sagrado">
              Completa los detalles de la reunión semanal de tu grupo celular.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="meeting_date">Fecha de la Reunión</Label>
                <Input id="meeting_date" type="date" value={formData.meeting_date} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="total_attendees">Número de Asistentes (Adultos)</Label>
                <Input id="total_attendees" type="number" value={formData.total_attendees} onChange={handleChange} required min="0" />
              </div>
              <div>
                <Label htmlFor="total_kids">Número de Niños</Label>
                <Input id="total_kids" type="number" value={formData.total_kids} onChange={handleChange} min="0" />
              </div>
              <div>
                <Label htmlFor="new_visitors">Visitantes Nuevos</Label>
                <Input id="new_visitors" type="number" value={formData.new_visitors} onChange={handleChange} min="0" />
              </div>
              <div className="col-span-full">
                <Label htmlFor="visitor_names">Nombres y Contacto de Visitantes</Label>
                <Textarea id="visitor_names" value={formData.visitor_names} onChange={handleChange} placeholder="Ej: Juan Pérez (555-1234), María García (maria@email.com)" />
              </div>
              <div>
                <Label htmlFor="christ_decisions">Decisiones por Cristo</Label>
                <Input id="christ_decisions" type="number" value={formData.christ_decisions} onChange={handleChange} min="0" />
              </div>
              <div>
                <Label htmlFor="offering_amount">Ofrenda de la Reunión</Label>
                <Input id="offering_amount" type="number" step="0.01" value={formData.offering_amount} onChange={handleChange} min="0" />
              </div>
              <div className="col-span-full">
                <Label htmlFor="testimonies">Testimonios Destacados</Label>
                <Textarea id="testimonies" value={formData.testimonies} onChange={handleChange} placeholder="Breve resumen de los testimonios más impactantes." />
              </div>
              <div className="col-span-full">
                <Label htmlFor="prayer_requests">Peticiones de Oración</Label>
                <Textarea id="prayer_requests" value={formData.prayer_requests} onChange={handleChange} placeholder="Lista las principales peticiones de oración." />
              </div>
              <div className="col-span-full">
                <Label htmlFor="leader_observations">Observaciones del Líder</Label>
                <Textarea id="leader_observations" value={formData.leader_observations} onChange={handleChange} placeholder="Cualquier comentario adicional sobre el ambiente, desafíos o victorias de la célula." />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blanco-puro bg-rojo-espiritual hover:bg-rojo-espiritual-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rojo-espiritual"
                disabled={submitting}
              >
                {submitting ? 'Enviando Reporte...' : 'Enviar Reporte'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}