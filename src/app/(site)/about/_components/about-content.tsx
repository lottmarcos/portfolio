"use client";

import { useEffect, type ReactNode } from "react";

import { FooterEndSnap } from "@/components/footer-end-snap";
import { useLanguage } from "@/components/i18n/language-provider";
import {
  ABOUT_SNAP_HEADER_OFFSET_CSS_VAR,
  ABOUT_SNAP_HEADER_OFFSET_PX,
} from "@/lib/about-scroll-snap-config";
import { Reveal } from "@/components/reveal";
import { Timeline } from "@/components/timeline";

import { ContactActions } from "./contact-actions";
import { Portrait } from "./portrait";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Wraps configured key phrases in an animated ink underline. */
function withHighlights(text: string, highlights: string[]): ReactNode {
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

export function AboutContent() {
  const { t } = useLanguage();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("about-snap");
    root.style.setProperty(
      ABOUT_SNAP_HEADER_OFFSET_CSS_VAR,
      `${ABOUT_SNAP_HEADER_OFFSET_PX}px`
    );
    return () => {
      root.classList.remove("about-snap");
      root.style.removeProperty(ABOUT_SNAP_HEADER_OFFSET_CSS_VAR);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero — asymmetric: text leads, portrait anchors the right. */}
      <section className="snap-section grid items-center gap-12 pt-16 pb-20 sm:pt-24 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div>
          <Reveal delay={0}>
            <p className="text-overline mb-5">{t.hero.overline}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display mb-6">{t.hero.headline}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead max-w-xl">{t.hero.tagline}</p>
          </Reveal>
        </div>

        <Reveal delay={220} className="flex justify-center md:justify-end">
          <Portrait alt={t.hero.portraitAlt} />
        </Reveal>
      </section>

      {/* Bio */}
      <section className="snap-section border-t border-border/60 py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[0.28fr_0.72fr] md:gap-16">
          <div className="md:sticky md:top-[var(--snap-header-offset)] md:self-start">
            <Reveal>
              <h2 className="text-overline md:pt-1.5">{t.bio.heading}</h2>
            </Reveal>
          </div>
          <div className="max-w-2xl space-y-5">
            {t.bio.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 60}>
                <p className="text-body">
                  {withHighlights(paragraph, t.bio.highlights)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Stack */}
      <section className="snap-section border-t border-border/60 py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[0.28fr_0.72fr] md:gap-16">
          <div className="md:sticky md:top-[var(--snap-header-offset)] md:self-start">
            <Reveal>
              <h2 className="text-overline md:pt-1">{t.stack.heading}</h2>
            </Reveal>
          </div>
          <Reveal>
            <ul className="flex flex-wrap gap-2.5">
              {t.stack.items.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground/90 transition-colors duration-200 ease-[var(--ease-out)] hover:border-primary/60 hover:text-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="text-caption mt-5 max-w-md">{t.stack.caption}</p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="snap-section border-t border-border/60 py-16 sm:py-24">
        <Reveal>
          <h2 className="text-h2 mb-3 max-w-lg text-balance">{t.contact.heading}</h2>
          <p className="text-lead mb-8 max-w-md">{t.contact.lead}</p>
          <ContactActions />
        </Reveal>
      </section>

      <div className="snap-page-end" aria-hidden="true" />
      <FooterEndSnap />
    </div>
  );
}
