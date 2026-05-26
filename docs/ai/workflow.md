# AI Development Workflow

How to use the agents and skills effectively when developing the portfolio.

## Typical Workflows

### New Feature (End-to-End)

1. Describe the feature to `engineering-orchestrator`.
2. The orchestrator decomposes the work and delegates to specialists.
3. `fullstack-architect` handles routing, data, and server-side logic.
4. `design-system-architect` handles UI components, tokens, and accessibility.
5. The orchestrator consolidates, runs the quality gate, and reports status.

### Architecture Decision

1. Describe the decision context to `fullstack-architect` directly.
2. The architect presents options with trade-offs.
3. After choosing, create an ADR in `docs/architecture/decisions/`.

### Visual / Component Work

1. Describe the requirement to `design-system-architect` directly.
2. The architect implements within the token system and component patterns.
3. Verify against the anti-cliche checklist and accessibility requirements.

### Bug Fix or Small Change

For changes scoped to a single domain, invoke the relevant specialist directly. No need to route through the orchestrator for straightforward fixes.

## Invoking Agents

In Claude Code, agents in `.claude/agents/` are available as subagents. Reference them by name when delegating work:

```
Use the fullstack-architect agent to decide the caching strategy for the projects page.
```

## Referencing Skills

Skills provide context that any conversation can reference:

```
Refer to the design-system-standards/accessibility.md checklist before implementing this component.
```

Agents are already configured to reference relevant skills. You can also reference skills directly when working without agents.

## When NOT to Use Agents

- **Simple file edits**: Don't invoke an agent to rename a variable or fix a typo.
- **Exploratory questions**: Ask directly in the conversation — agents add overhead for simple questions.
- **Tasks outside the agents' domains**: If it's a git operation, deployment issue, or tooling question, handle it directly.

## Architecture Decision Records

Significant decisions are documented as ADRs in `docs/architecture/decisions/`. The format:

```
docs/architecture/decisions/
  001-ai-layer-structure.md
  002-[next-decision].md
```

Create an ADR when:
- Choosing between meaningfully different approaches.
- Overriding a standard defined in a skill.
- Adding or removing a major dependency.
- Changing the project's architectural direction.

## Quality Gate Integration

The `quality-gate` skill defines three checklists that apply at different stages:

1. **During development**: `testing-checklist.md` — manual testing during implementation.
2. **At PR review**: `pr-review-checklist.md` — review criteria for every PR.
3. **Before shipping**: `validation-checklist.md` — final sign-off checks.

The `engineering-orchestrator` is configured to enforce these gates, but any developer or agent can reference them directly.
