# Cursor AI Workflow

How to use agents, skills, rules, and MCP when developing this portfolio in Cursor.

## Layer Overview

| Layer | Location | Purpose |
|-------|----------|---------|
| Subagents | `.cursor/agents/` | Decision-making specialists (orchestrator, fullstack, design-system) |
| Skills | `.cursor/skills/` | Persistent standards and checklists |
| Rules | `.cursor/rules/*.mdc` | Always-on or file-scoped constraints |
| MCP | `.cursor/mcp.json` | Live Supabase project operations |
| Entry | `AGENTS.md` | Project context for the agent |

Agents and skills are mirrored from `.claude/` via `yarn sync:ai`. Rules and `AGENTS.md` exist only under Cursor paths.

## Typical Workflows

### New feature (end-to-end)

1. Describe the feature; use `engineering-orchestrator` (Task tool or by name) for decomposition.
2. Delegate to `fullstack-architect` (routing, data, Supabase) and/or `design-system-architect` (UI).
3. Run quality-gate checklists before closing.

### Supabase / database work

1. Read `docs/supabase.md` for local commands and env vars.
2. Load skills `supabase` and `supabase-postgres-best-practices`.
3. Use Supabase MCP when you need project-specific queries or advisors (authenticate in Cursor when prompted).
4. After migration changes: `yarn db:reset` and smoke-test.

### Visual / component work

1. Use `design-system-architect` directly for scoped UI tasks.
2. Rules `design-system-ui.mdc` apply when editing `**/*.tsx`.

### Bug fix or small change

Invoke the relevant specialist directly. Skip the orchestrator for single-domain fixes.

## Invoking Subagents

```
Use the fullstack-architect subagent to design caching for the projects page.
```

Or use the Task tool with `subagent_type`: `engineering-orchestrator`, `fullstack-architect`, or `design-system-architect`.

Project definitions in `.cursor/agents/` override generic defaults when names match.

## Skills vs MCP

- **Skills**: What to do — patterns, security checklists, performance rules, portfolio tone.
- **MCP**: Live interaction with the linked Supabase project (schema, advisors). Requires Cursor auth.

Do not duplicate skill content in rules; rules only enforce short, session-critical constraints.

## Rules

| Rule | When active |
|------|-------------|
| `portfolio-core.mdc` | Always |
| `nextjs-architecture.mdc` | `src/app/**`, `src/lib/**`, `src/proxy.ts` |
| `design-system-ui.mdc` | `**/*.tsx`, `globals.css` |
| `supabase-security.mdc` | `src/lib/supabase/**` |
| `supabase-migrations.mdc` | `supabase/**` |

## Syncing with Claude Code

After editing `.claude/agents/` or `.claude/skills/`:

```bash
yarn sync:ai
```

After editing `.cursor/agents/` or `.cursor/skills/`:

```bash
yarn sync:ai --reverse
```

Not synced: `.cursor/rules/`, `AGENTS.md`, `mcp.json`, `settings.json`.

## When NOT to Use Subagents

- Simple renames or typo fixes.
- Exploratory questions (ask in the main chat).
- Git, deployment, or tooling-only tasks outside agent scope.

## Related

- [Agents overview](agents-overview.md)
- [Skills overview](skills-overview.md)
- [Claude Code workflow](workflow.md)
