# Visual Direction

## Aesthetic Position

The portfolio's visual identity sits between **editorial minimalism** and **technical precision**. It should feel like a well-designed technical publication, not a SaaS landing page or a design agency showreel.

### Reference Aesthetic

- Clean typography with generous whitespace.
- Monochrome or near-monochrome palette with one deliberate accent.
- Grid-aware layouts that feel structured but not rigid.
- Subtle motion that acknowledges interaction without demanding attention.
- Dark mode as a first-class experience, not an afterthought.

## Anti-Cliche Checklist

Every visual implementation must pass these checks. These are the most common traps in AI-generated UIs:

### Layout

- [ ] No centered-everything layouts without intentional hierarchy variation.
- [ ] No identical card grids — vary visual weight, size, or emphasis across items.
- [ ] No hero sections that are just a heading + subheading + CTA button on a gradient.
- [ ] No full-width sections stacked with no rhythm variation.

### Color

- [ ] No gratuitous gradients (especially blue-to-purple or rainbow).
- [ ] No glow/blur effects that don't serve a functional purpose.
- [ ] No generic dark mode that's just inverted colors without contrast adjustments.
- [ ] Accent color is used sparingly — it should direct attention, not decorate.

### Typography

- [ ] No system font stack used as a "design choice" — typography is intentional.
- [ ] No more than 2 font families in the entire site.
- [ ] No font weights below 400 for body text (readability).
- [ ] Heading sizes create clear visual hierarchy — not just "bigger = more important" in uniform steps.

### Decoration

- [ ] No emoji used as icons in professional contexts.
- [ ] No stock-photo-style imagery.
- [ ] No decorative elements that don't contribute to comprehension or navigation.
- [ ] No rounded cards with drop shadows as the primary layout pattern.

### Motion

- [ ] No entrance animations on scroll (fade-up, slide-in) on more than 2-3 key elements.
- [ ] No animations longer than 300ms for UI state changes.
- [ ] No motion that blocks or delays content access.
- [ ] All motion respects `prefers-reduced-motion`.

## Visual Tuning Parameters

These dimensions help calibrate aesthetic decisions during design discussions. They are not runtime values — they're a shared vocabulary for talking about visual choices.

| Dimension | Range | Portfolio Target | Meaning |
|-----------|-------|-----------------|---------|
| Design Variance | 1-10 | 6-7 | How far from conventional web patterns. Distinctive but navigable. |
| Motion Intensity | 1-10 | 3-4 | Amount and complexity of animation. Subtle and purposeful. |
| Visual Density | 1-10 | 4-5 | Information per viewport. Breathable layouts, clear focal points. |
| Ornament Level | 1-10 | 2-3 | Decorative elements beyond functional UI. Minimal ornamentation. |
| Contrast Drama | 1-10 | 7-8 | Strength of light/dark contrast. Bold contrast for hierarchy. |

## Color Direction

### Active Palette: Dracula Theme

The portfolio uses the Dracula Theme color system with two official variants:

- **Dark mode**: Dracula Classic — deep blue-grey backgrounds (`#282A36`), bright foreground (`#F8F8F2`), vibrant accent colors.
- **Light mode**: Alucard Classic — warm cream backgrounds (`#FFFBEB`), dark foreground (`#1F1F1F`), muted accent colors.

Both are fully designed palettes from the Dracula spec, not inversions of each other.

### Accent Strategy

- **Primary accent**: Purple (`#BD93F9` dark / `#644AC9` light) — used for links, interactive elements, focus indicators.
- **Secondary accent**: Pink (`#FF79C6` dark / `#A3144D` light) — used sparingly for hover states and emphasis.
- **Status colors**: Red (error), orange (warning), green (success), cyan (info) — each with dark and light variants from the Dracula spec.

### Palette Swappability

The token architecture separates palette values from semantic meaning:

```
Palette (Dracula) → Semantic tokens → Components
```

To switch to a different palette in the future, replace only the palette layer. Semantic tokens (`--color-bg-primary`, `--color-text-primary`, etc.) and all component code remain unchanged. See `tokens.md` for the full architecture.

### Contrast Guidelines

- All color pairings must meet WCAG 2.1 AA contrast ratios.
- Test both dark and light modes independently — contrast that passes in one mode may fail in the other.
- The Dracula palette's muted colors (`comment` / `fg-muted`) need careful use — verify contrast on every background they appear on.

## Typography Direction

### Font Pairing Strategy

Two fonts maximum:

1. **Headings**: A font with personality — geometric sans, humanist sans, or transitional serif. Must have strong weight contrast between regular and bold.
2. **Body**: Optimized for reading at text-base to text-sm sizes. Generous x-height, open counters, clear distinction between similar characters (Il1, O0).

### Specific font choices will be made during the design implementation phase, guided by:

- Performance (font file size, number of weights loaded).
- Licensing (prefer open-source or Google Fonts for a portfolio).
- Distinctiveness (avoid the most overused developer portfolio fonts: Inter, Fira Code, Space Grotesk).
- Readability at small sizes for body text.

## Imagery Direction

- Prefer code screenshots, diagrams, and data visualizations over photos.
- If photos are used, they should be authentic, not stock.
- Use SVG for icons and simple illustrations.
- Generative or geometric patterns are acceptable as subtle texture — not as the primary visual identity.
