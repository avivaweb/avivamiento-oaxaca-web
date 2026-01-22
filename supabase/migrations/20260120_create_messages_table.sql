-- Messages table for YouTube content synchronization
-- Created: 2026-01-20
-- Purpose: Store and manage YouTube videos with series grouping

CREATE TABLE IF NOT EXISTS public.messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    -- YouTube Data
    video_id text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    published_at timestamptz NOT NULL,
    thumbnail_url text,
    
    -- Series Detection (auto-populated from title parsing)
    serie_name text,
    
    -- Metadata
    view_count integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    
    -- Ensure video_id is unique
    CONSTRAINT unique_video_id UNIQUE (video_id)
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view messages)
CREATE POLICY "Public read access to messages" 
ON public.messages FOR SELECT 
USING (true);

-- Admin/Service write access (only authenticated admins can manage)
CREATE POLICY "Admin can insert messages" 
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('Pastor General', 'CMAvivamiento', 'admin')
    )
);

CREATE POLICY "Admin can update messages" 
ON public.messages FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('Pastor General', 'CMAvivamiento', 'admin')
    )
);

CREATE POLICY "Admin can delete messages" 
ON public.messages FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('Pastor General', 'CMAvivamiento', 'admin')
    )
);

-- Performance indexes
CREATE INDEX idx_messages_published_at ON public.messages(published_at DESC);
CREATE INDEX idx_messages_serie_name ON public.messages(serie_name) WHERE serie_name IS NOT NULL;
CREATE INDEX idx_messages_video_id ON public.messages(video_id);
CREATE INDEX idx_messages_featured ON public.messages(is_featured) WHERE is_featured = true;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER messages_updated_at
    BEFORE UPDATE ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION update_messages_updated_at();

-- Grant permissions
GRANT SELECT ON public.messages TO anon;
GRANT ALL ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

-- Add helpful comment
COMMENT ON TABLE public.messages IS 'YouTube videos synchronized from Avivamiento Oaxaca channel with automatic series detection';
COMMENT ON COLUMN public.messages.serie_name IS 'Automatically extracted from titles containing colon (e.g., "Vida Zoé: Parte 1" -> "Vida Zoé")';
