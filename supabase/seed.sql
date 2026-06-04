-- Optional dev seed for visitor tags UI smoke tests.
insert into public.visitor_city_stats (city, display_city, visit_count, updated_at)
values
  ('são paulo', 'São Paulo', 3, now()),
  ('lisbon', 'Lisbon', 2, now())
on conflict (city) do nothing;

insert into public.visitor_global_emojis (emoji, count, updated_at)
values
  ('🎉', 4, now()),
  ('👋', 2, now())
on conflict (emoji) do nothing;
