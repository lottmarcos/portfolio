import type { ReactNode } from "react";

import { AnimatedFooter } from "@/components/animated-footer";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { SiteHeader } from "@/components/site-header";
import { SoundProvider } from "@/components/sound/sound-provider";
import { getLocale } from "@/lib/i18n/server";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <LanguageProvider initialLocale={locale}>
      <SoundProvider>
        <a
          href="#main"
          className="sr-only z-[90] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          {locale === "pt" ? "Pular para o conteúdo" : "Skip to content"}
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
    </LanguageProvider>
  );
}
