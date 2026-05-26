# Design Tokens

Human-facing documentation for the portfolio's design token system. For implementation details, see `.claude/skills/design-system-standards/tokens.md`.

## What Are Tokens

Design tokens are the atomic values that define the visual language: colors, typography, spacing, and breakpoints. Every visual decision in the portfolio traces back to a token.

## Token Layers

| Layer | Purpose | What changes when swapping palettes |
|-------|---------|-------------------------------------|
| Palette | Named color slots from a theme (Dracula) | **This layer only** |
| Primitive | Raw spacing, typography values | Nothing |
| Semantic | Purpose-mapped values (`text-primary`, `bg-elevated`) | Nothing — they reference palette slots |
| Component | Scoped overrides for specific components | Nothing |

This architecture means the entire color identity can be changed by replacing one block of CSS variables.

## Active Palette: Dracula Theme

### Dark Mode (Dracula Classic)

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep blue-grey | `#282A36` |
| Background (darker) | Near-black | `#191A21` |
| Surface / Selection | Medium blue-grey | `#44475A` |
| Foreground | Off-white | `#F8F8F2` |
| Muted text (comments) | Slate blue | `#6272A4` |
| Accent (purple) | Soft purple | `#BD93F9` |
| Accent (pink) | Bright pink | `#FF79C6` |
| Success | Green | `#50FA7B` |
| Warning | Orange | `#FFB86C` |
| Error | Red | `#FF5555` |
| Info | Cyan | `#8BE9FD` |

### Light Mode (Alucard Classic)

| Role | Color | Hex |
|------|-------|-----|
| Background | Warm cream | `#FFFBEB` |
| Background (darker) | Warm grey | `#BCBAB3` |
| Surface / Selection | Light grey | `#DEDCCF` |
| Foreground | Near-black | `#1F1F1F` |
| Muted text (comments) | Olive | `#6C664B` |
| Accent (purple) | Deep purple | `#644AC9` |
| Accent (pink) | Deep pink | `#A3144D` |
| Success | Green | `#14710A` |
| Warning | Orange | `#A34D14` |
| Error | Red | `#CB3A2A` |
| Info | Cyan | `#036A96` |

## Typography

- Fluid type scale using `clamp()` for responsive sizing without breakpoints.
- Two font families maximum (heading + body).
- Specific font choices TBD during design implementation.

## Spacing

- 4px grid base (`0.25rem` increments).
- Named scale: `space-1` (4px) through `space-32` (128px).
- Semantic spacing for sections, blocks, elements, and inline content.

## Breakpoints

| Name | Width | Typical device |
|------|-------|---------------|
| sm | 640px | Large phone landscape |
| md | 768px | Tablet portrait |
| lg | 1024px | Tablet landscape / small desktop |
| xl | 1280px | Desktop |

Mobile-first: default styles target mobile, larger breakpoints add complexity.

## Dark/Light Mode

Both modes are first-class citizens, each with their own fully designed palette from the Dracula spec. Theme switching uses `next-themes` with `prefers-color-scheme` as default, user override persisted.
