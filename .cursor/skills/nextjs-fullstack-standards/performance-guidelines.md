# Performance Guidelines

## Core Web Vitals Targets

| Metric | Target | What it measures |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Loading performance |
| INP (Interaction to Next Paint) | < 200ms | Responsiveness |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |

## Bundle Budget

| Metric | Target |
|--------|--------|
| First Load JS (per route) | < 100kB |
| Total shared JS | < 80kB |
| Lighthouse Performance score | > 95 |

## Optimization Techniques

### Server Components First

The single most impactful optimization. Server Components send zero JavaScript to the client. Default to them and only add `"use client"` when necessary.

### Image Optimization

- Always use `next/image` for images.
- Provide `width` and `height` to prevent layout shift.
- Use `priority` on above-the-fold images (hero, profile photo).
- Use `loading="lazy"` (default) for below-the-fold images.
- Serve WebP/AVIF via Vercel's image optimization.

### Font Loading

- Use `next/font` for all fonts.
- Load only the weights and subsets needed.
- Use `display: swap` to prevent invisible text during load.
- Preload the primary font to avoid FOUT on critical text.

### Code Splitting

- Next.js App Router automatically splits by route.
- Use `dynamic()` imports for heavy client components that aren't needed on first paint.
- Avoid importing large libraries in shared layouts.

### Streaming and Suspense

- Use `loading.tsx` for route-level streaming.
- Wrap slow data-fetching components in `<Suspense>` with meaningful fallbacks.
- Don't wrap everything in Suspense — only components with genuinely slow data sources.

## Anti-Patterns

- Don't import heavy libraries (chart libs, rich text editors) in the main bundle — use `dynamic()`.
- Don't load fonts from external CDNs (Google Fonts via `<link>`) — use `next/font`.
- Don't use unoptimized `<img>` tags.
- Don't add polyfills unless you need to support specific legacy browsers (you probably don't).
- Don't use `useEffect` for data fetching — it creates client-side waterfalls.

## Measurement

- Use Vercel Analytics for real-user Core Web Vitals data.
- Use Lighthouse CI in the build pipeline for synthetic testing.
- Check bundle size with `next build` output — review the route-by-route breakdown.
- Profile with Chrome DevTools Performance tab for specific interaction issues.
