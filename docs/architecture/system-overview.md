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
│  │  │  Static data → MDX → (CMS?)     │   │   │
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
| Data source | Static TypeScript → MDX | Start simple, add complexity when needed |
| Deployment | Vercel | Native Next.js support, zero-config |

## Data Flow

1. **Static data** (project list, profile info) lives in TypeScript files in `src/lib/data/`.
2. **Content** (if blog posts or case studies are added) lives as MDX files in `src/content/`.
3. **Server Components** fetch data directly — no API layer needed for own data.
4. **Server Actions** handle any mutations (contact form, if added).
5. **Caching** is managed through Next.js Data Cache with tag-based revalidation.

## What's Not Here (Yet)

These are intentionally deferred until a concrete need arises:

- **Database**: No persistence layer needed for static content.
- **Authentication**: No user accounts or protected routes.
- **CMS**: Content lives in the repo until scale demands otherwise.
- **Analytics**: Vercel Analytics when the site is live.
- **Testing framework**: Will be chosen when the first testable feature is built.

## Related Documents

- [ADR-001: AI Layer Structure](decisions/001-ai-layer-structure.md) — Why the project uses custom agents and skills.
- [Stack Rationale](../../.claude/skills/portfolio-context/stack.md) — Detailed justification for each technology choice.
