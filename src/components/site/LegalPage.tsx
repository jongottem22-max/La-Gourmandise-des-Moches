import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { Dictionary, Lang, StaticRoute } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

type LegalData = Dictionary["mentionsLegales"];

/** Shared renderer for legal-style prose pages (mentions légales / confidentialité). */
export function LegalPage({
  lang,
  dict,
  data,
  route,
  related,
}: {
  lang: Lang;
  dict: Dictionary;
  data: LegalData;
  route: StaticRoute;
  related: Array<{ label: string; route: StaticRoute }>;
}) {
  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={data.kicker} title={data.h1} sub={data.sub} crumbs={[{ name: data.h1, route }]} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-8 text-sm font-semibold text-ink-faint">{data.updated}</p>
          <div className="flex flex-col gap-6">
            {data.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 60}>
                <section
                  aria-labelledby={`legal-${i}`}
                  className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-sticker sm:p-8"
                >
                  <h2 id={`legal-${i}`} className="flex items-center gap-3 font-display text-xl font-black sm:text-2xl">
                    <FileText className="size-5 shrink-0 text-tomato" aria-hidden="true" />
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="mt-3 leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <nav aria-label={data.alsoSee} className="rounded-3xl border-2 border-dashed border-leaf bg-leaf-tint/60 p-6">
              <p className="text-xs font-extrabold uppercase tracking-wider text-leaf-deep">{data.alsoSee}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
                {related.map((item) => (
                  <li key={item.route}>
                    <Link
                      href={localizedPath(lang, item.route)}
                      className="inline-flex items-center gap-1.5 font-extrabold text-ink hover:text-tomato hover:underline underline-offset-4"
                    >
                      {item.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>
    </>
  );
}
