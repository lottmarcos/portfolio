# Skills Overview

Skills provide persistent context that agents and developers reference during work. They live in `.claude/skills/` and `.cursor/skills/` (kept identical via `yarn sync:ai`), each with a `SKILL.md` entry point and supporting markdown files.

## Project Skills

### portfolio-context

**Purpose**: Defines who Marcos Lott is, how the portfolio should position him, and what tone to use.

**Files**:
- `profile.md` — Professional background and domain expertise.
- `positioning.md` — Market differentiation and target audience.
- `achievements.md` — Key accomplishments to highlight.
- `tone.md` — Voice and communication guidelines.
- `stack.md` — Technology choices with rationale.

**Used by**: All agents when making decisions that affect messaging, feature prioritization, or technology choices.

### nextjs-fullstack-standards

**Purpose**: Architectural standards for the Next.js implementation.

**Files**:
- `architecture-guidelines.md` — App Router structure, component model, routing.
- `api-guidelines.md` — Server Actions, Route Handlers, validation.
- `data-layer-guidelines.md` — Data fetching, caching, content strategy.
- `performance-guidelines.md` — Core Web Vitals targets, optimization techniques.
- `seo-guidelines.md` — Metadata API, structured data, sitemap.

**Used by**: `fullstack-architect` primarily. `engineering-orchestrator` references for trade-off decisions.

### design-system-standards

**Purpose**: Visual and interaction standards for all UI work.

**Files**:
- `tokens.md` — Token architecture (colors, typography, spacing, breakpoints).
- `components.md` — Component patterns, shadcn/ui usage, composition rules.
- `accessibility.md` — WCAG 2.1 AA requirements and testing checklist.
- `visual-direction.md` — Aesthetic guidelines, anti-cliche checklist, visual tuning parameters.

**Used by**: `design-system-architect` primarily. All agents reference accessibility requirements.

### quality-gate

**Purpose**: Quality assurance checklists for shipping features.

**Files**:
- `testing-checklist.md` — What and how to test.
- `pr-review-checklist.md` — PR review criteria.
- `validation-checklist.md` — Final checks before a feature is done.

**Used by**: `engineering-orchestrator` for sign-off. All agents for self-review.

## Vendor Skills (Supabase)

Installed under `.claude/skills/`; mirror to `.cursor/skills/` with `yarn sync:ai`. Update via Supabase CLI/plugin reinstall, then sync.

### supabase

**Purpose**: Supabase products, auth, RLS, migrations, SSR (`@supabase/ssr`), CLI/MCP usage, security checklist.

**Used by**: `fullstack-architect` for any Supabase task.

### supabase-postgres-best-practices

**Purpose**: Postgres performance — indexes, pooling, RLS performance, schema design (`references/*`).

**Used by**: `fullstack-architect` when writing or reviewing SQL and schema.

## How Skills Differ from Agents

| Aspect | Agents | Skills |
|--------|--------|--------|
| Purpose | Make decisions and take actions | Provide context and standards |
| Format | Instructions with frontmatter | Reference documents |
| Invocation | Called as subagents | Referenced by agents and developers |
| Mutation | Can modify code | Read-only context |

## Maintaining Skills

- **Update** when standards change; run `yarn sync:ai` after editing `.claude/skills/` or `.cursor/skills/`.
- **Add files** when a new domain needs codified standards.
- **Vendor skills**: Reinstall from Supabase when upstream changes; sync to `.cursor/`.
- **Never duplicate** content between skills and agents — agents reference skills, not copy them.

## Cursor vs Claude Paths

| Tool | Skills path |
|------|-------------|
| Claude Code | `.claude/skills/<name>/` |
| Cursor | `.cursor/skills/<name>/` |

See [ADR-002](../architecture/decisions/002-dual-ai-tooling.md) and [cursor-workflow.md](cursor-workflow.md).
