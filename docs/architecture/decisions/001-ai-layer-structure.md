# ADR-001: AI Layer Structure

**Status**: Accepted
**Date**: 2026-05-26
**Decision makers**: Marcos Lott

## Context

This portfolio project will be developed primarily with AI assistance (Claude Code). The default approach — ad-hoc prompting without persistent context — leads to inconsistent decisions, duplicated reasoning, and loss of architectural intent across conversations.

The project needs a structured AI workflow that:

1. Maintains consistent architectural and design standards across conversations.
2. Separates concerns between different technical domains.
3. Provides reusable context without relying on conversation memory.
4. Documents decisions and trade-offs as the project evolves.

## Decision

Implement a three-agent architecture with four supporting skills:

### Agents (`.claude/agents/`)

| Agent | Role | Scope |
|-------|------|-------|
| `engineering-orchestrator` | Task decomposition, delegation, trade-off enforcement | Cross-cutting coordination |
| `fullstack-architect` | Next.js architecture decisions | Routing, data, caching, performance, SEO |
| `design-system-architect` | Design system decisions | Tokens, components, accessibility, visual quality |

### Skills (`.claude/skills/`)

| Skill | Purpose |
|-------|---------|
| `portfolio-context` | Personal brand context — who, what, why, how |
| `nextjs-fullstack-standards` | Architecture and implementation standards |
| `design-system-standards` | Visual and interaction standards |
| `quality-gate` | Testing and review checklists |

### Documentation (`docs/`)

- Architecture decisions recorded as ADRs.
- Design system documentation for human reference.
- AI workflow documentation explaining how agents and skills work together.

## Alternatives Considered

### 1. External plugins only (buildwithclaude marketplace)

**Rejected because**: Four available plugins (ui-ux-designer, frontend-developer, javascript-developer, nextjs-app-router-developer) have significant scope overlap, no awareness of project-specific standards, and create a supply-chain dependency on third-party prompt updates. The javascript-developer plugin in particular adds negligible value over Claude's baseline knowledge.

### 2. Single monolithic agent

**Rejected because**: A single agent with all responsibilities would produce an unwieldy prompt that dilutes each domain's standards. Separation of concerns applies to AI configuration as much as to code.

### 3. Skills only (no agents)

**Rejected because**: Skills provide context but don't encode decision-making behavior. Without agents, every conversation would need to re-establish how to use the standards — agents encode the "how" alongside the "what."

### 4. Copy external skills wholesale (garden-skills, taste-skill)

**Rejected because**: The garden-skills project includes 25+ files totaling significant context weight, assumes HTML/CSS/JS (not a component-library project), and lacks accessibility rigor. The taste-skill project has too many variants and no accessibility coverage. Useful patterns were cherry-picked and adapted instead:

- **From garden-skills**: Anti-cliche checklist, oklch color system guidance.
- **From taste-skill**: Visual tuning parameters (design variance, motion intensity, visual density) as a shared vocabulary for aesthetic decisions.
- **From ui-ux-designer plugin**: WCAG 2.1 AA mandate as a non-negotiable baseline.
- **From nextjs-app-router-developer plugin**: Three-layer caching model, file convention checklist.

## Consequences

### Positive

- Persistent context across conversations reduces repetitive reasoning.
- Clear separation of concerns prevents conflicting decisions between domains.
- Quality gate checklists create a consistent bar for shipping features.
- The AI workflow itself demonstrates the portfolio's thesis: AI as a structured tool.

### Negative

- Maintenance overhead: agents and skills need updating as the project evolves.
- Initial context cost: agents and skills add tokens to every conversation that references them.
- Risk of over-prescription: standards could become constraints that slow down experimentation.

### Mitigations

- Keep agents concise and reference skills rather than duplicating content.
- Review and prune standards quarterly or after major milestones.
- Standards describe defaults, not mandates — document deviations in ADRs rather than fighting the framework.

## Amendment (2026-06)

- Skills grew from four project skills to six (added vendor `supabase` and `supabase-postgres-best-practices`).
- Cursor parity documented in [ADR-002](002-dual-ai-tooling.md) (`.cursor/` mirror + `yarn sync:ai`).
