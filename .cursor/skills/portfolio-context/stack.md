# Technology Stack

Rationale for every major technology choice in the portfolio.

## Core Framework: Next.js 15+ (App Router)

**Why**: Server Components as the default rendering model align with the portfolio's need for fast initial loads, strong SEO, and minimal client-side JavaScript. App Router provides the most modern React patterns (Server Components, Server Actions, Streaming) in a production-ready framework.

**Why not alternatives**: Astro is strong for content sites but weaker for interactive features. Remix is excellent but has a smaller ecosystem. A vanilla React SPA would sacrifice SEO and initial load performance.

## Language: TypeScript (Strict Mode)

**Why**: Type safety catches errors at build time, improves IDE support, and serves as living documentation. Strict mode prevents the `any`-creep that erodes type safety over time.

## Styling: Tailwind CSS v4

**Why**: Utility-first approach eliminates naming debates and dead CSS. v4's CSS-first configuration and native `@theme` directive align with modern CSS standards. Excellent performance (no runtime CSS-in-JS overhead).

**Why not alternatives**: CSS Modules are fine but verbose for responsive design. Styled-components/emotion add runtime cost. Vanilla CSS lacks the productivity of utility classes at scale.

## Component Library: shadcn/ui

**Why**: shadcn/ui provides well-designed, accessible component primitives that you own (copied into the project, not installed as a dependency). It handles complex accessibility patterns (focus trapping, keyboard navigation, screen reader announcements) correctly. Full control over styling and behavior. Only shadcn and its strictly necessary internal dependencies are used — no direct dependency on other headless libraries.

**Why not alternatives**: Material UI and Ant Design impose strong visual opinions that conflict with a custom design system. Building from scratch would take too long for comparable accessibility quality.

## Deployment: Vercel

**Why**: Native Next.js support with zero-config deployment. Edge functions, image optimization, and analytics built in. The portfolio doesn't need complex infrastructure — Vercel handles the operational concerns.

## AI Development Tools

**Why Claude Code + custom agents**: The AI workflow is part of the portfolio's story. Custom agents with clear roles (orchestrator, fullstack architect, design system architect) demonstrate how AI can be used as a structured development tool, not just a code generator. Skills provide persistent context that improves AI output quality.

**Why RTK**: Token optimization for development operations. Keeps AI-assisted development cost-effective without sacrificing output quality.

## Data Layer: Supabase

**Why**: Provides Postgres database, auth, storage, and real-time capabilities in a single service. Generous free tier. The `@supabase/ssr` package integrates cleanly with Next.js App Router via Server Components and Server Actions.

**Architecture**: Three client helpers in `src/lib/supabase/`:
- `client.ts` — Browser client using anon key (safe for client-side).
- `server.ts` — Server client for Server Components and Server Actions (cookie-based session).
- `admin.ts` — Service role client for admin operations (server-only, never exposed to client).

**Security**: Service role key is in `SUPABASE_SERVICE_ROLE_KEY` (not `NEXT_PUBLIC_*`). The `admin.ts` file imports `server-only` to prevent accidental client-side usage.

## What's Intentionally NOT in the Stack

| Technology | Why excluded |
|-----------|-------------|
| State management libraries (Redux, Zustand) | React Server Components + built-in state primitives are sufficient |
| CSS-in-JS (styled-components, emotion) | Runtime overhead, Tailwind covers the use cases better |
| ORM (Prisma, Drizzle) | Supabase client handles queries directly. Add ORM only if query complexity demands it |
| CMS (Contentful, Sanity) | Content lives in the repo as MDX or static data until scale demands a CMS |
| Testing framework | Will be decided when the first testable feature is built — not upfront |
