import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";
import { siteConfig } from "@/lib/site-config";

import { AboutContent } from "./_components/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: { canonical: "/about" },
    openGraph: {
      title: `${dict.meta.aboutTitle} · ${siteConfig.name}`,
      description: dict.meta.aboutDescription,
      url: "/about",
      type: "profile",
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
