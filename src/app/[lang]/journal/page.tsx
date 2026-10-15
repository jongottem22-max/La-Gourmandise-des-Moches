import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, MapPin, Phone, Sparkles } from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BLOG_POSTS, getPostsByDate } from "@/lib/data/blog";
import { BUSINESS } from "@/lib/data/business";
import { pageMetadata } from "@/lib/metadata";
import { blogJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/Blog";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { btnGhostLight, btnPrimary, btnSecondary, Kicker } from "@/components/site/ui";
import { WonkyBanana, WonkyGoyave } from "@/components/site/Doodles";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return {
    ...pageMetadata(lang, "journal", dict.journal.title, dict.journal.description),
    keywords: dict.meta.keywords,
  };
}

export default async function JournalPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.journal;
  const posts = getPostsByDate();
  const [featured, ...rest] = posts;
  const labels = {
    readMore: d.readMore,
    readTime: d.readTime,
    publishedLabel: d.publishedLabel,
    updatedLabel: d.updatedLabel,
    authorLabel: d.authorLabel,
    featuredLabel: d.featuredLabel,
  };

  return (
    <>
      <PageHero
        lang={lang}
        dict={dict}
        kicker={d.kicker}
        title={d.h1}
        sub={d.sub}
        crumbs={[{ name: dict.nav.journal }]}
      />

      {/* Editorial promise + featured article */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-16">
            <Reveal>
              <Kicker>
                <BookOpenText className="size-4" aria-hidden="true" />
                {d.kicker}
              </Kicker>
              <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
                {d.introTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{d.introText}</p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="journal-index">
                  <Phone className="size-5" aria-hidden="true" />
                  {dict.common.cta.call}
                </a>
                <Link
                  href={localizedPath(lang, "boutique-atelier")}
                  className={btnSecondary}
                  data-track="cta_click"
                  data-track-label="journal-index-visit"
                >
                  <MapPin className="size-5" aria-hidden="true" />
                  {dict.common.cta.visit}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>{featured && <PostCard post={featured} lang={lang} labels={labels} featured />}</Reveal>
          </div>
        </div>
      </section>

      {/* Other articles */}
      {rest.length > 0 && (
        <section className="bg-paper py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">{d.latestLabel}</h2>
            <ul className="mt-9 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal as="li" key={post.slug} delay={i * 90} className="h-full">
                  <PostCard post={post} lang={lang} labels={labels} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Upcoming themes (no fake dates, no fake articles) */}
      <section className="torn-top torn-bottom torn-cream relative bg-cream py-18 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Kicker tone="leaf">
              <Sparkles className="size-4" aria-hidden="true" />
              {d.upcomingTitle}
            </Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">{d.upcomingTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{d.upcomingLead}</p>
          </Reveal>
          <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.upcoming.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80} className="h-full">
                <article className="h-full rounded-3xl border-2 border-dashed border-ink/25 bg-paper p-6">
                  <p className="font-display text-lg font-black leading-snug">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="torn-top torn-ink relative overflow-hidden bg-ink py-18 text-center text-cream sm:py-20">
        <WonkyGoyave aria-hidden="true" className="floaty absolute top-10 left-[7%] w-16 opacity-40 [--float-rot:-10deg] sm:w-24" />
        <WonkyBanana aria-hidden="true" className="floaty-alt absolute right-[7%] bottom-10 w-20 opacity-40 [--float-rot:12deg] sm:w-28" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">{d.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">{d.ctaText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="journal-final">
                <Phone className="size-5" aria-hidden="true" />
                {BUSINESS.phone.display[lang]}
              </a>
              <Link href={localizedPath(lang, "contact")} className={btnSecondary} data-track="cta_click" data-track-label="journal-contact">
                {dict.common.cta.contact}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <a
                href={BUSINESS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhostLight}
                data-track="social_click"
                data-track-label="instagram-journal"
              >
                {dict.common.cta.instagram}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd data={blogJsonLd(lang, BLOG_POSTS)} />
    </>
  );
}
