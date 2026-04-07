-- Create tables
create table if not exists public.galleries (
  id uuid default gen_random_uuid() primary key,
  caption text,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  audio_url text,
  transcript text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS policies
alter table public.galleries enable row level security;
alter table public.messages enable row level security;

-- Public read
create policy \"Public read galleries\" on public.galleries for select using (true);
create policy \"Public read messages\" on public.messages for select using (true);

-- Auth insert (admin approx by logged user)
create policy \"Authenticated insert galleries\" on public.galleries for insert with check (auth.role() = 'authenticated');
create policy \"Authenticated insert messages\" on public.messages for insert with check (auth.role() = 'authenticated');

-- Storage buckets
insert into storage.buckets (id, name, public) 
values ('gallery-bucket', 'gallery-bucket', true) 
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('messages-bucket', 'messages-bucket', true) 
on conflict (id) do nothing;

-- Public read storage
create policy \"Public Access gallery-bucket\" on storage.objects for bucket 'gallery-bucket' using (bucket_id = 'gallery-bucket');
create policy \"Public Access messages-bucket\" on storage.objects for bucket 'messages-bucket' using (bucket_id = 'messages-bucket');
