##create table if not exists trips(
id uuid primary key default gen_random_uuid(),
customer_id uuid references users(id),
vehicle_id uuid references vehicles(id),
start_date date,
end_date date,
location text,
diatance_km numeric not null,
passengers int not null,
tripCost numeric,
isCompleted boolean default false,
created_at timestamp default now()
)
