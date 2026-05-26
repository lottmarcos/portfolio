# Usage Guidelines

How to use the design system when building features for the portfolio.

## Quick Reference

### Using Tokens

Always use Tailwind theme values. Never hardcode colors, spacing, or font sizes.

```tsx
// Correct — uses token via Tailwind
<div className="bg-background text-foreground p-6 space-y-4">

// Incorrect — hardcoded values
<div style={{ backgroundColor: '#fff', color: '#1a1a1a', padding: '24px' }}>
```

### Using Components

Install shadcn/ui components on demand:

```bash
npx shadcn@latest add button
```

Customize in `src/components/ui/`. Import from there, not from shadcn packages.

### Conditional Classes

Use the `cn()` utility for conditional class composition:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-classes", isActive && "active-classes")} />
```

### Responsive Design

Mobile-first with Tailwind breakpoint prefixes:

```tsx
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl lg:text-4xl">
```

### Dark Mode

Theme switching handled by `next-themes`. Use semantic token classes so both modes work automatically:

```tsx
// Preferred — semantic tokens adapt to the active theme automatically
<div className="bg-bg-primary text-text-primary">

// When Tailwind dark: variant is needed for overrides
<div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
```

## Common Patterns

### Section Layout

```tsx
<section className="py-section">
  <div className="mx-auto max-w-screen-lg px-4">
    <h2 className="text-3xl font-bold">Section Title</h2>
    {/* content */}
  </div>
</section>
```

### Card Pattern

```tsx
<article className="rounded-lg border border-border p-6">
  <h3 className="text-xl font-semibold">{title}</h3>
  <p className="mt-2 text-secondary">{description}</p>
</article>
```

## What to Avoid

- Inline styles (except for truly dynamic values like calculated positions).
- CSS modules or styled-components — Tailwind is the single styling approach.
- Arbitrary values (`w-[347px]`) — extend the theme if the scale doesn't fit.
- `!important` — restructure the class order instead.
- Mixing Tailwind classes with custom CSS classes.
