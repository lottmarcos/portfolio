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
  components/    # Shared UI components
  lib/           # Utilities, types, Supabase clients
    supabase/    # client.ts, server.ts, admin.ts (service role, server-only)
  proxy.ts       # Supabase session refresh (Next.js 16)
.cursor/
  agents/        # Subagents (mirror of .claude/agents/)
  skills/        # Agent skills (mirror of .claude/skills/)
  rules/         # Cursor rules (.mdc) — Cursor-only, not synced
docs/            # Architecture, design system, AI workflow
```

## Commands

```bash
yarn dev          # Local Supabase + Next.js (Turbopack)
yarn dev:next     # Next.js only
yarn db:start     # Start local Supabase and apply migrations
yarn db:reset     # Reset local DB (migrations + seed)
yarn build        # Production build
yarn lint         # ESLint (zero warnings)
yarn typecheck    # TypeScript strict check
yarn test         # Vitest unit tests
yarn sync:ai      # Mirror .claude <-> .cursor agents and skills
```

See `docs/supabase.md` for local vs production database setup.

## AI Workflow (Cursor)

Three project subagents in `.cursor/agents/`:

- **engineering-orchestrator**: Task decomposition, delegation, trade-offs. Start here for complex work.
- **fullstack-architect**: Next.js architecture, Supabase, data layer, API, caching, performance, SEO.
- **design-system-architect**: Tokens, components, typography, color, accessibility.

Invoke via the Task tool (`subagent_type` matching the name) or by asking for the subagent by name. Full guide: `docs/ai/cursor-workflow.md`.

Six skills in `.cursor/skills/`:

| Skill | Type |
|-------|------|
| portfolio-context | Project |
| nextjs-fullstack-standards | Project |
| design-system-standards | Project |
| quality-gate | Project |
| supabase | Vendor (Supabase) |
| supabase-postgres-best-practices | Vendor (Supabase) |

Keep `.cursor/skills/` in sync with `.claude/skills/` using `yarn sync:ai` after editing either side.

### MCP

Supabase MCP is configured in `.cursor/mcp.json` (and `.mcp.json` at repo root). Use MCP for live project operations; use skills for standards and checklists.

## Conventions

- Server Components by default. Only use `"use client"` when the component needs browser APIs, events, or state.
- All design values flow through tokens — no hardcoded colors, spacing, or font sizes.
- WCAG 2.1 AA accessibility is the minimum bar.
- No external state management libraries.
- Prefer editing existing files over creating new ones.
- Supabase service role key is server-only. Never import `admin.ts` in client code.
- Next.js 16 uses `proxy.ts` instead of `middleware.ts`.

## Quality Gate

Before merging any feature:

1. Lighthouse Performance > 95, Accessibility > 95.
2. All interactive elements keyboard-navigable with visible focus indicators.
3. Color contrast meets WCAG 2.1 AA (4.5:1 text, 3:1 UI components).
4. Works from 320px to 2560px viewport width.
5. First Load JS < 100kB per route.

See `.cursor/skills/quality-gate/` for full checklists.

## Related Docs

- [Cursor workflow](docs/ai/cursor-workflow.md)
- [Claude workflow](docs/ai/workflow.md) (Claude Code)
- [ADR-001: AI layer](docs/architecture/decisions/001-ai-layer-structure.md)
- [ADR-002: Dual AI tooling](docs/architecture/decisions/002-dual-ai-tooling.md)
