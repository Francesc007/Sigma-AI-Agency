-- Ejecuta este script en el SQL Editor de tu proyecto Supabase
-- para crear la tabla de leads (auth anon permitida para inserts).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text,
  message text,
  source text default 'website',
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

create policy "Allow anonymous insert"
  on public.leads for insert
  to anon
  with check (true);

-- Opcional: solo tú (authenticated) puedes leer
create policy "Allow authenticated read"
  on public.leads for select
  to authenticated
  using (true);
