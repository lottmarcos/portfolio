import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";

import { ContactActions } from "./_components/contact-actions";
import { Portrait } from "./_components/portrait";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.tagline,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description: siteConfig.tagline,
    url: "/about",
    type: "profile",
  },
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Wraps configured key phrases in an animated ink underline. */
function withHighlights(text: string, highlights: readonly string[]): ReactNode {
  if (highlights.length === 0) return text;
  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, index) =>
    highlights.includes(part) ? (
      <span key={index} className="ink-underline font-medium text-foreground">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero — asymmetric: text leads, portrait anchors the right. */}
      <section className="grid items-center gap-12 pt-16 pb-20 sm:pt-24 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div>
          <Reveal delay={0}>
            <p className="text-overline mb-5">
              {siteConfig.role} · {siteConfig.location}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display mb-6">{siteConfig.headline}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead max-w-xl">{siteConfig.tagline}</p>
          </Reveal>
        </div>

        <Reveal delay={220} className="flex justify-center md:justify-end">
          <Portrait />
        </Reveal>
      </section>

      {/* Bio */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[0.28fr_0.72fr] md:gap-16">
          <Reveal>
            <h2 className="text-overline md:pt-1.5">Who I am</h2>
          </Reveal>
          <div className="max-w-2xl space-y-5">
            {siteConfig.bio.map((paragraph, index) => (
              <Reveal key={index} delay={index * 60}>
                <p className="text-body">
                  {withHighlights(paragraph, siteConfig.bioHighlights)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[0.28fr_0.72fr] md:gap-16">
          <Reveal>
            <h2 className="text-overline md:pt-1">Working with</h2>
          </Reveal>
          <Reveal>
            <ul className="flex flex-wrap gap-2.5">
              {siteConfig.stack.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground/90 transition-colors duration-200 ease-[var(--ease-out)] hover:border-primary/60 hover:text-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="text-caption mt-5 max-w-md">
              A pragmatic toolkit — chosen per problem, not per trend.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border/60 py-16 sm:py-24">
        <Reveal>
          <h2 className="text-h2 mb-3 max-w-lg text-balance">
            Have a problem worth solving?
          </h2>
          <p className="text-lead mb-8 max-w-md">
            I&rsquo;m always open to interesting systems, hard trade-offs, and
            teams that care about craft.
          </p>
          <ContactActions />
        </Reveal>
      </section>
    </div>
  );
}
