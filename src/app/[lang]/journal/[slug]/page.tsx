import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { LOCALES, getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { AUTHOR, BLOG_POSTS, getPost, localizedDate, plain, readingMinutes } from "@/lib/data/blog";
import { BUSINESS } from "@/lib/data/business";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";
import { blogPostingJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { ArticleBody, FaqList, RelatedLink, TagList } from "@/components/site/Blog";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { btnGhostLight, btnPrimary, btnSecondary, Kicker } from "@/components/site/ui";

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => BLOG_POSTS.map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata(lang, "journal", post.meta.title[lang], post.meta.description[lang], `/${post.slug}`);
  return {
    ...base,
    keywords: post.meta.keywords[lang],
    authors: [{ name: AUTHOR[lang] }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      section: post.category[lang],
      tags: post.tags.map((tag) => tag[lang]),
      images: [{ url: absoluteUrl(post.hero.image.src), alt: post.hero.alt[lang] }],
    },
  };
}

export default async function JournalPostPage({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.journal;
  const post = getPost(slug);
  if (!post) notFound();

  const journalPath = localizedPath(lang, "journal");
  const headings = post.body.filter((block) => block.type === "h2");

  return (
    <>
      <PageHero
        lang={lang}
        dict={dict}
        kicker={post.category[lang]}
        title={post.h1[lang]}
        sub={plain(post.lead[lang])}
        crumbs={[{ name: dict.nav.journal, route: "journal" }, { name: post.category[lang] }]}
      />

      <article className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Hero visual */}
          <Reveal>
            <figure className="rotate-[-0.4deg] rounded-[2rem] border-2 border-ink bg-vanilla p-3 shadow-sticker">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border-2 border-ink/15">
                <Image
                  src={post.hero.image}
                  alt={post.hero.alt[lang]}
                  fill
                  priority
                  sizes="(min-width: 768px) 46rem, 94vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 px-2 pb-1 text-center text-sm font-semibold text-ink-faint">
                {post.hero.caption[lang]}
              </figcaption>
            </figure>
          </Reveal>

          {/* Byline */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-b-2 border-dotted border-ink/20 pb-5">
            <p className="text-sm font-bold text-ink-soft">
              {d.authorLabel} {AUTHOR[lang]}
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-ink-faint">
              <time dateTime={post.publishedAt}>
                {d.publishedLabel} {localizedDate(post, lang)}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" aria-hidden="true" />
                {readingMinutes(post, lang)} {d.readTime}
              </span>
            </p>
          </div>

          {/* Quick answers */}
          <Reveal>
            <section aria-labelledby="essentiel" className="mt-8 rounded-[1.75rem] border-2 border-ink bg-leaf-tint/70 p-6 shadow-sticker sm:p-7">
              <h2 id="essentiel" className="stamp text-leaf">
                <UtensilsCrossed className="size-4" aria-hidden="true" />
                {lang === "fr" ? "L'essentiel avant de venir" : "The essentials before you come"}
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {post.facts.map((fact, i) => (
                  <div key={i} className="rounded-2xl border-2 border-ink/15 bg-paper px-4 py-3">
                    <dt className="text-xs font-extrabold uppercase tracking-widest text-ink-faint">{fact.label[lang]}</dt>
                    <dd className="mt-1 font-display text-lg font-black leading-snug">{fact.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          {/* Table of contents */}
          {headings.length > 2 && (
            <nav aria-label={d.tocTitle} className="mt-10 rounded-[1.75rem] border-2 border-dashed border-ink/25 bg-paper p-6">
              <h2 className="font-display text-lg font-black">{d.tocTitle}</h2>
              <ol className="mt-3 space-y-2">
                {headings.map((heading, i) =>
                  heading.type === "h2" ? (
                    <li key={heading.id} className="flex gap-3 text-base font-semibold text-ink-soft">
                      <span aria-hidden="true" className="font-display font-black text-tomato">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a href={`#${heading.id}`} className="underline-offset-4 hover:text-ink hover:underline">
                        {heading.text[lang]}
                      </a>
                    </li>
                  ) : null,
                )}
              </ol>
            </nav>
          )}

          {/* Body */}
          <div className="mt-12">
            <ArticleBody post={post} lang={lang} />
          </div>

          <TagList tags={post.tags} lang={lang} title={d.tagsTitle} />

          <FaqList faq={post.faq} lang={lang} title={d.faqTitle} />

          {/* Read next */}
          <section aria-labelledby="related" className="mt-16">
            <h2 id="related" className="font-display text-2xl font-black">
              {d.relatedTitle}
            </h2>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {post.related.map((link) => (
                <li key={link.route}>
                  <RelatedLink href={localizedPath(lang, link.route)} label={link.label[lang]} />
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-12">
            <Link
              href={journalPath}
              className="inline-flex items-center gap-2 font-extrabold text-tomato underline-offset-4 hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {d.backToJournal}
            </Link>
          </p>
          <p className="mt-3 text-sm font-semibold text-ink-faint">{d.photoNote}</p>
        </div>
      </article>

      {/* Conversion block */}
      <section className="torn-top torn-ink relative bg-ink py-18 text-center text-cream sm:py-20">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <Reveal>
            <Kicker className="bg-cream">{dict.nav.restaurant}</Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.articleCtaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">{d.articleCtaText}</p>
            <p className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base font-extrabold text-mango">
              <span>{BUSINESS.napLine[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>
                {lang === "fr" ? "Dimanche – vendredi, 11h30 – 15h30" : "Sunday – Friday, 11.30 am – 3.30 pm"}
              </span>
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="journal-article">
                <Phone className="size-5" aria-hidden="true" />
                {BUSINESS.phone.display[lang]}
              </a>
              <Link
                href={localizedPath(lang, "restaurant")}
                className={btnSecondary}
                data-track="cta_click"
                data-track-label="journal-article-restaurant"
              >
                <UtensilsCrossed className="size-5" aria-hidden="true" />
                {dict.home.restaurant.cta}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <a
                href={BUSINESS.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhostLight}
                data-track="map_click"
                data-track-label="journal-article"
              >
                <MapPin className="size-5" aria-hidden="true" />
                {dict.common.cta.directions}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd data={blogPostingJsonLd(lang, post)} />
      <JsonLd data={faqJsonLd(post.faq.map((entry) => ({ q: plain(entry.q[lang]), a: plain(entry.a[lang]) })))} />
    </>
  );
}
