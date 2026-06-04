# System Overview

## What This Is

A personal portfolio and brand platform for Marcos Lott. Built with Next.js, it demonstrates technical seniority, architectural clarity, visual taste, and pragmatic use of AI in development.

## Architecture Summary

```
┌─────────────────────────────────────────────┐
│                   Vercel                     │
│  ┌───────────────────────────────────────┐   │
│  │            Next.js App                │   │
│  │  ┌─────────────┐  ┌───────────────┐   │   │
│  │  │   Server     │  │   Client      │   │   │
│  │  │  Components  │  │  Components   │   │   │
│  │  │  (default)   │  │  (minimal)    │   │   │
│  │  └──────┬───────┘  └───────┬───────┘   │   │
│  │         │                  │           │   │
│  │  ┌──────▼──────────────────▼───────┐   │   │
│  │  │        Design System            │   │   │
│  │  │     Tailwind + shadcn/ui         │   │   │
│  │  └─────────────────────────────────┘   │   │
│  │                                       │   │
│  │  ┌─────────────────────────────────┐   │   │
│  │  │        Data Layer               │   │   │
│  │  │  Supabase (Postgres + RLS)      │   │   │
│  │  └─────────────────────────────────┘   │   │
│  └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering model | Server Components (default) | Minimal client JS, strong SEO, fast initial load |
| Routing | App Router with route groups | Modern Next.js patterns, layout composition |
| Styling | Tailwind CSS v4 | No runtime overhead, utility-first, design token support |
| Components | shadcn/ui | Accessible primitives, full source ownership |
| State management | React primitives only | No external libraries needed for portfolio complexity |
| Data source | Supabase (Postgres) + static/TS where appropriate | Visitor tags and future features; local Docker via `yarn db:start` |
| Deployment | Vercel | Native Next.js support, zero-config |

## Data Flow

1. **Static data** (project list, profile info) lives in TypeScript files in `src/lib/data/`.
2. **Content** (if blog posts or case studies are added) lives as MDX files in `src/content/`.
3. **Server Components** fetch data directly — no API layer needed for own data.
4. **Server Actions** handle any mutations (contact form, if added).
5. **Caching** is managed through Next.js Data Cache with tag-based revalidation.

## What's Not Here (Yet)

- **Authentication**: No user accounts or protected routes (Supabase auth-ready).
- **CMS**: Content lives in the repo until scale demands otherwise.
- **Analytics**: Vercel Analytics when the site is live.

## Testing

Vitest for unit tests (`yarn test`). See `quality-gate` skill for broader validation.

## Related Documents

- [ADR-001: AI Layer Structure](decisions/001-ai-layer-structure.md) — Agents and skills (extended to six skills; see ADR-002 for Cursor).
- [ADR-002: Dual AI Tooling](decisions/002-dual-ai-tooling.md) — Claude Code + Cursor parity.
- [Supabase setup](../supabase.md) — Local DB, migrations, production CI.
- [Stack Rationale](../../.claude/skills/portfolio-context/stack.md) — Technology justification.
