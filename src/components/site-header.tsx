"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/i18n/language-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2.5 rounded-full"
          aria-label={`${siteConfig.name}, ${t.nav.home}`}
        >
          <Image
            src="/profile.jpg"
            alt=""
            width={36}
            height={36}
            priority
            className="size-9 rounded-full object-cover ring-1 ring-border transition-transform duration-300 ease-[var(--ease-spring)] group-hover:scale-105"
          />
          <span className="font-[family-name:var(--font-heading)] text-base font-medium tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                href="/about"
                aria-current="page"
                className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors duration-200"
              >
                {t.nav.about}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-px h-px bg-primary"
                />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-0.5">
          <LanguageToggle />
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
