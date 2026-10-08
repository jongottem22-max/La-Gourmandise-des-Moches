import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Download, FileText, HeartHandshake, Mail, MapPin, Phone, ShieldCheck, Sprout, Users,
} from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Kicker, SectionHead, btnPrimary, btnSecondary, btnGhostLight } from "@/components/site/ui";

type Params = Promise<{ lang: string }>;

const WHY_ICONS = [Sprout, Users, HeartHandshake];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "adhesion", dict.adhesionPage.title, dict.adhesionPage.description);
}

export default async function AdhesionPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.adhesionPage;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.adhesion }]} />

      {/* Free-membership banner */}
      <section className="bg-paper pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mx-auto inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-mango px-5 py-2.5 font-display text-lg font-black shadow-sticker">
              <HeartHandshake className="size-5" aria-hidden="true" />
              {d.freeBadge}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why join */}
      <section className="bg-paper py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.kicker} title={d.whyTitle} />
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {d.whyItems.map((item, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <Reveal as="li" key={item.title} delay={i * 120}>
                  <article className="lift h-full rounded-3xl border-2 border-ink bg-paper p-7 shadow-sticker">
                    <span className="grid size-14 place-items-center rounded-2xl border-2 border-ink bg-vanilla shadow-sticker">
                      <Icon className="size-7 text-tomato" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-black">{item.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* The two downloadable documents */}
      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-16 sm:pb-24" id="documents">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.documentsTitle} title={d.documentsTitle} tone="leaf" />
            <p className="-mt-6 mb-10 max-w-3xl text-lg leading-relaxed text-ink-soft">{d.documentsLead}</p>
          </Reveal>

          <ul className="grid gap-7 md:grid-cols-2">
            {d.documents.map((doc, i) => (
              <Reveal as="li" key={doc.file} delay={i * 120}>
                <article className="lift flex h-full flex-col rounded-[2rem] border-2 border-ink bg-paper p-8 shadow-sticker">
                  <span className="grid size-16 place-items-center rounded-2xl border-2 border-ink bg-mango shadow-sticker">
                    <FileText className="size-8 text-ink" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-ink-faint">{doc.meta}</p>
                  <h3 className="mt-1.5 font-display text-2xl font-black leading-snug sm:text-3xl">{doc.name}</h3>
                  <p className="mt-3 grow leading-relaxed text-ink-soft">{doc.description}</p>
                  <div className="mt-7">
                    <a
                      href={`${basePath}${doc.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className={btnPrimary}
                      data-track="doc_download"
                      data-track-label={doc.file}
                    >
                      <Download className="size-5" aria-hidden="true" />
                      {doc.cta}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-8 flex items-start gap-3 rounded-2xl border-2 border-dashed border-tomato bg-tomato-tint/50 px-5 py-4 text-sm font-bold text-ink">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-tomato" aria-hidden="true" />
              {d.printNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* What the volunteer charter says */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={dict.nav.adhesion} title={d.volunteerTitle} />
            <p className="-mt-6 mb-10 max-w-3xl text-lg leading-relaxed text-ink-soft">{d.volunteerLead}</p>
          </Reveal>

          <div className="grid gap-7 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-[2rem] border-2 border-ink bg-leaf-tint/70 p-8 shadow-sticker">
                <Kicker tone="leaf">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  {d.volunteerAssociation}
                </Kicker>
                <ul className="mt-6 space-y-3.5">
                  {d.volunteerAssociationItems.map((item) => (
                    <li key={item} className="flex gap-3 font-semibold text-ink">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="h-full rounded-[2rem] border-2 border-ink bg-vanilla p-8 shadow-sticker">
                <Kicker>
                  <Users className="size-4" aria-hidden="true" />
                  {d.volunteerMember}
                </Kicker>
                <ul className="mt-6 space-y-3.5">
                  {d.volunteerMemberItems.map((item) => (
                    <li key={item} className="flex gap-3 font-semibold text-ink">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-tomato" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 flex items-start gap-3 rounded-2xl border-2 border-dashed border-leaf bg-leaf-tint/40 px-5 py-4 text-sm font-bold text-ink">
              <Sprout className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
              {d.mealsNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps + where to return */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <Reveal>
            <Kicker>
              <BadgeCheck className="size-4" aria-hidden="true" />
              {d.stepsTitle}
            </Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">{d.stepsTitle}</h2>
            <ol className="mt-7 space-y-5">
              {d.stepsItems.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-tomato font-display text-base font-black text-cream shadow-sticker">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl font-black">{step.title}</p>
                    <p className="mt-1 leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-[2rem] border-2 border-ink bg-leaf-tint/70 p-8 shadow-sticker">
              <Kicker tone="leaf">
                <MapPin className="size-4" aria-hidden="true" />
                {d.returnTitle}
              </Kicker>
              <h2 className="mt-5 font-display text-2xl font-black leading-snug sm:text-3xl">{d.returnTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{d.returnText}</p>

              <dl className="mt-6 space-y-4 text-ink">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-faint">{dict.common.labels.address}</dt>
                    <dd className="font-semibold">{BUSINESS.napLine[lang]}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-faint">E-mail</dt>
                    <dd>
                      <a href={`mailto:${BUSINESS.email}`} className="font-semibold break-all hover:underline" data-track="mail_click" data-track-label="adhesion">
                        {BUSINESS.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-ink-faint">{dict.common.labels.hours}</dt>
                    <dd className="font-semibold">{BUSINESS.hours.display[lang]}</dd>
                    <dd className="text-sm font-semibold text-ink-faint">{BUSINESS.hours.closedDisplay[lang]}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GDPR */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <article className="rounded-[2rem] border-2 border-ink bg-paper p-8 shadow-sticker">
              <span className="grid size-14 place-items-center rounded-2xl border-2 border-ink bg-vanilla shadow-sticker">
                <ShieldCheck className="size-7 text-leaf" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-black leading-snug sm:text-3xl">{d.rgpdTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{d.rgpdText}</p>
              <Link
                href={localizedPath(lang, "confidentialite")}
                className="mt-5 inline-flex items-center gap-2 font-extrabold text-leaf-deep hover:underline"
                data-track="cta_click"
                data-track-label="adhesion-privacy"
              >
                {d.rgpdLink}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="torn-top torn-ink relative bg-ink py-18 text-center text-cream sm:py-20">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">{d.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">{d.ctaText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="adhesion-final">
                <Phone className="size-5" aria-hidden="true" />
                {BUSINESS.phone.display[lang]}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className={btnSecondary} data-track="mail_click" data-track-label="adhesion-final">
                <Mail className="size-5" aria-hidden="true" />
                {dict.common.cta.contact}
              </a>
              <Link href={localizedPath(lang, "contact")} className={btnGhostLight} data-track="cta_click" data-track-label="adhesion-contact">
                {dict.nav.contact}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
