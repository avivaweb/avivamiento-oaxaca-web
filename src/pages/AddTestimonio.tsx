
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext'; // 1. Importar el hook de autenticación
import { useNavigate } from 'react-router-dom';

// Componentes de UI
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AddTestimonio = () => {
  const { user } = useAuth(); // 2. Obtener el usuario actual del contexto
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    video_url: '',
    image_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- FUNCIÓN handleSubmit --- 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validación de Datos
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, asegúrate de que el título y el contenido no estén vacíos.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
        toast({
            title: "Error de autenticación",
            description: "Debes iniciar sesión para poder enviar un testimonio.",
            variant: "destructive",
        });
        return;
    }

    setIsSubmitting(true);

    try {
      // 2. Inserción en Supabase
      const { error } = await supabase
        .from('testimonios')
        .insert([{
          title: formData.title,
          content: formData.content,
          video_url: formData.video_url || null,
          image_url: formData.image_url || null,
          user_id: user.id, // Asociar el testimonio con el ID del usuario
        }]);

      if (error) {
        // Si hay un error en la inserción, lanzarlo para que lo capture el catch
        throw error;
      }

      // 3. Manejo de Éxito
      toast({
        title: "¡Testimonio Enviado!",
        description: "Gracias por compartir lo que Dios ha hecho. Tu testimonio ha sido enviado para revisión.",
      });
      
      // Redirigir a la página de testimonios después de un envío exitoso
      navigate('/testimonios');

    } catch (err) {
      // 3. Manejo de Fracaso
      console.error('Error al enviar el testimonio:', err.message);
      toast({
        title: "Error al enviar",
        description: `No se pudo guardar el testimonio. Por favor, inténtalo de nuevo. (${err.message})`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-spiritual-red mb-8 text-center">Añadir Nuevo Testimonio</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        
        <div className="mb-4">
          <Label htmlFor="title">Título del Testimonio</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <Label htmlFor="content">Contenido del Testimonio</Label>
          <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="8" required />
        </div>

        <div className="mb-4">
          <Label htmlFor="video_url">URL del Video (Opcional)</Label>
          <Input id="video_url" name="video_url" type="url" value={formData.video_url} onChange={handleChange} />
        </div>

        <div className="mb-6">
          <Label htmlFor="image_url">URL de la Imagen (Opcional)</Label>
          <Input id="image_url" name="image_url" type="url" value={formData.image_url} onChange={handleChange} />
        </div>

        <div className="flex items-center justify-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar mi Testimonio'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonio;
