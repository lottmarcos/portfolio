import Link from "next/link";

import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";

// Single active tab now; the structure leaves room for Blog/Projects later.
const navItems = [{ href: "/about", label: "About", active: true }];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2.5 rounded-md"
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 font-[family-name:var(--font-heading)] text-sm font-semibold text-primary transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-rotate-6"
          >
            ML
          </span>
          <span className="font-[family-name:var(--font-heading)] text-base font-medium tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground aria-[current=page]:text-foreground"
                >
                  {item.label}
                  {item.active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-px bg-primary"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
