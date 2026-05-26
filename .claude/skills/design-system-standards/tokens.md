# Design Tokens

## Token Architecture

Four layers, designed so the entire color palette can be swapped by replacing a single layer:

```
Palette Tokens → Primitive Tokens → Semantic Tokens → Component Tokens
```

### Layer 1: Palette Tokens (Swappable)

The palette layer is the only file that needs to change when switching color themes. It defines named color slots that the rest of the system references. The active palette is **Dracula Theme**.

```css
/* ============================================
   PALETTE: Dracula Theme
   Source: https://draculatheme.com/spec
   To swap palettes: replace only this block.
   ============================================ */

/* --- Dracula Classic (Dark Mode) --- */
--palette-dark-bg:             #282A36;
--palette-dark-bg-dark:        #21222C;
--palette-dark-bg-darker:      #191A21;
--palette-dark-bg-light:       #343746;
--palette-dark-bg-lighter:     #424450;
--palette-dark-surface:        #44475A;  /* selection */
--palette-dark-fg:             #F8F8F2;
--palette-dark-fg-muted:       #6272A4;  /* comment / current line */
--palette-dark-red:            #FF5555;
--palette-dark-orange:         #FFB86C;
--palette-dark-yellow:         #F1FA8C;
--palette-dark-green:          #50FA7B;
--palette-dark-cyan:           #8BE9FD;
--palette-dark-purple:         #BD93F9;
--palette-dark-pink:           #FF79C6;

/* --- Alucard Classic (Light Mode) --- */
--palette-light-bg:            #FFFBEB;
--palette-light-bg-dark:       #CECCC0;
--palette-light-bg-darker:     #BCBAB3;
--palette-light-bg-light:      #EFEDDC;
--palette-light-bg-lighter:    #ECE9DF;
--palette-light-surface:       #DEDCCF;  /* selection equivalent */
--palette-light-fg:            #1F1F1F;
--palette-light-fg-muted:      #6C664B;  /* comment equivalent */
--palette-light-red:           #CB3A2A;
--palette-light-orange:        #A34D14;
--palette-light-yellow:        #846E15;
--palette-light-green:         #14710A;
--palette-light-cyan:          #036A96;
--palette-light-purple:        #644AC9;
--palette-light-pink:          #A3144D;
```

### Layer 2: Primitive Tokens

Spacing, typography, and breakpoints — palette-independent.

```css
/* Spacing scale (rem-based, 4px grid) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */

/* Font sizes (fluid scale using clamp) */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);
--text-sm: clamp(0.8125rem, 0.75rem + 0.3125vw, 0.875rem);
--text-base: clamp(0.9375rem, 0.875rem + 0.3125vw, 1rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.0625rem + 0.9375vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.125rem + 1.875vw, 2rem);
--text-3xl: clamp(1.875rem, 1.25rem + 3.125vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.25rem + 5vw, 3.5rem);
```

### Layer 3: Semantic Tokens

Map palette values to purposes. Components consume these — never palette or primitive tokens directly.

```css
/* ===== DARK MODE (default: Dracula Classic) ===== */
:root[data-theme="dark"], .dark {
  --color-bg-primary:      var(--palette-dark-bg);
  --color-bg-secondary:    var(--palette-dark-bg-dark);
  --color-bg-tertiary:     var(--palette-dark-bg-darker);
  --color-bg-elevated:     var(--palette-dark-bg-light);
  --color-bg-interactive:  var(--palette-dark-bg-lighter);
  --color-surface:         var(--palette-dark-surface);

  --color-text-primary:    var(--palette-dark-fg);
  --color-text-secondary:  var(--palette-dark-fg-muted);
  --color-text-link:       var(--palette-dark-purple);

  --color-border-default:  var(--palette-dark-surface);
  --color-border-strong:   var(--palette-dark-fg-muted);

  --color-accent:          var(--palette-dark-purple);
  --color-accent-hover:    var(--palette-dark-pink);
  --color-accent-text:     var(--palette-dark-fg);

  /* Functional status colors */
  --color-success:         var(--palette-dark-green);
  --color-warning:         var(--palette-dark-orange);
  --color-error:           var(--palette-dark-red);
  --color-info:            var(--palette-dark-cyan);
}

/* ===== LIGHT MODE (Alucard Classic) ===== */
:root[data-theme="light"], .light {
  --color-bg-primary:      var(--palette-light-bg);
  --color-bg-secondary:    var(--palette-light-bg-light);
  --color-bg-tertiary:     var(--palette-light-bg-lighter);
  --color-bg-elevated:     var(--palette-light-bg-dark);
  --color-bg-interactive:  var(--palette-light-bg-darker);
  --color-surface:         var(--palette-light-surface);

  --color-text-primary:    var(--palette-light-fg);
  --color-text-secondary:  var(--palette-light-fg-muted);
  --color-text-link:       var(--palette-light-purple);

  --color-border-default:  var(--palette-light-surface);
  --color-border-strong:   var(--palette-light-fg-muted);

  --color-accent:          var(--palette-light-purple);
  --color-accent-hover:    var(--palette-light-pink);
  --color-accent-text:     var(--palette-light-fg);

  /* Functional status colors */
  --color-success:         var(--palette-light-green);
  --color-warning:         var(--palette-light-orange);
  --color-error:           var(--palette-light-red);
  --color-info:            var(--palette-light-cyan);
}

/* Semantic spacing */
--spacing-section: var(--space-24);
--spacing-block: var(--space-12);
--spacing-element: var(--space-6);
--spacing-inline: var(--space-3);
```

### Layer 4: Component Tokens

Scoped overrides for specific components. Only create when a component genuinely needs to deviate from semantic tokens.

```css
/* Example: navigation has tighter spacing than the global scale */
--nav-item-gap: var(--space-2);
--nav-padding-y: var(--space-3);
```

## Swapping Palettes

To replace the Dracula palette with a different one:

1. Create a new palette block with the same variable names (`--palette-dark-*`, `--palette-light-*`).
2. Replace Layer 1 in the CSS.
3. Semantic and component tokens remain unchanged — they reference palette slots, not specific colors.
4. Verify WCAG contrast ratios with the new palette.

This architecture ensures the visual identity can evolve without touching component code.

## Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

Mobile-first: default styles target mobile, `@media (min-width: ...)` adds complexity for larger screens.

## Typography Scale

| Token | Use |
|-------|-----|
| `text-4xl` | Page titles, hero headings |
| `text-3xl` | Section headings |
| `text-2xl` | Subsection headings |
| `text-xl` | Card titles, emphasized text |
| `text-lg` | Lead paragraphs, large body text |
| `text-base` | Body text |
| `text-sm` | Captions, metadata, secondary text |
| `text-xs` | Labels, badges, fine print |

## Dark/Light Mode Implementation

- Use `next-themes` for theme switching with `attribute="data-theme"`.
- Tailwind's `dark:` variant maps to `[data-theme="dark"]`.
- Both modes are fully designed — neither is derived from the other.
- Default theme: respect `prefers-color-scheme`, with user override persisted.
- Flash prevention: `next-themes` injects a script in `<head>` to set the theme before paint.
