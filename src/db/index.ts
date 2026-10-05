import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Lazy DB client — serverless friendly:
 * - no connection and no throw at import/build time (SSG must work without a DB),
 * - small pool + short idle timeout for AWS-Lambda-style runtimes (Netlify),
 * - Neon/Netlify DB ready: use the pooled `DATABASE_URL` (sslmode=require).
 */

const globalForDb = globalThis as typeof globalThis & {
  __lgdmPool?: Pool;
  __lgdmDb?: NodePgDatabase;
};

function createPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }
  return new Pool({
    connectionString: databaseUrl,
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 8_000,
    // Managed Postgres (Neon, Netlify DB, Supabase) requires TLS; local Postgres does not.
    ssl: databaseUrl.includes("sslmode=")
      ? undefined // honor the explicit sslmode in the connection string
      : databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1")
        ? undefined
        : { rejectUnauthorized: false },
  });
}

export function getDb(): NodePgDatabase {
  if (!globalForDb.__lgdmDb) {
    globalForDb.__lgdmPool = globalForDb.__lgdmPool ?? createPool();
    globalForDb.__lgdmDb = drizzle(globalForDb.__lgdmPool);
  }
  return globalForDb.__lgdmDb;
}

/** True when a database is configured (lets route handlers degrade gracefully). */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
