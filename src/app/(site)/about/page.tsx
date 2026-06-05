import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";
import { siteConfig } from "@/lib/site-config";

import { AboutContent } from "./_components/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const title = `${dict.meta.aboutTitle} · ${siteConfig.name}`;
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US";
  const ogAlternateLocale = locale === "pt" ? "en_US" : "pt_BR";

  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: { canonical: "/about" },
    openGraph: {
      title,
      description: dict.meta.aboutDescription,
      url: "/about",
      type: "profile",
      locale: ogLocale,
      alternateLocale: [ogAlternateLocale],
      images: [
        {
          url: siteConfig.ogImage.path,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          type: siteConfig.ogImage.type,
          alt: dict.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.aboutDescription,
      images: [siteConfig.ogImage.path],
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
