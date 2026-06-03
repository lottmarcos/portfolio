import type { ReactNode } from "react";

import { AnimatedFooter } from "@/components/animated-footer";
import { SiteHeader } from "@/components/site-header";
import { SoundProvider } from "@/components/sound/sound-provider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SoundProvider>
      <a
        href="#main"
        className="sr-only z-[90] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      {/* Opaque surface that scrolls over the sticky footer to reveal it. */}
      <div className="page-surface flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>

      <AnimatedFooter />
    </SoundProvider>
  );
}
