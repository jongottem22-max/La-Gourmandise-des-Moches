import { getDb, hasDatabase } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_SUBJECTS = new Set(["general", "products", "workshop", "producer", "partner"]);

// Naive in-memory rate limit: 5 requests / 10 minutes / IP.
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  // Honeypot: bots fill "company"; pretend success, store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 180);
  const subject = String(body.subject ?? "general").trim().slice(0, 60);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const lang = body.lang === "en" ? "en" : "fr";

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10 || !ALLOWED_SUBJECTS.has(subject)) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  if (!hasDatabase()) {
    console.error("[contact] DATABASE_URL not configured — message dropped");
    return Response.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  }
  try {
    await getDb().insert(contactMessages).values({ name, email, subject, message, lang });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] insert failed", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
