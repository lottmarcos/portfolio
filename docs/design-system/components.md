# Components

Human-facing documentation for the portfolio's component system. For implementation details, see `.claude/skills/design-system-standards/components.md`.

## Component Sources

| Source | What | When |
|--------|------|------|
| shadcn/ui | Standard interactive primitives | Button, Dialog, Dropdown, Tabs, etc. |
| Custom | Portfolio-specific UI | ProjectCard, SectionHeader, etc. |

## Principles

1. **Composition over configuration**: Small components composed together, not monolithic components with many props.
2. **Token-driven**: All visual values come from the design token system.
3. **Accessible by default**: shadcn/ui handles focus management, keyboard navigation, and ARIA attributes.
4. **Server-first**: Components are Server Components unless they need client-side interactivity.

## Component Catalog

> This section will be populated as components are built. Each entry should include:
> - Component name and purpose.
> - Available variants and sizes.
> - Accessibility considerations.
> - Usage example.

## Adding Components

1. Check if shadcn/ui has a suitable primitive (`npx shadcn@latest add [component]`).
2. Customize to match the design token system.
3. If no primitive fits, build a custom component following the patterns in the implementation guide.
4. Document in this catalog.
