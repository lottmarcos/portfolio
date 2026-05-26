# Skills Overview

Skills provide persistent context that agents and developers reference during work. They live in `.claude/skills/` with a `SKILL.md` entry point and supporting markdown files.

## Available Skills

### portfolio-context

**Purpose**: Defines who Marcos Lott is, how the portfolio should position him, and what tone to use.

**Files**:
- `profile.md` — Professional background and domain expertise.
- `positioning.md` — Market differentiation and target audience.
- `achievements.md` — Key accomplishments to highlight (placeholder — needs Marcos's input).
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

## How Skills Differ from Agents

| Aspect | Agents | Skills |
|--------|--------|--------|
| Purpose | Make decisions and take actions | Provide context and standards |
| Format | Instructions with frontmatter | Reference documents |
| Invocation | Called as subagents | Referenced by agents and developers |
| Mutation | Can modify code | Read-only context |

## Maintaining Skills

Skills should evolve as the project matures:

- **Update** when standards change (new performance targets, revised accessibility requirements).
- **Add files** when a new domain needs codified standards.
- **Remove** outdated guidance that no longer applies.
- **Never duplicate** content between skills and agents — agents reference skills, not copy them.
