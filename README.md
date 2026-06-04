# Portfolio — Marcos Lott

Personal brand platform built with Next.js 16, TypeScript, Tailwind CSS v4, and Supabase.

## Getting Started

### Prerequisites

- Node.js 24.15+ (use `nvm install` — version pinned in `.nvmrc`)
- Yarn 1.22+

### Setup

```bash
nvm install        # installs Node version from .nvmrc
nvm use            # activates it
yarn install       # installs dependencies
cp .env.example .env.local
```

Fill in the environment variables in `.env.local`:

| Variable | Where to find | Required |
|----------|--------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API | Only for admin operations |

### Development

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) for local Supabase (visitor tags).

```bash
yarn dev          # Local Supabase + Next.js (see docs/supabase.md)
yarn dev:next     # Next.js only
yarn build        # Production build
yarn lint         # ESLint
yarn typecheck    # TypeScript strict check
```

`yarn dev` injects local Supabase URL and keys automatically; you do not need cloud keys in `.env.local` for local work.

### Theme

The project uses the Dracula Theme color palette with full dark/light mode support:

- **Dark mode**: Dracula Classic
- **Light mode**: Alucard Classic

Theme follows system preference by default. Controlled via `next-themes`.

## Architecture

See `docs/architecture/system-overview.md` for the full architecture overview and `docs/ai/` for the AI development workflow.
