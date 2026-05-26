# Agents Overview

This project uses three custom Claude Code agents with clear separation of concerns. They live in `.claude/agents/` and are invoked as subagents during development.

## Agent Roster

### engineering-orchestrator

**Role**: Tech lead. Coordinates work, decomposes tasks, enforces trade-offs.

**When to use**: Start here for any complex task that spans multiple domains (architecture + design, new feature end-to-end, refactoring that touches structure and UI).

**What it does**:
- Breaks tasks into scoped work units.
- Delegates to `fullstack-architect` or `design-system-architect` based on domain.
- Surfaces trade-offs before committing to a direction.
- Runs quality gate checks before closing a task.

**What it does NOT do**: Implement features directly. It coordinates and reviews.

### fullstack-architect

**Role**: Architecture specialist. Owns the Next.js application structure.

**When to use**: For decisions about routing, data fetching, caching, API design, performance optimization, SEO, or deployment configuration.

**What it does**:
- Defines App Router structure and file conventions.
- Decides Server vs. Client component boundaries.
- Implements caching and revalidation strategies.
- Applies performance budgets and optimization techniques.

**What it does NOT do**: Make design system decisions (colors, tokens, component visual styling).

### design-system-architect

**Role**: Design system specialist. Owns visual identity and component quality.

**When to use**: For decisions about tokens, typography, color, spacing, component API design, accessibility compliance, or visual consistency.

**What it does**:
- Defines and maintains the token architecture.
- Reviews visual implementations against the anti-cliche checklist.
- Ensures WCAG 2.1 AA compliance.
- Guides shadcn/ui customization and component composition.

**What it does NOT do**: Make routing, data fetching, or infrastructure decisions.

## How They Interact

```
User Request
     │
     ▼
engineering-orchestrator
     │
     ├──► fullstack-architect    (architecture, data, performance)
     │
     └──► design-system-architect (visual, components, accessibility)
     │
     ▼
Quality Gate (validation checklist)
```

The orchestrator is the entry point for complex work. For straightforward, single-domain tasks, you can invoke the specialist directly.

## Adding New Agents

If the project grows to need a new specialist (e.g., content strategy, DevOps), create a new `.md` file in `.claude/agents/` with:

1. Clear scope statement (what it owns, what it doesn't).
2. Decision framework for its domain.
3. Anti-patterns list.
4. References to relevant skills.

Update the orchestrator's delegation table to include the new agent.
