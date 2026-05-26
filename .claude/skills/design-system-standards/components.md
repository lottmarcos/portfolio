# Component Patterns

## Component Sources

| Source | When to use |
|--------|------------|
| shadcn/ui | For standard interactive primitives (Button, Dialog, Dropdown, Tabs, etc.). Install on demand with `npx shadcn@latest add`. |
| Custom components | For portfolio-specific UI (ProjectCard, SectionHeader, etc.) that don't map to a shadcn primitive. |

## Component Organization

```
src/
  components/
    ui/              # shadcn/ui components (auto-generated, then customized)
      button.tsx
      dialog.tsx
    [feature].tsx    # Portfolio-specific components at the top level
```

- shadcn components go in `ui/`.
- Portfolio-specific components go in `components/` root.
- Route-specific components stay colocated in the route directory.
- Don't create `components/common/` or `components/shared/` — everything in `components/` is shared by definition.

## Component API Rules

### Props

- Use TypeScript interfaces, not `type` aliases, for component props.
- Extend native HTML element props when the component wraps an HTML element:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}
```

- Don't add props for hypothetical use cases. Add them when needed.
- Boolean props use positive naming (`isOpen`, not `isNotClosed`).

### Composition

- Prefer composition over configuration. A component with 10+ props is probably doing too much.
- Use the compound component pattern for complex UI (Header + Header.Title + Header.Actions).
- Pass Server Components as `children` to Client Components to keep server content out of the client bundle.

### Variants

Use `class-variance-authority` (CVA) for variant management:

```tsx
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      primary: "...",
      secondary: "...",
    },
    size: {
      sm: "...",
      md: "...",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})
```

### Styling

- Use Tailwind utility classes exclusively. No inline styles, no CSS modules.
- Use `cn()` (from `src/lib/utils.ts`) to merge conditional classes.
- Token values come from the Tailwind theme — never hardcode colors, spacing, or font sizes.

## State Handling

| State | Approach |
|-------|----------|
| Local UI state (open/closed, selected tab) | `useState` in Client Components |
| Form state | React `useActionState` + Server Actions |
| Optimistic updates | `useOptimistic` |
| Server data | Fetched in Server Components, passed as props |

No external state management libraries.

## What NOT to Do

- Don't create wrapper components that just pass props through to shadcn components.
- Don't add `forwardRef` unless the component is used as a shadcn trigger or form input.
- Don't create abstract "Layout" components — use CSS (Tailwind flex/grid) directly.
- Don't style with `className` strings that mix Tailwind with custom CSS classes.
- Don't create a component for something that's used only once — inline it.
