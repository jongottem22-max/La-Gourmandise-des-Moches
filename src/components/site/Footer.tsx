import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, Mail, MapPin, Phone, Clock3 } from "lucide-react";
import type { Dictionary, Lang } from "@/lib/i18n";
import { localizedPath, NAV_ROUTES } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { FacebookIcon, InstagramIcon } from "./BrandIcons";

export function Footer({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="torn-bottom torn-ink relative bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-10 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            <Image src={IMAGES.brandLogo} alt="Logo La Gourmandise des Moches" width={84} height={84} className="size-20 rounded-full bg-cream object-cover" />
            <p className="font-display text-2xl font-black leading-tight">
              La Gourmandise
              <span className="block text-tomato-tint italic">des Moches</span>
            </p>
          </div>
          <p className="mt-4 max-w-sm text-cream/75">{dict.footer.tagline}</p>
          <div aria-hidden="true" className="brand-palette mt-5">
            <span className="bg-tomato" />
            <span className="bg-goyave" />
            <span className="bg-mango" />
            <span className="bg-leaf" />
          </div>
          <p className="mt-5 font-display text-lg italic text-mango">« {dict.meta.tagline} »</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={BUSINESS.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-track="social_click"
              data-track-label="instagram-footer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 px-4 py-2 text-sm font-bold transition-colors hover:border-mango hover:text-mango"
            >
              <InstagramIcon /> Instagram
            </a>
            <a
              href={BUSINESS.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              data-track="social_click"
              data-track-label="facebook-footer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 px-4 py-2 text-sm font-bold transition-colors hover:border-mango hover:text-mango"
            >
              <FacebookIcon /> Facebook
            </a>
            <a
              href={BUSINESS.socials.helloasso}
              target="_blank"
              rel="noopener noreferrer"
              data-track="social_click"
              data-track-label="helloasso-footer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 px-4 py-2 text-sm font-bold transition-colors hover:border-goyave hover:text-goyave"
            >
              <HeartHandshake className="size-4" aria-hidden="true" /> HelloAsso
            </a>
          </div>
        </div>

        <nav aria-label={dict.footer.navTitle}>
          <h2 className="font-display text-lg font-bold text-mango">{dict.footer.navTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_ROUTES.map(({ route, key }) => (
              <li key={route}>
                <Link href={localizedPath(lang, route)} className="text-cream/80 transition-colors hover:text-mango">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-bold text-mango">{dict.footer.contactTitle}</h2>
          <address className="mt-4 space-y-3.5 not-italic text-cream/80">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-tomato-tint" aria-hidden="true" />
              <span>{BUSINESS.napLine[lang]}</span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-tomato-tint" aria-hidden="true" />
              <a href={BUSINESS.phone.href} data-track="tel_click" data-track-label="footer" className="transition-colors hover:text-mango">
                {BUSINESS.phone.display[lang]}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-tomato-tint" aria-hidden="true" />
              <a
                href={`mailto:${BUSINESS.email}`}
                data-track="mail_click"
                data-track-label="footer"
                className="break-all transition-colors hover:text-mango"
              >
                {BUSINESS.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-tomato-tint" aria-hidden="true" />
              <span>
                {BUSINESS.hours.display[lang]}
                <span className="block text-sm text-cream/55">{BUSINESS.hours.closedDisplay[lang]}</span>
              </span>
            </p>
            <p className="border-t border-cream/15 pt-3 text-sm italic text-cream/60">{BUSINESS.marketsNote[lang]}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-cream/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © {year} {BUSINESS.name} — {dict.footer.legal}. {dict.footer.rights}
          </p>
          <p className="italic">{dict.footer.madeNote}</p>
          <nav aria-label={dict.footer.legalLinks.mentionsLegales} className="flex gap-3">
            <Link href={localizedPath(lang, "mentions-legales")} className="underline-offset-4 transition-colors hover:text-mango hover:underline">
              {dict.footer.legalLinks.mentionsLegales}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={localizedPath(lang, "confidentialite")} className="underline-offset-4 transition-colors hover:text-mango hover:underline">
              {dict.footer.legalLinks.confidentialite}
            </Link>
          </nav>
          <nav aria-label={dict.nav.language} className="flex gap-3 font-bold">
            <Link href={localizedPath("fr")} hrefLang="fr" lang="fr" className={lang === "fr" ? "text-mango" : "hover:text-mango"}>
              FR
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={localizedPath("en")} hrefLang="en" lang="en" className={lang === "en" ? "text-mango" : "hover:text-mango"}>
              EN
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
