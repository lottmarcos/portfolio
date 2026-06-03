/**
 * Single source of truth for personal/brand content.
 * Update social URLs here — they are intentionally centralized.
 */
export const siteConfig = {
  name: "Marcos Lott",
  role: "Senior Software Engineer",
  location: "Brazil",
  // Canonical site URL — override in production via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcoslott.dev",

  headline: "I build systems where architecture and craft meet.",
  tagline:
    "Senior software engineer working across the stack — from distributed backends to interfaces people actually enjoy using.",

  // 2–4 first-person paragraphs. Voice: direct, confident, restrained (see tone.md).
  bio: [
    "I'm a senior software engineer focused on the space between engineering depth and product sensibility. I design systems, make the trade-offs explicit, and ship them with an interface that respects the people using it.",
    "My work spans the full stack: Go and event-driven services on the backend, React and Next.js on the frontend, GCP underneath. I work in fintech, where regulation and security aren't obstacles to design around — they're constraints that keep the architecture honest.",
    "I treat AI as a craft tool, not a shortcut. This site runs on a workflow of custom agents, skills, and quality gates: AI wielded with intention, with a human owning every decision.",
    "I care about the details that never show up in a diff — the easing on a transition, the contrast ratio in dark mode, the latency a person actually feels.",
  ],

  // Phrases inside the bio to emphasize with an animated underline (matched verbatim).
  bioHighlights: ["architecture and craft", "AI as a craft tool"],

  // Light reference to the stack — rendered as restrained chips, never a dry list.
  stack: [
    "Go",
    "Distributed systems",
    "TypeScript",
    "React & Next.js",
    "GCP",
    "AI-assisted workflows",
  ],

  socials: {
    github: "https://github.com/marcoslott",
    linkedin: "https://www.linkedin.com/in/marcoslott/",
    email: "mailto:marcos.lott@avenue.us",
  },
} as const;

export type SiteConfig = typeof siteConfig;
