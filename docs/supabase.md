# Supabase — portfolio

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) running
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) v2.79+

## Local development

```bash
yarn dev           # Starts local Supabase (Docker), then Next.js with local env
yarn dev:next      # Next.js only (use when DB is already up or you use cloud env in .env.local)
yarn db:status     # Inspect local stack; optional if you maintain .env.local manually
yarn db:start      # Supabase only (same as first step of yarn dev)
```

`yarn dev` runs **sequentially**: `supabase start` must finish before Next.js boots so Postgres and migrations are ready. It is not parallel — that would race the app against an empty database. When Supabase is already running, `supabase start` exits quickly.

Local Supabase URL and keys are injected from `supabase status -o env` for that process (no need to copy keys for daily dev). For production or Vercel, set env vars in the dashboard.

Optional `.env.local` (e.g. `NEXT_PUBLIC_SITE_URL`) is still loaded by Next.js; Supabase vars from `yarn dev` override `.env.local` for the dev server so you always hit local Docker.

Reset local DB (reapply all migrations and seed):

```bash
yarn db:reset
yarn db:verify-visitor-tags   # smoke-test record_visitor_mark RPC
```

## Production

- Use a **separate** Supabase cloud project (not local Docker).
- Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in Vercel **Production**.
- Migrations run via GitHub Actions on push to `main` (`supabase db push`). Required secrets:
  - `SUPABASE_ACCESS_TOKEN`
  - `SUPABASE_PROJECT_REF`

Vercel **Preview** deployments do not reach your local DB; visitor tags degrade to empty state without cloud env vars.

## New migration workflow

1. `supabase migration new <descriptive_name>`
2. Edit SQL under `supabase/migrations/`
3. `yarn db:reset` locally and smoke-test visitor tags
4. Merge to `main` — CI applies to production

## Visitor tags schema

Migration `0002_visitor_tags_decouple.sql` drops legacy `visitor_city_emojis` (city + emoji were incorrectly coupled). Only two tables remain:

| Table | Purpose |
|-------|---------|
| `visitor_city_stats` | Visit count per normalized city (city chips only) |
| `visitor_global_emojis` | Global emoji votes (separate from cities) |

RPC `record_visitor_mark(p_city, p_emoji, p_previous_emoji)` — server-only via service role.

- City and emoji are **decoupled**: send `{ city }` or `{ emoji }`, not both.
- Emoji swap: client sends `previousEmoji` when changing vote; RPC decrements the old emoji and increments the new one.
- GET snapshot is cached with Next.js tag `visitor-tags` (30s); POST calls `revalidateTag('visitor-tags')`.
- Rate limits (per IP, commit on success only): city 1 per 120s after a successful POST; **no limit on emoji** (swap freely).

## Troubleshooting

- Widget empty / **503** on POST: response includes `code` (`not_configured` | `rpc_error`). Run `yarn db:reset` then `yarn db:verify-visitor-tags`. Use `yarn dev` (not `yarn dev:next` alone) so Supabase env is injected.
- **429** on city: one successful city mark per IP per 2 minutes. Emoji POSTs are never rate limited. Failed POSTs (503) do not consume the city slot.
- Stale RPC after pull: migration `0002` defines `record_visitor_mark(p_city, p_emoji, p_previous_emoji)` — reset local DB or `supabase db push` on cloud.
- Picker shows "1": clear `visitor_global_emoji_submitted` in localStorage (legacy flag); the app sanitizes invalid values on load.
- RPC errors after pull: run production migration workflow or `supabase db push` on linked project.
