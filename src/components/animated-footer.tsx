"use client";

import { useEffect, useRef, useState } from "react";

import { SocialLinks } from "@/components/social-links";
import { VisitorTags } from "@/components/visitor-tags/visitor-tags";
import { siteConfig } from "@/lib/site-config";

export function AnimatedFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="site-footer overflow-hidden bg-card text-card-foreground">
      {/* Accent hairline marking the seam where the footer emerges. */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div
        ref={ref}
        data-revealed={revealed}
        className="footer-rise relative mx-auto flex min-h-[26rem] w-full max-w-5xl flex-col justify-between gap-12 px-6 pt-16 pb-10 sm:min-h-[30rem]"
      >
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col">
            <p className="text-overline mb-4">{siteConfig.name}</p>
            <p className="text-h3 max-w-xs text-balance">
              Built with clarity. Open to a good conversation.
            </p>
            <div className="mt-6">
              <SocialLinks className="-ml-2.5" />
            </div>
          </div>

          <div className="md:pl-4">
            <VisitorTags />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-muted-foreground">
          <span className="text-caption">
            Built with Next.js and a lot of coffee ☕
          </span>
          <span className="text-caption tabular-nums">
            © {year} {siteConfig.name}
          </span>
        </div>

        {/* Oversized editorial signature, faint, decorative. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -bottom-6 hidden select-none font-[family-name:var(--font-heading)] text-[7rem] leading-none font-semibold text-primary/[0.06] sm:block lg:text-[9rem]"
        >
          ML
        </span>
      </div>
    </footer>
  );
}
