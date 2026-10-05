import { getDb, hasDatabase } from "@/db";
import { analyticsEvents } from "@/db/schema";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set([
  "page_view",
  "cta_click",
  "tel_click",
  "mail_click",
  "map_click",
  "social_click",
  "form_submit",
  "lang_switch",
]);

/** Privacy-first event sink: path + type + coarse label only. No IP/UA stored. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const type = String(body.type ?? "");
  const path = String(body.path ?? "").slice(0, 200);
  const lang = body.lang === "en" ? "en" : "fr";
  const label = typeof body.meta === "object" && body.meta !== null ? (body.meta as Record<string, unknown>).label : null;
  const meta = typeof label === "string" && label.length > 0 ? { label: label.slice(0, 80) } : null;

  if (!ALLOWED_TYPES.has(type) || !path.startsWith("/")) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!hasDatabase()) {
    // Analytics must never fail noisily — drop silently when no DB is configured.
    return Response.json({ ok: true, stored: false });
  }
  try {
    await getDb().insert(analyticsEvents).values({ type, path, lang, meta });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[events] insert failed", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
