import Link from "next/link";
import "./globals.css";

// Root-level 404 used as the exported 404.html on GitHub Pages — and, in dev,
// as the fallback for "/" (the exported site serves public/index.html there
// instead, which redirects to ./fr/).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-cream px-6 py-20 text-ink">
      <div className="max-w-lg text-center">
        <p className="font-display text-6xl font-black text-tomato">404</p>
        <h1 className="mt-4 font-display text-3xl font-black">Oups, bocal introuvable.</h1>
        <p className="mt-3 font-semibold text-ink-faint">
          Cette page s&rsquo;est peut-être envolée au marché. Revenez à l&rsquo;accueil&nbsp;:
        </p>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`${base}/fr/`}
            className="rounded-full border-2 border-ink bg-tomato px-7 py-3 font-extrabold text-cream shadow-sticker"
          >
            Accueil (FR)
          </Link>
          <Link
            href={`${base}/en/`}
            className="rounded-full border-2 border-ink bg-paper px-7 py-3 font-extrabold shadow-sticker"
          >
            Home (EN)
          </Link>
        </p>
      </div>
    </main>
  );
}
