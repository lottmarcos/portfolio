# Architecture Guidelines

## App Router Structure

```
src/
  app/
    (marketing)/        # Route group: public pages (home, about, projects)
      page.tsx
      about/page.tsx
      projects/
        page.tsx
        [slug]/page.tsx
    _actions/           # Shared Server Actions
    _components/        # App-level shared components (not design system)
    layout.tsx          # Root layout
    not-found.tsx       # Global 404
    sitemap.ts
    robots.ts
  components/           # Design system components (shared across the app)
    ui/                 # shadcn/ui components
  lib/                  # Utilities, helpers, type definitions
    utils.ts
    types.ts
```

## Routing Patterns

### Route Groups

Use route groups `(name)` to organize routes without affecting the URL structure. Primary use: separating layout concerns (marketing pages vs. interactive sections).

### Dynamic Routes

Use `[slug]` for content-driven pages (projects, posts). Always provide `generateStaticParams` for known slugs to enable static generation.

### Parallel and Intercepting Routes

Do not use until a concrete use case requires them. They add complexity that the portfolio likely doesn't need.

## Component Model

### Server Components (Default)

Every component is a Server Component unless explicitly marked with `"use client"`. Server Components:

- Can `async/await` data directly.
- Have zero client-side JavaScript cost.
- Cannot use hooks, event handlers, or browser APIs.

### Client Components

Add `"use client"` only when the component needs:

- Event handlers (`onClick`, `onChange`, `onSubmit`).
- React hooks (`useState`, `useEffect`, `useRef`).
- Browser APIs (`window`, `document`, `IntersectionObserver`).

### Composition Pattern

Keep Client Components as small and leaf-level as possible. Pass Server Components as `children` to Client Components to avoid pulling entire subtrees into the client bundle:

```tsx
// layout.tsx (Server Component)
<InteractiveWrapper>
  <HeavyServerContent />  {/* stays on the server */}
</InteractiveWrapper>
```

## Data Flow

1. **Server → Client**: Props passed from Server Components to Client Components.
2. **Client → Server**: Server Actions for mutations, form submissions.
3. **No prop drilling**: If data is needed deep in the tree, fetch it in the Server Component that needs it — request memoization deduplicates the calls.

## Error Handling Strategy

- `error.tsx` at route boundaries for graceful degradation.
- Server Actions return structured error objects, never throw to the client.
- Global `not-found.tsx` for unresolved routes.
- No generic "Something went wrong" messages — be specific about what failed and what the user can do.
