# PR Review Checklist

Every pull request — whether created by a human or an AI agent — must pass this review before merging.

## Architecture

- [ ] Changes align with the App Router structure defined in `architecture-guidelines.md`.
- [ ] Server/Client component boundary is correct (no unnecessary `"use client"`).
- [ ] No new dependencies added without justification.
- [ ] No premature abstractions or over-engineering.

## Code Quality

- [ ] TypeScript strict mode passes with no errors.
- [ ] No `any` types (use `unknown` if the type is genuinely uncertain, then narrow).
- [ ] No unused imports, variables, or functions.
- [ ] No commented-out code.
- [ ] No hardcoded values that should be tokens or constants.

## Design System

- [ ] Uses design tokens for colors, spacing, typography, and breakpoints.
- [ ] No arbitrary Tailwind values (`w-[347px]`) without justification.
- [ ] Components follow the patterns in `components.md`.
- [ ] Visual changes are consistent with `visual-direction.md`.

## Accessibility

- [ ] Color contrast meets WCAG 2.1 AA standards.
- [ ] Interactive elements are keyboard-accessible.
- [ ] Focus indicators are visible.
- [ ] Semantic HTML is used correctly.
- [ ] Images have appropriate alt text.
- [ ] `prefers-reduced-motion` is respected for any animations.

## Performance

- [ ] No new client-side dependencies in Server Components.
- [ ] Images use `next/image` with appropriate dimensions.
- [ ] No large libraries imported in shared layouts.
- [ ] First Load JS stays within the 100kB per route budget.

## SEO (For pages with public URLs)

- [ ] Page has appropriate title and description metadata.
- [ ] Heading hierarchy is sequential.
- [ ] New routes are included in the sitemap.

## Security

- [ ] No secrets, tokens, or credentials in the code.
- [ ] User inputs are validated server-side.
- [ ] No `dangerouslySetInnerHTML` without sanitization.

## Documentation

- [ ] ADR created for significant architectural decisions.
- [ ] README or docs updated if the change affects project setup or workflow.
