"use client";

import { ArrowUpRight } from "lucide-react";

import { SocialLinks } from "@/components/social-links";
import { useSound } from "@/components/sound/sound-provider";
import { siteConfig } from "@/lib/site-config";

export function ContactActions() {
  const { play } = useSound();

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <a
        href={siteConfig.socials.email}
        onMouseEnter={() => play("hover")}
        onClick={() => play("click")}
        className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 ease-[var(--ease-spring)] hover:-translate-y-0.5"
      >
        Get in touch
        <ArrowUpRight
          className="size-4 transition-transform duration-200 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>

      <SocialLinks className="-ml-2.5" />
    </div>
  );
}
