##create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  registration_number text unique not null,
  allowed_passengers int not null,
  isAvailable boolean default true,
  driver_id uuid references users(id),
  owner_id uuid references users(id),
  rate_per_km numeric not null,
  created_at timestamp default now()
)