import { boolean, bigserial, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/** Messages sent via the bilingual contact form. */
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  subject: varchar("subject", { length: 60 }).notNull(),
  message: text("message").notNull(),
  lang: varchar("lang", { length: 2 }).notNull().default("fr"),
  handled: boolean("handled").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Privacy-first, first-party analytics (no cookies, no IP, no UA — see TECHNICAL_ARCHITECTURE.md). */
export const analyticsEvents = pgTable("analytics_events", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  type: varchar("type", { length: 40 }).notNull(),
  path: text("path").notNull(),
  lang: varchar("lang", { length: 2 }).notNull().default("fr"),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
