# Data Layer Guidelines

## Data Sources

The portfolio starts simple. Data sources will evolve:

| Phase | Source | Example |
|-------|--------|---------|
| Initial | Static data in TypeScript files | Project list, personal info |
| Content | MDX files in the repo | Blog posts, case studies |
| Dynamic | External APIs or CMS | If content scale demands it |

Do not add a database or CMS until a concrete feature requires it.

## Data Fetching Patterns

### Server Components (Primary)

Fetch data directly in Server Components using `async/await`:

```tsx
async function ProjectList() {
  const projects = await getProjects()
  return <ul>{projects.map(p => <ProjectCard key={p.slug} project={p} />)}</ul>
}
```

### Request Memoization

Multiple components fetching the same data in one render pass are automatically deduplicated. No manual caching needed for same-request reuse.

### Static Data Functions

For data that lives in the repo (projects, profile info), create typed data functions in `src/lib/data/`:

```tsx
// src/lib/data/projects.ts
export function getProjects(): Project[] { /* ... */ }
export function getProjectBySlug(slug: string): Project | undefined { /* ... */ }
```

## Caching Strategy

### Three-Layer Model

1. **Request Memoization** (automatic): Same `fetch()` call in one render = one network request. No config needed.

2. **Data Cache** (configurable): Controls how long fetched data persists across requests.
   - `{ next: { revalidate: 3600 } }` — revalidate every hour.
   - `{ next: { tags: ["projects"] } }` — invalidate on demand with `revalidateTag("projects")`.
   - `{ cache: "no-store" }` — skip cache entirely (rare, for real-time data).

3. **Full Route Cache** (automatic for static routes): Pre-renders HTML + RSC Payload at build time. Invalidated when underlying data revalidates.

### Default Policy

- Static content (projects, about): Fully cached, revalidated on deploy or on-demand.
- Dynamic content (if added later): Cache with tag-based revalidation.
- Real-time data: Use `cache: "no-store"` only when freshness is critical.

## Content with MDX

When blog posts or case studies are added:

- Store `.mdx` files in `src/content/` or a dedicated content directory.
- Use `@next/mdx` or a lightweight MDX processor.
- Define frontmatter schema with Zod for type-safe content.
- Generate static params for all content pages.

## What NOT to Do

- Don't fetch data in Client Components that could be fetched in Server Components.
- Don't create API routes just to serve data to your own UI.
- Don't add a database for data that fits in static files.
- Don't use `useEffect` + `fetch` for initial data loads — that's a client-side waterfall.
- Don't cache everything "just in case" — be intentional about what's cached and why.
