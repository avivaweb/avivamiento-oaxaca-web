-- Create subscriber table (serving as Leads module)
create table if not exists public.subscriber (
  id uuid default gen_random_uuid() primary key,
  full_name text,
  email text not null, -- kept as not null for newsletter, but form might be flexible? Form requires email.
  phone text, -- encompasses whatsapp_number
  preference text, -- 'presencial' | 'online'
  whatsapp_number text, -- keeping for backward compatibility if needed, or alias to phone
  source text default 'web', -- to track origin
  status text default 'nuevo', -- nuevo, contactado, asignado
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.subscriber enable row level security;

-- Policies
create policy "Public insert access" on public.subscriber for insert with check (true);
create policy "Admins can view subscribers" on public.subscriber for select using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'Pastor General', 'CMAvivamiento')
);
