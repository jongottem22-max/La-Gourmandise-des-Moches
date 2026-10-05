import type { Metadata } from "next";
import { BadgeCheck, Clock3, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { getDictionary, isLang, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { LazyMap } from "@/components/site/LazyMap";
import { FacebookIcon, InstagramIcon } from "@/components/site/BrandIcons";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "contact", dict.contact.title, dict.contact.description);
}

export default async function ContactPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.contact;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.contact }]} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8">
          {/* Direct contact cards */}
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <h2 className="font-display text-2xl font-black">{d.direct.title}</h2>
              <a
                href={BUSINESS.phone.href}
                data-track="tel_click"
                data-track-label="contact-page"
                className="lift group flex items-center gap-4 rounded-3xl border-2 border-ink bg-tomato p-5 text-cream shadow-sticker"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-cream/60">
                  <Phone className="size-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-cream/80">{d.direct.call}</span>
                  <span className="font-display text-2xl font-black group-hover:underline">{BUSINESS.phone.display[lang]}</span>
                </span>
                <span className="sr-only">{dict.common.labels.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                data-track="mail_click"
                data-track-label="contact-page"
                className="lift group flex items-center gap-4 rounded-3xl border-2 border-ink bg-paper p-5 shadow-sticker"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-mango">
                  <Mail className="size-6" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-faint">{d.direct.email}</span>
                  <span className="block truncate font-display text-lg font-black group-hover:underline sm:text-xl">{BUSINESS.email}</span>
                </span>
              </a>
              <div className="flex items-start gap-4 rounded-3xl border-2 border-ink bg-paper p-5 shadow-sticker">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-leaf-tint">
                  <MapPin className="size-6 text-leaf" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-ink-faint">{dict.common.labels.address}</p>
                  <p className="font-display text-lg leading-snug font-black">{BUSINESS.napLine[lang]}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-3xl border-2 border-ink bg-paper p-5 shadow-sticker">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-goyave-tint">
                  <Clock3 className="size-6 text-tomato" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-ink-faint">{dict.common.labels.hours}</p>
                  <p className="font-display text-lg font-black">{BUSINESS.hours.display[lang]}</p>
                  <p className="text-sm font-semibold text-ink-faint">{BUSINESS.hours.closedDisplay[lang]}</p>
                </div>
              </div>
              <p className="flex items-start gap-2.5 rounded-2xl bg-mango-tint/60 px-4 py-3 text-sm font-bold text-ink">
                <Smartphone className="mt-0.5 size-4 shrink-0 text-tomato" aria-hidden="true" />
                {d.direct.whatsappNote}
              </p>
              <div className="flex gap-3">
                <a
                  href={BUSINESS.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="social_click"
                  data-track-label="instagram-contact"
                  className="lift inline-flex flex-1 items-center justify-center gap-2 rounded-3xl border-2 border-ink bg-paper px-4 py-3.5 font-extrabold shadow-sticker"
                >
                  <InstagramIcon className="size-5 text-tomato" />
                  Instagram
                </a>
                <a
                  href={BUSINESS.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="social_click"
                  data-track-label="facebook-contact"
                  className="lift inline-flex flex-1 items-center justify-center gap-2 rounded-3xl border-2 border-ink bg-paper px-4 py-3.5 font-extrabold shadow-sticker"
                >
                  <FacebookIcon className="size-5 text-tomato" />
                  Facebook
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-[2rem] border-2 border-ink bg-paper p-6 shadow-sticker sm:p-9">
              <h2 className="font-display text-2xl font-black">{d.form.title}</h2>
              <div className="mt-6">
                <ContactForm lang={lang} t={d.form} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8">
          <Reveal>
            <LazyMap
              title={dict.boutique.mapTitle}
              ctaLabel={dict.boutique.mapCta}
              loadingLabel={dict.boutique.mapLoading}
              embedUrl={BUSINESS.maps.embed}
              directionsUrl={BUSINESS.maps.directions}
              directionsLabel={dict.common.cta.directions}
            />
          </Reveal>
          <Reveal delay={120}>
            <div id="producteurs" className="h-full rounded-[2rem] border-2 border-ink bg-leaf-tint/70 p-6 shadow-sticker sm:p-8">
              <h2 className="font-display text-2xl font-black">{d.whyTitle}</h2>
              <ul className="mt-5 space-y-3.5">
                {d.whyItems.map((item) => (
                  <li key={item} className="flex gap-3 font-semibold text-ink">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t-2 border-dotted border-ink/20 pt-5 text-sm font-semibold text-ink-faint">
                {dict.common.hoursNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
