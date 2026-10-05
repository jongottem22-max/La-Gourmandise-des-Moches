"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type TrackMeta = { label?: string | null } & Record<string, unknown>;

function beacon(type: string, meta?: TrackMeta) {
  try {
    const body = JSON.stringify({
      type,
      path: window.location.pathname,
      lang: document.documentElement.lang?.startsWith("en") ? "en" : "fr",
      meta,
    });
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon && navigator.sendBeacon("/api/events", blob)) return;
    void fetch("/api/events", { method: "POST", body, keepalive: true });
  } catch {
    /* analytics must never break UX */
  }
}

/**
 * Privacy-first first-party analytics: page views + clicks on [data-track] elements.
 * No cookies, no fingerprint, no personal data. See TECHNICAL_ARCHITECTURE.md §7.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    beacon("page_view");
  }, [pathname]);

  // Lazy images inside a transformed iframe never intersect, so they never
  // request their bytes. Force anything near the viewport to load.
  useEffect(() => {
    const wake = () => {
      const height = window.innerHeight || 800;
      document.querySelectorAll("img").forEach((node) => {
        const img = node as HTMLImageElement;
        const rect = img.getBoundingClientRect();
        if (rect.top >= height + 800 || rect.bottom <= -200) return;
        if (img.getAttribute("loading") === "lazy") img.loading = "eager";
        if (!img.complete && img.src) img.src = img.currentSrc || img.src;
      });
    };
    wake();
    const later = window.setTimeout(wake, 800);
    window.addEventListener("scroll", wake, { passive: true, capture: true });
    window.addEventListener("resize", wake);
    return () => {
      window.clearTimeout(later);
      window.removeEventListener("scroll", wake, { capture: true });
      window.removeEventListener("resize", wake);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest?.("[data-track]");
      if (!el) return;
      const type = el.getAttribute("data-track");
      if (!type) return;
      beacon(type, { label: el.getAttribute("data-track-label") });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
