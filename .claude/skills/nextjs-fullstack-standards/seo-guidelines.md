# SEO Guidelines

## Metadata Strategy

### Static Metadata (Simple Pages)

Export a `metadata` object for pages with fixed content:

```tsx
export const metadata: Metadata = {
  title: "Projects — Marcos Lott Jr.",
  description: "Selected projects demonstrating fullstack engineering and system design.",
}
```

### Dynamic Metadata (Content Pages)

Use `generateMetadata` for pages with dynamic content:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  return {
    title: `${project.title} — Marcos Lott Jr.`,
    description: project.summary,
  }
}
```

### Root Layout Metadata

Set defaults in the root layout that child pages inherit or override:

- `metadataBase`: The canonical URL of the site.
- `title.template`: Pattern like `"%s — Marcos Lott Jr."` so child pages only set the variable part.
- `openGraph.siteName`: Consistent across all pages.
- `robots`: Default to `index, follow`.

## Open Graph Images

- Provide a static `opengraph-image.png` at the app root for the default OG image.
- Use `opengraph-image.tsx` for dynamic OG images on content pages (projects, posts).
- Target 1200x630px for OG images.

## Sitemap and Robots

Generate both at the app root:

```tsx
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://...", lastModified: new Date() },
    // generate entries for all public routes
  ]
}

// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://.../sitemap.xml",
  }
}
```

## Semantic HTML

- Use `<main>` for the primary content area (one per page).
- Use `<article>` for self-contained content (project pages, blog posts).
- Use `<section>` with headings for thematic grouping.
- Use `<nav>` for navigation blocks.
- Use `<header>` and `<footer>` for page/section chrome.
- Heading hierarchy must be sequential (`h1` → `h2` → `h3`). One `h1` per page.

## Structured Data

Add JSON-LD structured data for:

- **Person** schema on the about page.
- **WebSite** schema on the root layout.
- **Article** schema on blog posts (if added).

Use Next.js `<Script>` with `type="application/ld+json"` or the metadata API's built-in support.

## Canonical URLs

- Set `metadataBase` to avoid duplicate content issues.
- Ensure all pages have canonical URLs.
- If content appears at multiple paths, explicitly set the canonical to the primary path.

## What NOT to Do

- Don't use generic titles like "Home" or "Page".
- Don't duplicate the same meta description across pages.
- Don't skip alt text on images — every image needs a meaningful description.
- Don't use hidden text or keyword stuffing.
- Don't block search engines from crawling public pages.
