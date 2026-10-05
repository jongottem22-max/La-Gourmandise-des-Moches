import type { Metadata, Viewport } from "next";
import Script from "next/script";
// Self-hosted variable fonts (the exact Google Fonts Fraunces & Karla, latin
// subset, vendored into src/fonts). Keeping them local makes every build and
// preview reproducible — no runtime Google Fonts request, no tracking.
import localFont from "next/font/local";
import { getDictionary, isLang, resolveLang, LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { BUSINESS } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Analytics } from "@/components/site/Analytics";
import { JsonLd } from "@/components/site/JsonLd";
import { identityJsonLd, webSiteJsonLd } from "@/lib/seo";
import "../globals.css";

// Variable file covering opsz 9–144 / wght 100–900 / SOFT / WONK axes.
const fraunces = localFont({
  src: [{ path: "../../fonts/Fraunces-var-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-fraunces",
  display: "swap",
});

const karla = localFont({
  src: [{ path: "../../fonts/Karla-var-latin.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-karla",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff8f5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "La Gourmandise des Moches — L'Entre-Deux, La Réunion",
    template: "%s | La Gourmandise des Moches",
  },
  applicationName: "La Gourmandise des Moches",
  category: "Alimentation artisanale",
  openGraph: {
    siteName: "La Gourmandise des Moches",
    type: "website",
    images: [{ url: absoluteUrl(IMAGES.heroMoches.src), width: IMAGES.heroMoches.width, height: IMAGES.heroMoches.height }],
  },
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) redirect(`/${DEFAULT_LOCALE}`);
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${fraunces.variable} ${karla.variable}`}>
      <body className="min-h-svh">
        <Script src="/menu.js" />
        <a href="#contenu" className="skip-link">
          {dict.nav.skip}
        </a>
        <Header lang={lang} nav={dict.nav} hoursLine={BUSINESS.hours.display[lang]} />
        <main id="contenu">{children}</main>
        <Footer lang={lang} dict={dict} />
        <Analytics />
        <JsonLd data={[...identityJsonLd(lang), webSiteJsonLd(lang)]} />
      </body>
    </html>
  );
}
