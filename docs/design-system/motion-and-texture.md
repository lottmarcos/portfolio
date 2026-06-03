# Motion & Texture

The visual + motion foundation for the portfolio. This documents the system implemented in `src/app/globals.css` and the font wiring in `src/app/layout.tsx`.

Everything builds on top of the **existing shadcn token names** (`--primary`, `--foreground`, `--background`, `--card`, `--muted`, `--muted-foreground`, `--border`, `--ring`) and the extended `--dracula-*` palette. The design layer is theme-aware through the `.dark` class.

Tuning targets (from `visual-direction.md`): Motion Intensity 3–4, Ornament 2–3, Contrast Drama 7–8.

---

## Typography

Two families, both via `next/font/google` with `display: "swap"`:

| Role | Font | CSS variable | Weights |
|------|------|--------------|---------|
| Headings (display serif) | **Fraunces** | `--font-heading` | 400, 500, 600 (+ italic, `opsz` axis) |
| Body / UI (grotesque) | **Hanken Grotesk** | `--font-sans` | 400, 500, 600, 700 |

`layout.tsx` applies **both** variables to `<html>`. The `@theme inline` block maps `--font-heading` → Fraunces and `--font-sans` → Hanken, with system fallbacks. `--font-mono` falls back to a monospace system stack (no mono webfont is loaded).

Fraunces uses optical sizing (`font-optical-sizing: auto`) so display text gets the high-contrast cut while smaller headings stay readable.

### Typography utility classes

Sizes use the fluid `clamp()` scale (primitives in `:root`) so type scales smoothly from 320px to 2560px.

| Class | Family | Size token | Line height | Notes |
|-------|--------|-----------|-------------|-------|
| `.text-display` | Fraunces | `--text-display` (2.5→4rem) | 1.02 | Hero heading. `-0.02em` tracking, `opsz` 144, ligatures + discretionary ligatures on, `text-wrap: balance`. |
| `.text-h2` | Fraunces | `--text-3xl` | 1.12 | `-0.015em` tracking, balanced wrap. |
| `.text-h3` | Fraunces | `--text-2xl` | 1.2 | weight 500, `-0.01em` tracking. |
| `.text-lead` | Hanken | `--text-lg` | 1.6 | Lead paragraph. Color `var(--muted-foreground)`. |
| `.text-body` | Hanken | `--text-base` | 1.75 | Default body copy, `text-wrap: pretty`. |
| `.text-caption` | Hanken | `--text-sm` | 1.5 | Color `var(--muted-foreground)`. |
| `.text-overline` | Hanken | `--text-xs` | 1.4 | Uppercase, `0.12em` tracking, weight 600, color `var(--muted-foreground)`. |

These set `font-family`, `font-size`, `line-height`, `letter-spacing`, and `font-feature-settings` only — they do not set color except where noted, so they compose with Tailwind color utilities.

---

## Motion tokens

Defined in `:root`:

```css
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* overshoot — hover/press accents */
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1);     /* default — reveals, transitions */
--dur-1: 150ms;  /* micro state changes (hover, focus) */
--dur-2: 250ms;  /* small UI transitions */
--dur-3: 400ms;  /* reveals */
--dur-4: 600ms;  /* footer rise, ink underline */
```

Use `--ease-out` for entrances and UI state. Reserve `--ease-spring` for small, deliberate accents (a button press, an icon nudge) — never for large layout moves.

---

## Reveal (scroll entrance)

A JS component toggles `data-revealed="true"` when the element enters the viewport.

```html
<section class="reveal" style="--reveal-delay: 80ms">…</section>
```

- Initial state: `opacity: 0; translateY(14px)`.
- Revealed: fades + rises to rest using `--dur-3` / `--ease-out`.
- `--reveal-delay` (default `0ms`) staggers siblings without bespoke classes.

Keep to 2–3 reveal targets per viewport (anti-cliché checklist). Content is fully readable without JS once `data-revealed` is set; under reduced motion it is shown immediately.

---

## Ink underline

A tasteful accent rule grown from 0 → full width when an ancestor (or the element itself) is `data-revealed`.

```html
<span class="ink-underline">architectural clarity</span>
```

- Drawn with a `linear-gradient(var(--primary), var(--primary))` as `background-image`, animated via `background-size` (`0%` → `100%`, `0.08em` tall) so it never affects layout.
- Activated by `[data-revealed="true"] .ink-underline` or `.ink-underline[data-revealed="true"]`.
- Animates with `--dur-4` / `--ease-out`, delayed by `--reveal-delay` (default 120ms) so it trails the text reveal.
- Under reduced motion it renders fully drawn with no transition.

Optional decoration — Ornament stays low. Use it on a single emphasized phrase, not as a default link style.

---

## Footer rise

The footer is `position: sticky; bottom: 0` with a lower `z-index`, revealed as opaque content scrolls over it. A JS observer toggles `data-revealed` on the inner element.

```html
<div class="footer-rise" data-revealed="true">…</div>
```

- Initial: `opacity: 0; translateY(24px)`. Revealed: eases to rest with `--dur-4` / `--ease-out`.
- Neutralized under reduced motion.

---

## Colored shadows ("sombras com cor")

Elevation is tinted with `--primary` (not grey), composed via `color-mix(in oklab, …)`. The shadow definitions live in custom properties resolved per theme, so they follow palette swaps and adapt between light (Alucard) and dark (Dracula).

| Class | Custom property | Use |
|-------|----------------|-----|
| `.shadow-elevated` | `--shadow-elevated` | Soft elevated cards / surfaces. |
| `.shadow-portrait` | `--shadow-portrait` | Deeper, accent-tinted shadow for the portrait / feature element. |

Dark mode uses higher tint alpha + deeper spread (plus a near-black ground shadow) so the accent glow reads against the deep blue-grey background; light mode keeps them softer for the cream background.

---

## Texture & ambient depth

Two subtle, non-blocking layers add warmth and analog grain without "gratuitous gradient" energy:

1. **Ambient wash** — `body` `background-image`: two extremely soft `--primary`-tinted radial gradients (top-leading + lower-trailing), strength `--ambient-strength` (5% light / 8% dark), `background-attachment: fixed`. Composites over the flat `bg-background`.
2. **Noise overlay** — `body::after`: a `fixed`, `inset: 0`, `pointer-events: none` inline `fractalNoise` SVG data URI. Opacity `--noise-opacity` (0.025 light / 0.04 dark), `z-index: 60` (above content, below shadcn overlays at 50 — components opening above this should sit at `z-index ≥ 70`).

Both are theme-aware via custom properties overridden in `.dark`.

---

## Focus & selection (WCAG 2.1 AA)

```css
:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; border-radius: 3px; }
::selection    { background: color-mix(in oklab, var(--primary) 28%, transparent); color: var(--foreground); }
```

Focus rings use `--ring` (the accent), meeting the 3:1 UI-component contrast requirement in both themes. Never remove focus indicators.

---

## Reduced motion

A single global block honors `prefers-reduced-motion: reduce`:

- `.reveal` and `.footer-rise` render at rest (`opacity: 1`, no transform, no transition).
- `.ink-underline` renders fully drawn with no transition.
- All `animation-duration` / `transition-duration` are clamped to `0.01ms`.

No essential information is conveyed through motion alone.

---

## Class & token contract (consumer reference)

- **Motion tokens:** `--ease-spring`, `--ease-out`, `--dur-1`, `--dur-2`, `--dur-3`, `--dur-4`
- **Type scale primitives:** `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, `--text-display`
- **Typography classes:** `.text-display`, `.text-h2`, `.text-h3`, `.text-lead`, `.text-body`, `.text-caption`, `.text-overline`
- **Motion classes:** `.reveal` (+ `[data-revealed="true"]`, `--reveal-delay`), `.ink-underline`, `.footer-rise` (+ `[data-revealed="true"]`)
- **Shadow classes:** `.shadow-elevated`, `.shadow-portrait` (backed by `--shadow-elevated`, `--shadow-portrait`)
- **Texture tokens:** `--noise-opacity`, `--ambient-strength`
- **Fonts:** `--font-heading` (Fraunces), `--font-sans` (Hanken Grotesk), `--font-mono` (system stack)
