-- 1. Create profiles table (Required for Policies)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  full_name text,
  phone text,
  zone text,
  role text,
  updated_at timestamp with time zone,
  constraint role_check check (role in ('Lider de Celula', 'Supervisor', 'Pastor de Zona', 'Pastor General', 'admin', 'CMAvivamiento'))
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);


-- 2. Create grupos_familiares table (minimal scaffold)
CREATE TABLE IF NOT EXISTS public.grupos_familiares (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text not null,
    leader_id uuid references auth.users(id),
    created_at timestamptz DEFAULT now()
);

-- Enable RLS for grupos_familiares
ALTER TABLE public.grupos_familiares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON public.grupos_familiares FOR SELECT USING (true);
GRANT ALL ON public.grupos_familiares TO authenticated;
GRANT ALL ON public.grupos_familiares TO service_role;


-- 3. Create or update celula_reports table
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

-- Enable RLS for celula_reports
ALTER TABLE public.celula_reports ENABLE ROW LEVEL SECURITY;

-- Policies for celula_reports
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
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'Pastor de Zona', 'Pastor General')
  )
);

-- Grant access
GRANT ALL ON public.celula_reports TO authenticated;
GRANT ALL ON public.celula_reports TO service_role;
