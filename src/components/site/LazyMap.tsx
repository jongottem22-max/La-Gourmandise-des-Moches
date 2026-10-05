"use client";

import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";

/**
 * The Google Maps embed is loaded immediately so visitors can see the location
 * without an extra click. The directions link works without JS map.
 */
export function LazyMap({
  title,
  ctaLabel,
  loadingLabel,
  embedUrl,
  directionsUrl,
  directionsLabel,
}: {
  title: string;
  ctaLabel: string;
  loadingLabel: string;
  embedUrl: string;
  directionsUrl: string;
  directionsLabel: string;
}) {
  const [load, setLoad] = useState(true);
  const [ready, setReady] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-ink bg-cream shadow-sticker">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        {load ? (
          <>
            {!ready && (
              <p className="absolute inset-0 grid place-items-center bg-paper text-sm font-bold text-ink-soft" role="status">
                {loadingLabel}
              </p>
            )}
            <iframe
              title={title}
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="eager"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setReady(true)}
            />
          </>
        ) : (
          <button
            type="button"
            onClick={() => setLoad(true)}
            className="paper-grain group absolute inset-0 flex w-full flex-col items-center justify-center gap-4 bg-paper p-6 text-center transition-colors hover:bg-mango-tint"
          >
            <span className="grid size-16 place-items-center rounded-full border-2 border-ink bg-tomato text-cream shadow-sticker transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
              <MapPin className="size-8" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-bold">{ctaLabel}</span>
            <span className="text-sm font-semibold text-ink-soft">
              4 C rue Hubert Delisle · Vavang&apos;Art · L&apos;Entre-Deux
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t-2 border-ink/10 bg-cream px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-soft">Vavang&apos;Art — 97414 L&apos;Entre-Deux</p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="map_click"
          data-track-label="directions"
          className="inline-flex items-center gap-1.5 text-sm font-extrabold text-tomato hover:underline"
        >
          {directionsLabel}
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
