# Accessibility Requirements

WCAG 2.1 AA is the minimum standard. Every feature must pass these requirements before shipping.

## Color and Contrast

- **Normal text** (< 24px / < 18.66px bold): 4.5:1 contrast ratio minimum.
- **Large text** (≥ 24px / ≥ 18.66px bold): 3:1 contrast ratio minimum.
- **UI components** (borders, icons, focus indicators): 3:1 contrast ratio minimum.
- **Never use color alone** to convey information. Pair with icons, patterns, or text.
- Test contrast in both light and dark modes.

## Keyboard Navigation

- All interactive elements must be reachable via Tab key.
- Tab order must follow visual reading order (left-to-right, top-to-bottom).
- Focus must be visible at all times — never `outline: none` without an alternative.
- Escape closes modals, dropdowns, and overlays.
- Arrow keys navigate within composite widgets (tabs, menus, listboxes).
- Enter/Space activates buttons and links.

### Focus Indicators

```css
/* Minimum visible focus style */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

Never remove focus indicators. Customize them to match the design system but ensure they're visible against all backgrounds.

## Semantic HTML

- Use the correct HTML element for its purpose (button for actions, anchor for navigation, input for data entry).
- Headings form a sequential hierarchy: `h1` → `h2` → `h3`. Never skip levels.
- Use landmark elements: `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>`.
- Lists use `<ul>` / `<ol>` / `<dl>`, not styled `<div>` elements.

## ARIA

- Prefer semantic HTML over ARIA. If an HTML element exists for the purpose, use it.
- When ARIA is necessary:
  - `aria-label` for elements without visible text labels.
  - `aria-describedby` for additional context.
  - `aria-expanded` for collapsible content.
  - `aria-hidden="true"` for decorative elements.
  - `role` only when no semantic HTML element fits.
- Never use `aria-*` attributes that contradict the element's native semantics.

## Images and Media

- Every `<img>` has an `alt` attribute.
  - Informative images: describe the content and purpose.
  - Decorative images: use `alt=""` (empty string, not omitted).
- Videos include captions or transcripts.
- No autoplay for audio or video content.

## Motion and Animation

- Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- No essential information conveyed only through animation.
- No flashing content (more than 3 flashes per second).
- Provide controls to pause, stop, or hide auto-updating content.

## Touch Targets

- Minimum size: 44x44 CSS pixels for touch interfaces.
- Ensure adequate spacing between targets to prevent accidental activation.

## Forms

- Every input has a visible `<label>` associated via `htmlFor` / `id`.
- Required fields are indicated visually and programmatically (`required` attribute).
- Error messages are associated with their input via `aria-describedby`.
- Form validation errors are announced to screen readers.

## Testing Checklist

- [ ] Navigate the entire page using only keyboard.
- [ ] Verify all interactive elements have visible focus indicators.
- [ ] Run axe DevTools or Lighthouse accessibility audit.
- [ ] Test with a screen reader (VoiceOver on macOS).
- [ ] Verify contrast ratios with a contrast checker tool.
- [ ] Test with `prefers-reduced-motion: reduce` enabled.
- [ ] Test at 200% browser zoom without content loss or overlap.
- [ ] Verify touch targets on mobile devices.
