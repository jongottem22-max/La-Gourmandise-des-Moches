"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Static-host edition: the site no longer ships a backend, so the old
 * first-party analytics beacons to /api/events are gone (they would just 404).
 *
 * What remains is a UX-critical helper: lazy images inside a transformed
 * iframe (the Arena/e2b preview) never intersect, so they never request their
 * bytes. Force anything near the viewport to load.
 */
export function Analytics() {
  const pathname = usePathname();

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

  return null;
}
