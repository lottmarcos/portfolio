-- Optional dev seed for visitor tags UI smoke tests.
insert into public.visitor_city_stats (city, display_city, visit_count, updated_at)
values
  ('são paulo', 'São Paulo', 12, now()),
  ('lisbon', 'Lisbon', 9, now()),
  ('new york', 'New York', 7, now()),
  ('tokyo', 'Tokyo', 6, now()),
  ('berlin', 'Berlin', 5, now()),
  ('london', 'London', 4, now()),
  ('buenos aires', 'Buenos Aires', 3, now()),
  ('paris', 'Paris', 3, now()),
  ('amsterdam', 'Amsterdam', 2, now()),
  ('sydney', 'Sydney', 2, now()),
  ('toronto', 'Toronto', 1, now()),
  ('seoul', 'Seoul', 1, now()),
  ('mumbai', 'Mumbai', 1, now()),
  ('cape town', 'Cape Town', 1, now())
on conflict (city) do nothing;

insert into public.visitor_global_emojis (emoji, count, updated_at)
values
  ('🎉', 14, now()),
  ('👋', 9, now()),
  ('🚀', 7, now()),
  ('💜', 5, now()),
  ('🔥', 4, now()),
  ('✨', 3, now()),
  ('🤙', 3, now()),
  ('🧠', 2, now()),
  ('💻', 2, now()),
  ('🎯', 1, now()),
  ('🌍', 1, now()),
  ('⚡', 1, now())
on conflict (emoji) do nothing;
