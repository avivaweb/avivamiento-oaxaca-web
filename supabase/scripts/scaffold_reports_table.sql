-- Create or update celula_reports table
CREATE TABLE IF NOT EXISTS public.celula_reports (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    date date NOT NULL DEFAULT CURRENT_DATE,
    
    -- Relationships
    cell_id uuid REFERENCES public.grupos_familiares(id),
    user_id uuid REFERENCES auth.users(id),
    supervisor_id uuid REFERENCES auth.users(id),
    
    -- Metrics (Cosecha)
    adults_attendance integer DEFAULT 0,
    children_attendance integer DEFAULT 0,
    new_decisions integer DEFAULT 0, -- Nuevos invitados/decisiones
    
    -- Stewardship (Mayordomía)
    offering numeric DEFAULT 0,
    
    -- Edification (Edificación)
    lesson_topic text,
    
    -- Glory & Power (Gloria y Poder)
    testimonies text,
    prayer_requests text,
    
    -- Metadata
    week_number integer,
    year integer DEFAULT 2026
);

-- Enable RLS
ALTER TABLE public.celula_reports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own reports" 
ON public.celula_reports FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Supervisors can view reports from their cell leaders" 
ON public.celula_reports FOR SELECT 
TO authenticated 
USING (
  auth.uid() = supervisor_id OR 
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'pastor_zona', 'pastor_general')
  )
);

-- Grant access
GRANT ALL ON public.celula_reports TO authenticated;
GRANT ALL ON public.celula_reports TO service_role;
