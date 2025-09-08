-- Migración para crear la tabla 'about_us' en Supabase
-- Propósito: Almacenar la información de la página "Quiénes Somos" de Avivamiento.

CREATE TABLE public.about_us (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    section_title TEXT NOT NULL,
    content TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- Habilitar Row Level Security (RLS) para la tabla 'about_us'
ALTER TABLE public.about_us ENABLE ROW LEVEL SECURITY;

-- Crear política de seguridad para permitir acceso de lectura público
-- Esto permitirá que cualquier usuario autenticado o anónimo pueda leer los datos de esta tabla.
CREATE POLICY "Public read access for about_us" ON public.about_us
FOR SELECT USING (true);
