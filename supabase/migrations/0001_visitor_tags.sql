-- Visitor Tags: one row per city, with the last emoji left and a visit count.
create table if not exists public.visitor_tags (
  city       text primary key,
  emoji      text not null default '👋',
  count      integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists visitor_tags_count_idx
  on public.visitor_tags (count desc);

-- RLS on; no public policies. Only the service role (admin client) reads/writes,
-- and the service role bypasses RLS. The anon key has no access.
alter table public.visitor_tags enable row level security;

-- Atomic upsert + increment. Returns the new count for the city.
create or replace function public.increment_visitor_tag(p_city text, p_emoji text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.visitor_tags as vt (city, emoji, count, updated_at)
  values (p_city, p_emoji, 1, now())
  on conflict (city) do update
    set count = vt.count + 1,
        emoji = excluded.emoji,
        updated_at = now()
  returning vt.count into new_count;

  return new_count;
end;
$$;
