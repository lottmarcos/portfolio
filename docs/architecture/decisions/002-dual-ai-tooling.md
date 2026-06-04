# ADR-002: Dual AI Tooling (Claude Code + Cursor)

**Status**: Accepted  
**Date**: 2026-06-03  
**Decision makers**: Marcos Lott  
**Related**: [ADR-001](001-ai-layer-structure.md)

## Context

ADR-001 established agents and skills under `.claude/` for Claude Code. Development also happens in Cursor, which uses different discovery paths (`.cursor/agents/`, `.cursor/skills/`, `.cursor/rules/`, `AGENTS.md`, MCP).

The project added Supabase (migrations, MCP, vendor skills) and partial Cursor config (`mcp.json`, `settings.json`) without a full Cursor parity layer.

## Decision

1. **Mirror** `.claude/agents/` and `.claude/skills/` to `.cursor/agents/` and `.cursor/skills/` via `yarn sync:ai` (`scripts/sync-ai-layer.mjs`).
2. **Cursor-only** artifacts: `.cursor/rules/*.mdc`, `AGENTS.md`. Not copied to `.claude/`.
3. **MCP**: Keep `.mcp.json` and `.cursor/mcp.json` aligned manually (same Supabase project ref).
4. **`.agents/`**: Ignore and remove from version control — redundant copy of vendor Supabase skills; canonical vendor content lives under `.claude/skills/`.

Default edit flow for shared content: change `.claude/` (or `.cursor/` then `yarn sync:ai --reverse`), then sync before commit.

## Consequences

### Positive

- Same standards in Claude Code and Cursor without rewriting prompts per tool.
- Cursor rules give always-on and file-scoped guardrails without bloating skills.
- Vendor Supabase skills versioned once and mirrored to Cursor.

### Negative

- Dual-folder maintenance; drift if sync is skipped.
- Large vendor skill trees increase repo size (~65+ files under skills).

### Mitigations

- `yarn sync:ai` in package.json; document in `docs/ai/cursor-workflow.md` and `AGENTS.md`.
- PR checklist: run sync when ` .claude/skills` or `.claude/agents` change.
- `.agents/` in `.gitignore` if CLI recreates it.

## Alternatives Considered

### Single `ai/` directory with symlinks

Rejected: tooling expects `.claude/` and `.cursor/` paths; symlinks are fragile on Windows.

### Cursor-only (drop `.claude/`)

Rejected: Claude Code remains in use; ADR-001 investment preserved.

### Copy vendor skills only into Cursor

Rejected: orchestrator and fullstack agents must reference the same skill paths in both tools.
