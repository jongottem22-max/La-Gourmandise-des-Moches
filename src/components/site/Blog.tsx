/**
 * Journal (blog) building blocks — server components.
 *
 * RichText renders the tiny inline markup used in src/lib/data/blog.ts:
 *   **bold**  → <strong>
 *   [label](href) → next/link for relative hrefs (with {lang} resolved),
 *                    plain <a target="_blank"> for absolute URLs (tel:, mailto:, http).
 */

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock3, ExternalLink, Quote, Tag } from "lucide-react";
import type { BlogBlock, BlogFaq, BlogPost, LocaleText } from "@/lib/data/blog";
import { AUTHOR, localizedDate, plain, readingMinutes } from "@/lib/data/blog";
import type { Lang } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/* ── inline markup ─────────────────────────────────────────────── */

/**
 * Inline renderer. Two passes so the markup can nest: a bold segment is
 * rendered again for links inside it, which is how "**[atelier-boutique](/fr/…)**"
 * comes out as a bold link instead of literal asterisks.
 * Regexes are compiled per call: a module-level /g regex would keep state
 * between renders (React compiler immutability rule).
 */
export function RichText({ text, lang }: { text: string; lang: Lang }) {
  return <>{renderInline(text, lang, true)}</>;
}

function renderInline(text: string, lang: Lang, allowBold: boolean): ReactNode[] {
  const pattern = allowBold
    ? /\[([^\]]+)\]\(([^)]+)\)|\*\*([\s\S]+?)\*\*/g
    : /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[3] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-extrabold text-ink">
          {renderInline(match[3], lang, false)}
        </strong>,
      );
    } else {
      const href = match[2].replaceAll("{lang}", lang);
      const external = /^[a-z]+:|^\/\//i.test(href);
      nodes.push(
        external ? (
          <a
            key={key++}
            href={href}
            className="font-bold text-tomato underline decoration-2 underline-offset-2 hover:text-tomato-deep"
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {match[1]}
          </a>
        ) : (
          <Link
            key={key++}
            href={href}
            className="font-bold text-tomato underline decoration-2 underline-offset-2 hover:text-tomato-deep"
          >
            {match[1]}
          </Link>
        ),
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* ── meta line (date · reading time · author) ──────────────────── */

export function PostMeta({
  post,
  lang,
  dict,
  className,
}: {
  post: BlogPost;
  lang: Lang;
  dict: { publishedLabel: string; readTime: string; authorLabel: string; updatedLabel: string };
  className?: string;
}) {
  const minutes = readingMinutes(post, lang);
  const date = localizedDate(post, lang);
  return (
    <p className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-ink-faint", className)}>
      <time dateTime={post.publishedAt}>
        {dict.publishedLabel} {date}
      </time>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="size-4" aria-hidden="true" />
        {minutes} {dict.readTime}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Tag className="size-4" aria-hidden="true" />
        {dict.authorLabel} {AUTHOR[lang]}
      </span>
      {post.updatedAt && (
        <time dateTime={post.updatedAt}>
          {dict.updatedLabel} {localizedDate({ ...post, publishedAt: post.updatedAt }, lang)}
        </time>
      )}
    </p>
  );
}

/* ── article body ──────────────────────────────────────────────── */

const CALLOUT_TONES: Record<"leaf" | "tomato" | "mango", string> = {
  leaf: "bg-leaf-tint",
  tomato: "bg-tomato-tint/60",
  mango: "bg-mango-tint",
};

export function ArticleBody({ post, lang }: { post: BlogPost; lang: Lang }) {
  return (
    <div className="space-y-6">
      {post.body.map((block, i) => (
        <Block key={i} block={block} lang={lang} />
      ))}
    </div>
  );
}

function Block({ block, lang }: { block: BlogBlock; lang: Lang }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg leading-relaxed text-ink-soft">
          <RichText text={block.text[lang]} lang={lang} />
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="scroll-mt-28 pt-6 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl"
        >
          {block.text[lang]}
        </h2>
      );
    case "h3":
      return <h3 className="pt-3 font-display text-2xl font-black leading-snug">{block.text[lang]}</h3>;
    case "list":
      return (
        <ul className="space-y-3.5">
          {block.items[lang].map((item, i) => (
            <li key={i} className="flex gap-3.5 text-lg leading-relaxed text-ink-soft">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink text-[0.7rem] font-extrabold",
                  block.ordered ? "bg-mango text-ink" : "bg-leaf-tint text-leaf-deep",
                )}
              >
                {block.ordered ? i + 1 : "◆"}
              </span>
              <span>
                <RichText text={item} lang={lang} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className={cn("rounded-[1.75rem] border-2 border-ink p-6 shadow-sticker sm:p-7", CALLOUT_TONES[block.tone])}>
          {block.title && (
            <p className="stamp text-tomato">
              <span aria-hidden="true">◆</span> {block.title[lang]}
            </p>
          )}
          <p className={cn("text-base leading-relaxed text-ink", block.title && "mt-3")}>
            <RichText text={block.text[lang]} lang={lang} />
          </p>
        </aside>
      );
    case "quote":
      return (
        <figure className="rounded-[1.75rem] border-2 border-ink bg-vanilla p-7 text-center shadow-sticker">
          <Quote className="mx-auto size-8 text-tomato" aria-hidden="true" />
          <blockquote className="mt-3 font-display text-2xl font-black italic leading-snug text-balance">
            {block.text[lang]}
          </blockquote>
          <figcaption className="mt-3 text-sm font-bold text-ink-faint">— {block.source[lang]}</figcaption>
        </figure>
      );
    case "figure":
      return (
        <figure className="my-8">
          <div className="rotate-[-0.5deg] rounded-[2rem] border-2 border-ink bg-vanilla p-3 shadow-sticker">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-2 border-ink/15">
              <Image
                src={block.image}
                alt={block.alt[lang]}
                fill
                sizes="(min-width: 768px) 46rem, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-sm font-semibold text-ink-faint">
            {block.caption[lang]}
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
}

/* ── FAQ ───────────────────────────────────────────────────────── */

export function FaqList({ faq, lang, title }: { faq: BlogFaq[]; lang: Lang; title: string }) {
  return (
    <section aria-labelledby="faq" className="mt-16">
      <h2 id="faq" className="scroll-mt-28 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      <dl className="mt-7 space-y-5">
        {faq.map((entry, i) => (
          <div key={i} className="rounded-[1.75rem] border-2 border-ink bg-paper p-6 shadow-sticker sm:p-7">
            <dt className="font-display text-xl font-black leading-snug">
              <RichText text={entry.q[lang]} lang={lang} />
            </dt>
            <dd className="mt-2.5 text-base leading-relaxed text-ink-soft">
              <RichText text={entry.a[lang]} lang={lang} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ── index card ────────────────────────────────────────────────── */

export function PostCard({
  post,
  lang,
  labels,
  featured = false,
}: {
  post: BlogPost;
  lang: Lang;
  labels: { readMore: string; readTime: string; publishedLabel: string; updatedLabel: string; authorLabel: string; featuredLabel: string };
  featured?: boolean;
}) {
  const href = `${localizedPath(lang, "journal")}/${post.slug}`;
  const minutes = readingMinutes(post, lang);

  return (
    <article
      className={cn(
        "lift group h-full overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-sticker",
        featured && "lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch",
      )}
    >
      <div className={cn("relative", featured ? "aspect-[16/11] lg:aspect-auto lg:h-full" : "aspect-[16/10]")}>
        <Image
          src={post.hero.image}
          alt={post.hero.alt[lang]}
          fill
          sizes={featured ? "(min-width: 1024px) 46vw, 92vw" : "(min-width: 1024px) 32vw, 92vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {featured && (
          <p className="absolute top-4 left-4 stamp bg-cream/95">
            <span aria-hidden="true">◆</span> {labels.featuredLabel}
          </p>
        )}
      </div>

      <div className={cn("flex flex-col p-7 sm:p-8", featured && "lg:justify-center")}>
        <p className="stamp text-leaf">{post.category[lang]}</p>
        <h3 className={cn("mt-4 font-display font-black leading-tight tracking-tight text-balance", featured ? "text-3xl sm:text-4xl" : "text-2xl")}>
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.h1[lang]}
          </Link>
        </h3>
        <p className="mt-3.5 text-base leading-relaxed text-ink-soft">{plain(post.lead[lang])}</p>
        <PostMeta post={post} lang={lang} dict={labels} className="mt-5" />
        <p className="mt-6 inline-flex items-center gap-2 font-extrabold text-tomato">
          {labels.readMore}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <span className="ml-1 text-sm font-bold text-ink-faint">
            {minutes} {labels.readTime}
          </span>
        </p>
      </div>
    </article>
  );
}

/* ── tag cloud ─────────────────────────────────────────────────── */

export function TagList({ tags, lang, title }: { tags: LocaleText[]; lang: Lang; title: string }) {
  return (
    <section aria-labelledby="tags" className="mt-14">
      <h2 id="tags" className="font-display text-xl font-black">
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {tags.map((tag, i) => (
          <li
            key={i}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink/20 bg-leaf-tint/70 px-3.5 py-1.5 text-sm font-bold text-leaf-deep"
          >
            {tag[lang]}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Small helper used by the "read next" block. */
export function RelatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-paper px-5 py-4 font-extrabold shadow-sticker transition-all duration-300 hover:-translate-y-0.5 hover:bg-mango-tint"
    >
      <span>{label}</span>
      <ExternalLink className="size-4 shrink-0 text-tomato" aria-hidden="true" />
    </Link>
  );
}
