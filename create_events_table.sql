-- SQL para la creación de la tabla 'eventos' en Supabase
-- Esta tabla almacenará la información de los eventos de la iglesia 'Avivamiento'.

CREATE TABLE public.eventos (
    -- Identificador único del evento. UUID es ideal para evitar colisiones y para URLs limpias.
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Título del evento. Crucial para el SEO (palabra clave principal) y la usabilidad (lo primero que ve el usuario).
    title TEXT NOT NULL,

    -- Descripción detallada del evento. Importante para el contenido SEO y para informar al usuario.
    description TEXT,

    -- Fecha y hora del evento. Fundamental para la usabilidad (calendarios) y para Schema.org Event.
    date TIMESTAMP WITH TIME ZONE,

    -- URL de la imagen promocional del evento. Mejora la usabilidad visual y es importante para el SEO de imágenes y redes sociales.
    image_url TEXT,

    -- Indica si el evento es público y debe mostrarse en la web. Útil para la gestión interna.
    is_public BOOLEAN DEFAULT TRUE,

    -- Marca de tiempo de creación del registro. Útil para ordenar y para auditoría.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    -- Ubicación física o virtual del evento. Esencial para la usabilidad (cómo llegar) y para Schema.org Event.
    location TEXT
);

-- Opcional: Crear un índice en la columna 'date' para optimizar las consultas por fecha.
CREATE INDEX idx_eventos_date ON public.eventos (date);

-- Opcional: Habilitar Row Level Security (RLS) para controlar el acceso a los datos.
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- Opcional: Definir políticas de RLS (ejemplo: todos pueden leer, solo admins pueden insertar/actualizar/eliminar).
-- CREATE POLICY "Enable read access for all users" ON public.eventos FOR SELECT USING (true);
-- CREATE POLICY "Enable insert for authenticated users only" ON public.eventos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
