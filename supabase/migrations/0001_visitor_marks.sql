-- Visitor marks: per-city visit counts and global emoji votes (decoupled).
-- RLS is enabled with no public policies: only the service role (admin client,
-- which bypasses RLS) reads/writes via the record_visitor_mark RPC.

create or replace function public.normalize_city(raw text)
returns text
language sql
immutable
as $$
  select nullif(
    lower(regexp_replace(trim(raw), '\s+', ' ', 'g')),
    ''
  );
$$;

create table public.visitor_city_stats (
  city         text primary key,
  display_city text not null,
  visit_count  integer not null default 0 check (visit_count >= 0),
  updated_at   timestamptz not null default now()
);

create index visitor_city_stats_visit_count_idx
  on public.visitor_city_stats (visit_count desc, updated_at desc);

create table public.visitor_global_emojis (
  emoji      text primary key,
  count      integer not null default 0 check (count >= 0),
  updated_at timestamptz not null default now()
);

create index visitor_global_emojis_count_idx
  on public.visitor_global_emojis (count desc, updated_at desc);

alter table public.visitor_city_stats enable row level security;
alter table public.visitor_global_emojis enable row level security;

-- Records a city visit and/or a global emoji vote. Passing p_previous_emoji
-- moves a vote from one emoji to another (decrement old, increment new).
create or replace function public.record_visitor_mark(
  p_city text default null,
  p_emoji text default null,
  p_previous_emoji text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_city text;
  v_display text;
  v_prev text;
  v_next text;
begin
  v_city := normalize_city(p_city);
  v_display := nullif(trim(p_city), '');
  v_prev := nullif(trim(p_previous_emoji), '');
  v_next := nullif(trim(p_emoji), '');

  if v_city is null and v_next is null then
    raise exception 'At least one of city or emoji is required';
  end if;

  if v_city is not null then
    insert into public.visitor_city_stats as cs (city, display_city, visit_count, updated_at)
    values (v_city, coalesce(v_display, v_city), 1, now())
    on conflict (city) do update
      set visit_count = cs.visit_count + 1,
          display_city = coalesce(v_display, cs.display_city),
          updated_at = now();
  end if;

  if v_next is not null then
    if v_prev is not null and v_prev <> v_next then
      update public.visitor_global_emojis
      set count = count - 1,
          updated_at = now()
      where emoji = v_prev;

      delete from public.visitor_global_emojis
      where emoji = v_prev and count <= 0;
    end if;

    if v_prev is null or v_prev <> v_next then
      insert into public.visitor_global_emojis as ge (emoji, count, updated_at)
      values (v_next, 1, now())
      on conflict (emoji) do update
        set count = ge.count + 1,
            updated_at = now();
    end if;
  end if;

  return jsonb_build_object(
    'top_cities', (
      select coalesce(
        jsonb_agg(
          jsonb_build_object('city', t.city, 'count', t.count)
          order by t.ord
        ),
        '[]'::jsonb
      )
      from (
        select
          cs.display_city as city,
          cs.visit_count as count,
          row_number() over (order by cs.visit_count desc, cs.updated_at desc) as ord
        from public.visitor_city_stats cs
        order by cs.visit_count desc, cs.updated_at desc
        limit 5
      ) t
    ),
    'top_emojis', (
      select coalesce(
        jsonb_agg(
          jsonb_build_object('emoji', e.emoji, 'count', e.count)
          order by e.ord
        ),
        '[]'::jsonb
      )
      from (
        select
          ge.emoji,
          ge.count,
          row_number() over (order by ge.count desc, ge.updated_at desc) as ord
        from public.visitor_global_emojis ge
        order by ge.count desc, ge.updated_at desc
        limit 5
      ) e
    )
  );
end;
$$;

revoke all on function public.record_visitor_mark(text, text, text) from public;
revoke all on function public.record_visitor_mark(text, text, text) from anon, authenticated;
grant execute on function public.record_visitor_mark(text, text, text) to service_role;

revoke all on function public.normalize_city(text) from public;
grant execute on function public.normalize_city(text) to service_role;
