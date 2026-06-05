import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Editorial display serif for headings. Loaded as a variable font (full wght
// range) so `opsz` optical sizing can be requested — Next requires `weight` to
// be omitted/variable when `axes` are set.
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

// Humanist grotesque for body and UI — generous x-height, open counters.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const title = `${siteConfig.name} · ${dict.hero.overline.split(" · ")[0]}`;
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US";
  const ogAlternateLocale = locale === "pt" ? "en_US" : "pt_BR";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      template: `%s · ${siteConfig.name}`,
      default: title,
    },
    description: dict.meta.siteDescription,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description: dict.meta.siteDescription,
      url: siteConfig.url,
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
      description: dict.meta.siteDescription,
      images: [siteConfig.ogImage.path],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`dark ${hankenGrotesk.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='light')d.classList.remove('dark');else d.classList.add('dark')}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-dvh bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
