export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Canonical site origin. Priority:
 * 1. NEXT_PUBLIC_SITE_URL (set by the Pages workflow to the custom domain),
 * 2. URL / DEPLOY_PRIME_URL (legacy deploy previews),
 * 3. hard fallback matching the custom domain.
 */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    "https://lagourmandisedesmoches.re";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path}`;
}
