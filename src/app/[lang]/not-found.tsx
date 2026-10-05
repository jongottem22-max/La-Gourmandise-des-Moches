import Link from "next/link";
import { House } from "lucide-react";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/** Branded 404 within the site chrome (bilingual, paramless). */
export default function NotFound() {
  return (
    <section className="paper-grain grid min-h-[70vh] place-items-center bg-paper px-6 py-20 text-center">
      <div className="max-w-md">
        <p className="font-display text-7xl font-black text-tomato">404</p>
        <h1 className="mt-4 font-display text-3xl font-black tracking-tight">Page introuvable</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Cette page s&apos;est peut-être fait transformer en compote.
          <span className="mt-1 block text-base italic">This page may have been turned into compote.</span>
        </p>
        <Link
          href={`/${DEFAULT_LOCALE}`}
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ink bg-tomato px-6 py-3 font-extrabold text-cream shadow-sticker transition-transform hover:-translate-y-0.5"
        >
          <House className="size-5" aria-hidden="true" />
          Retour à l&apos;accueil · Back home
        </Link>
      </div>
    </section>
  );
}
