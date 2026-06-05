/**
 * Non-localized brand constants. All user-facing copy lives in the i18n
 * dictionaries (`src/lib/i18n/dictionaries.ts`).
 */
export const siteConfig = {
  name: "Marcos Lott",
  // Canonical site URL — override in production via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lott.dev",
  ogImage: {
    path: "/og.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
  },

  socials: {
    github: "https://github.com/lottmarcos",
    linkedin: "https://www.linkedin.com/in/lott/",
    linkedinMessage:
      "https://www.linkedin.com/messaging/compose/?recipient=lott",
    instagram: "https://www.instagram.com/lott.dev/",
    email: "mailto:lott.marcos@gmail.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
