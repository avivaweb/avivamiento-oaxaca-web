-- Create Disciples Table if it doesn't exist
create table if not exists public.discipulos (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone text,
  status text check (status in ('Activo', 'En Riesgo', 'Inactivo')) default 'Activo',
  conversion_date timestamp with time zone default timezone('utc'::text, now()),
  leader_id uuid references auth.users(id),
  last_attendance_date timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Fix column name mismatch if table existed with 'lider_id'
do $$
begin
  if exists(select 1 from information_schema.columns where table_schema = 'public' and table_name = 'discipulos' and column_name = 'lider_id') then
    alter table public.discipulos rename column lider_id to leader_id;
  end if;
end $$;

-- Ensure leader_id is not null (after rename or creation)
alter table public.discipulos alter column leader_id set not null;

-- Enable RLS
alter table public.discipulos enable row level security;

-- Drop existing policies to avoid conflicts during re-run
drop policy if exists "Leaders can view their own disciples" on public.discipulos;
drop policy if exists "Leaders can insert their own disciples" on public.discipulos;
drop policy if exists "Leaders can update their own disciples" on public.discipulos;
drop policy if exists "Admins and Pastors can view all disciples" on public.discipulos;

-- Policies for Disciples
create policy "Leaders can view their own disciples"
  on public.discipulos for select
  using (auth.uid() = leader_id);

create policy "Leaders can insert their own disciples"
  on public.discipulos for insert
  with check (auth.uid() = leader_id);

create policy "Leaders can update their own disciples"
  on public.discipulos for update
  using (auth.uid() = leader_id);

-- Pastor General and Admins can view all disciples
-- Using auth.jwt() to check roles directly from the token/metadata avoids dependency on a profiles table if it doesn't exist
create policy "Admins and Pastors can view all disciples"
  on public.discipulos for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') in ('Pastor General', 'admin', 'CMAvivamiento')
    OR
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('Pastor General', 'admin', 'CMAvivamiento')
  );

-- Create Attendance Table (Linking Table)
create table if not exists public.discipulo_attendance (
  id uuid default gen_random_uuid() primary key,
  discipulo_id uuid references public.discipulos(id) not null,
  report_id uuid references public.celula_reports(id) not null,
  attended boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.discipulo_attendance enable row level security;

-- Drop existing policies for attendance
drop policy if exists "Leaders can view their attendance records" on public.discipulo_attendance;
drop policy if exists "Leaders can insert attendance" on public.discipulo_attendance;

-- Policies for Attendance
create policy "Leaders can view their attendance records"
  on public.discipulo_attendance for select
  using (
    exists (
      select 1 from public.discipulos
      where id = discipulo_attendance.discipulo_id and leader_id = auth.uid()
    )
  );

create policy "Leaders can insert attendance"
  on public.discipulo_attendance for insert
  with check (
     exists (
      select 1 from public.discipulos
      where id = discipulo_id and leader_id = auth.uid()
    )
  );

-- Function to update last_attendance_date automatically
create or replace function update_last_attendance()
returns trigger as $$
begin
  update public.discipulos
  set last_attendance_date = new.created_at
  where id = new.discipulo_id;
  return new;
end;
$$ language plpgsql;

-- Drop trigger if exists to avoid duplication error (though create trigger if not exists isn't std sql, we can drop first)
drop trigger if exists on_attendance_insert on public.discipulo_attendance;

create trigger on_attendance_insert
  after insert on public.discipulo_attendance
  for each row
  execute function update_last_attendance();
