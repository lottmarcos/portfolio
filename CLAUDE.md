# Portfolio — Marcos Lott

Personal brand platform built with Next.js. Communicates technical seniority, visual taste, architectural clarity, and pragmatic use of AI in development.

## Stack

- Next.js 16+ (App Router, Server Components default)
- React 19+, TypeScript (strict)
- Tailwind CSS v4, shadcn/ui (base-nova style)
- Color palette: Dracula Theme (dark: Dracula Classic, light: Alucard Classic)
- Supabase (data layer, auth-ready)
- next-themes (dark/light mode)
- Deployed on Vercel

## Project Structure

```
src/
  app/           # App Router pages and layouts
  components/    # Shared UI components (theme-provider, ui/)
  lib/           # Utilities, types, Supabase clients
    supabase/    # client.ts (browser), server.ts (SSR), admin.ts (service role)
    utils.ts     # cn() and shared helpers
    types.ts     # Shared TypeScript types
  proxy.ts       # Request proxy (Supabase session refresh)
docs/            # Architecture decisions, design system docs, AI workflow docs
.claude/
  agents/        # Custom agents (orchestrator, fullstack, design-system)
  skills/        # Context skills (see AI Workflow below)
.cursor/         # Cursor mirror — run yarn sync:ai after editing .claude agents/skills
```

## Commands

```bash
yarn dev          # Local Supabase + Next.js (Turbopack); keys from supabase status
yarn dev:next     # Next.js only (no Supabase start)
yarn db:start     # Start local Supabase and apply migrations
yarn db:reset     # Reset local DB (migrations + seed)
yarn build        # Production build
yarn lint         # ESLint (zero warnings)
yarn typecheck    # TypeScript strict check
yarn test         # Vitest unit tests
yarn sync:ai      # Mirror .claude <-> .cursor agents and skills
```

See `docs/supabase.md` for local vs production database setup.

## AI Workflow

This project uses three custom agents with clear separation of concerns:

- **engineering-orchestrator**: Task decomposition, delegation, trade-off enforcement. Start here for complex work.
- **fullstack-architect**: Next.js architecture, Supabase, data layer, API design, caching, performance, SEO.
- **design-system-architect**: Tokens, components, typography, color, accessibility, visual consistency.

Six skills provide shared context:

| Skill | Type |
|-------|------|
| portfolio-context | Project |
| nextjs-fullstack-standards | Project |
| design-system-standards | Project |
| quality-gate | Project |
| supabase | Vendor (Supabase) |
| supabase-postgres-best-practices | Vendor (Supabase) |

After editing agents or skills, run `yarn sync:ai` to update `.cursor/`. Cursor also uses `AGENTS.md`, `.cursor/rules/`, and Supabase MCP (`.cursor/mcp.json`). See `docs/ai/cursor-workflow.md`.

## Conventions

- Server Components by default. Only use `"use client"` when the component needs browser APIs, events, or state.
- All design values flow through tokens — no hardcoded colors, spacing, or font sizes.
- WCAG 2.1 AA accessibility is the minimum bar.
- No external state management libraries. Use React primitives and Server Components.
- Prefer editing existing files over creating new ones.
- No comments unless the "why" is non-obvious.
- No premature abstractions. Three similar lines > a premature helper.
- Supabase service role key (`SUPABASE_SERVICE_ROLE_KEY`) is server-only. Never import `admin.ts` in client code.
- Next.js 16 uses `proxy.ts` instead of `middleware.ts`.

## Quality Gate

Before merging any feature:

1. Lighthouse Performance > 95, Accessibility > 95.
2. All interactive elements keyboard-navigable with visible focus indicators.
3. Color contrast meets WCAG 2.1 AA (4.5:1 text, 3:1 UI components).
4. Works from 320px to 2560px viewport width.
5. First Load JS < 100kB per route.
