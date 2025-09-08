import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/supabaseClient';
// Se actualizan las importaciones para usar la extensión .tsx, reflejando la migración del proyecto a TypeScript.
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useToast } from '@/components/ui/use-toast.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';

export default function AddCellGroup() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL for editing
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    address_street: '',
    address_number: '',
    address_colonia: '',
    address_municipality: '',
    address_postal_code: '',
    address_reference: '',
    location_url: '',
    meeting_day: '',
    meeting_time: '',
    host_id: '',
    leader_id: '',
    assistant_id: '',
    secretary_id: '',
    treasurer_id: '',
    kids_teacher_id: '',
    supervisor_id: '',
    pastor_id: '',
    zone_id: '', // Add zone_id to form data
  });

  const [profiles, setProfiles] = useState([]);
  const [zones, setZones] = useState([]); // State for zones
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const meetingDays = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  useEffect(() => {
    async function fetchProfilesZonesAndCellGroup() {
      setLoading(true);
      setError(null);

      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, role');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        setError('No se pudieron cargar los perfiles de usuario.');
        setLoading(false);
        return;
      } else {
        setProfiles(profilesData);
      }

      // Fetch zones
      const { data: zonesData, error: zonesError } = await supabase
        .from('zones')
        .select('id, name');

      if (zonesError) {
        console.error('Error fetching zones:', zonesError);
        setError('No se pudieron cargar las zonas.');
        setLoading(false);
        return;
      } else {
        setZones(zonesData);
      }

      // Fetch cell group data if in edit mode
      if (id) {
        const { data: cellGroupData, error: cellGroupError } = await supabase
          .from('cell_groups')
          .select('*')
          .eq('id', id)
          .single();

        if (cellGroupError) {
          console.error('Error fetching cell group:', cellGroupError);
          setError('No se pudo cargar la información del grupo celular.');
          setLoading(false);
          return;
        } else {
          setFormData(cellGroupData);
        }
      }
      setLoading(false);
    }

    if (!authLoading) {
      if (!user || !['Pastor General', 'Pastor de Zona'].includes(user.role)) {
        toast({
          title: "Acceso Denegado",
          description: "No tienes permiso para acceder a esta página.",
          variant: "destructive",
        });
        navigate('/'); // Redirect to home or login
        return;
      }
      fetchProfilesZonesAndCellGroup();
    }
  }, [user, authLoading, navigate, toast, id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
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
    if (!formData.name) {
      toast({
        title: "Error de Validación",
        description: "El nombre del grupo celular es requerido.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    if (formData.location_url && !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(formData.location_url)) {
      toast({
        title: "Error de Validación",
        description: "Por favor, introduce una URL de ubicación válida.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    if (formData.address_postal_code && !/^\d{5}$/.test(formData.address_postal_code)) {
      toast({
        title: "Error de Validación",
        description: "El código postal debe ser un número de 5 dígitos.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    try {
      let operation;
      if (id) {
        // Update existing cell group
        operation = await supabase
          .from('cell_groups')
          .update(formData)
          .eq('id', id)
          .select();
      } else {
        // Insert new cell group
        operation = await supabase
          .from('cell_groups')
          .insert([formData])
          .select();
      }

      const { data, error } = operation;

      if (error) {
        throw error;
      }

      toast({
        title: id ? "Grupo Celular Actualizado" : "Grupo Celular Creado",
        description: id ? "El grupo celular ha sido actualizado exitosamente." : "El nuevo grupo celular ha sido registrado exitosamente.",
      });
      navigate('/view-cell-groups'); // Redirect to view all cell groups
    } catch (err) {
      console.error('Error saving cell group:', err);
      let errorMessage = "Ocurrió un error inesperado al guardar el grupo celular.";
      if (err.code === "23505") { // Unique violation
        errorMessage = "Ya existe un grupo celular con este nombre.";
      } else if (err.message.includes("network")) {
        errorMessage = "Problema de conexión. Por favor, verifica tu internet.";
      } else {
        errorMessage = err.message; // Fallback to generic message
      }
      setError(errorMessage);
      toast({
        title: "Error al Guardar Grupo Celular",
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

  return (
    <>
      <Helmet>
        <title>{id ? 'Editar' : 'Añadir'} Grupo Celular - Avivamiento Oaxaca</title>
        <meta name="description" content={id ? 'Formulario para editar un grupo celular existente en la base de datos de Avivamiento.' : 'Formulario para añadir un nuevo grupo celular a la base de datos de Avivamiento.'} />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-blanco-puro py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-lg shadow-md border border-gray-200">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {id ? 'Editar Grupo Celular' : 'Añadir Nuevo Grupo Celular'}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="col-span-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Información Básica</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Nombre del Grupo Celular</Label>
                    <Input id="name" type="text" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="meeting_day">Día de Reunión</Label>
                    <Select onValueChange={(value) => handleSelectChange('meeting_day', value)} value={formData.meeting_day}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un día" />
                      </SelectTrigger>
                      <SelectContent>
                        {meetingDays.map((day) => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="meeting_time">Hora de Reunión</Label>
                    <Input id="meeting_time" type="time" value={formData.meeting_time} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="zone_id">Zona</Label>
                    <Select onValueChange={(value) => handleSelectChange('zone_id', value)} value={formData.zone_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una zona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Sin Zona</SelectItem>
                        {zones.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address Info */}
              <div className="col-span-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Dirección</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address_street">Calle</Label>
                    <Input id="address_street" type="text" value={formData.address_street} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="address_number">Número Exterior/Interior</Label>
                    <Input id="address_number" type="text" value={formData.address_number} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="address_colonia">Colonia</Label>
                    <Input id="address_colonia" type="text" value={formData.address_colonia} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="address_municipality">Municipio</Label>
                    <Input id="address_municipality" type="text" value={formData.address_municipality} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="address_postal_code">Código Postal</Label>
                    <Input id="address_postal_code" type="text" value={formData.address_postal_code} onChange={handleChange} />
                  </div>
                  <div className="col-span-full">
                    <Label htmlFor="address_reference">Referencia de Dirección</Label>
                    <Input id="address_reference" type="text" value={formData.address_reference} onChange={handleChange} />
                  </div>
                  <div className="col-span-full">
                    <Label htmlFor="location_url">URL de Ubicación (Google Maps, etc.)</Label>
                    <Input id="location_url" type="url" value={formData.location_url} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="col-span-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Miembros del Equipo</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leader_id">Líder</Label>
                    <Select onValueChange={(value) => handleSelectChange('leader_id', value)} value={formData.leader_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un líder" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="host_id">Anfitrión</Label>
                    <Select onValueChange={(value) => handleSelectChange('host_id', value)} value={formData.host_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un anfitrión" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assistant_id">Asistente</Label>
                    <Select onValueChange={(value) => handleSelectChange('assistant_id', value)} value={formData.assistant_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un asistente" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="secretary_id">Secretario</Label>
                    <Select onValueChange={(value) => handleSelectChange('secretary_id', value)} value={formData.secretary_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un secretario" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="treasurer_id">Tesorero</Label>
                    <Select onValueChange={(value) => handleSelectChange('treasurer_id', value)} value={formData.treasurer_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tesorero" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="kids_teacher_id">Maestro de Niños</Label>
                    <Select onValueChange={(value) => handleSelectChange('kids_teacher_id', value)} value={formData.kids_teacher_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un maestro" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Hierarchy Members */}
              <div className="col-span-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Jerarquía</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supervisor_id">Supervisor</Label>
                    <Select onValueChange={(value) => handleSelectChange('supervisor_id', value)} value={formData.supervisor_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un supervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pastor_id">Pastor</Label>
                    <Select onValueChange={(value) => handleSelectChange('pastor_id', value)} value={formData.pastor_id}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un pastor" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>{profile.full_name} ({profile.role})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blanco-puro bg-rojo-espiritual hover:bg-rojo-espiritual-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rojo-espiritual"
                disabled={submitting}
              >
                {submitting ? 'Guardando...' : 'Crear Grupo Celular'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}