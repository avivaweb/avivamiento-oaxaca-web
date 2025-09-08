import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    role: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        let errorMessage = "No se pudo cargar el perfil.";
        if (error.code === "PGRST116") { // No rows found
          errorMessage = "No se encontró información de perfil para este usuario.";
        } else if (error.message.includes("network")) {
          errorMessage = "Problema de conexión. Por favor, verifica tu internet.";
        }
        setError(errorMessage);
        toast({
          title: "Error al Cargar Perfil",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setProfileData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          role: data.role || '',
          email: user.email || '',
        });
      }
      setLoading(false);
    }

    if (!authLoading && user) {
      fetchProfile();
    }
  }, [user, authLoading, toast]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Client-side validation
    if (!profileData.full_name) {
      toast({
        title: "Error de Validación",
        description: "El nombre completo no puede estar vacío.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }
    if (profileData.phone && !/^\d{10}$/.test(profileData.phone)) { // Basic 10-digit phone validation
      toast({
        title: "Error de Validación",
        description: "El número de teléfono debe tener 10 dígitos numéricos.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: profileData.full_name, phone: profileData.phone })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      let errorMessage = "No se pudo actualizar el perfil.";
      if (error.message.includes("duplicate key value")) {
        errorMessage = "Ya existe un perfil con esta información (ej. teléfono duplicado).";
      } else if (error.message.includes("network")) {
        errorMessage = "Problema de conexión. Por favor, verifica tu internet.";
      }
      toast({
        title: "Error al Actualizar Perfil",
        description: errorMessage,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Perfil Actualizado",
        description: "Tu información ha sido guardada correctamente.",
      });
    }
    setSubmitting(false);
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando perfil...</p>
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

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Por favor, <Link to="/login" className="text-custom-red hover:underline">inicia sesión</Link> para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mi Perfil - Avivamiento Oaxaca</title>
        <meta name="description" content="Gestiona tu información de perfil en Avivamiento, incluyendo nombre, teléfono y rol." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gris-oscuro">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={profileData.email} disabled className="bg-gray-100 cursor-not-allowed" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="full_name">Nombre Completo</Label>
              <Input id="full_name" value={profileData.full_name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" value={profileData.phone} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Rol</Label>
              <Input id="role" value={profileData.role} disabled className="bg-gray-100 cursor-not-allowed" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-custom-red hover:bg-opacity-80 text-blanco-puro mt-6" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </form>
      </div>
    </>
  );
}
