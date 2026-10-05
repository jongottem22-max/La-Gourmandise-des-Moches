import { getDb, hasDatabase } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDatabase()) {
    // Site is up; DB simply not configured on this host (e.g. static-first deploy).
    return Response.json({ ok: true, db: false });
  }
  try {
    await getDb().execute(sql`select 1`);
    return Response.json({ ok: true, db: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
