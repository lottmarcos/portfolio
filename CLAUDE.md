# Portfolio — Marcos Lott Jr.

Personal brand platform built with Next.js. Communicates technical seniority, visual taste, architectural clarity, and pragmatic use of AI in development.

## Stack

- Next.js 15+ (App Router, Server Components default)
- React 19+, TypeScript (strict)
- Tailwind CSS v4, shadcn/ui
- Color palette: Dracula Theme (dark: Dracula Classic, light: Alucard Classic)
- Deployed on Vercel

## Project Structure

```
src/
  app/           # App Router pages and layouts
  components/    # Shared UI components
  lib/           # Utilities and shared logic
docs/            # Architecture decisions, design system docs, AI workflow docs
.claude/
  agents/        # Custom Claude Code agents (orchestrator, fullstack, design-system)
  skills/        # Context skills (portfolio-context, nextjs, design-system, quality-gate)
```

## AI Workflow

This project uses three custom agents with clear separation of concerns:

- **engineering-orchestrator**: Task decomposition, delegation, trade-off enforcement. Start here for complex work.
- **fullstack-architect**: Next.js architecture, data layer, API design, caching, performance, SEO.
- **design-system-architect**: Tokens, components, typography, color, accessibility, visual consistency.

Four skills provide shared context:

- **portfolio-context**: Who Marcos is, positioning, achievements, tone of voice, stack rationale.
- **nextjs-fullstack-standards**: Architecture, API, data layer, performance, and SEO guidelines.
- **design-system-standards**: Token system, component patterns, accessibility, visual direction.
- **quality-gate**: Testing, PR review, and validation checklists.

## Conventions

- Server Components by default. Only use `"use client"` when the component needs browser APIs, events, or state.
- All design values flow through tokens — no hardcoded colors, spacing, or font sizes.
- WCAG 2.1 AA accessibility is the minimum bar.
- No external state management libraries. Use React primitives and Server Components.
- Prefer editing existing files over creating new ones.
- No comments unless the "why" is non-obvious.
- No premature abstractions. Three similar lines > a premature helper.

## Quality Gate

Before merging any feature:

1. Lighthouse Performance > 95, Accessibility > 95.
2. All interactive elements keyboard-navigable with visible focus indicators.
3. Color contrast meets WCAG 2.1 AA (4.5:1 text, 3:1 UI components).
4. Works from 320px to 2560px viewport width.
5. First Load JS < 100kB per route.
