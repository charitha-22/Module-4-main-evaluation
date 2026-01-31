##create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password text not null,
  role text not null check(role in ('customer','owner','driver')),
  created_at timestamp default now()
);