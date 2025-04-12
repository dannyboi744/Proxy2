import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We don't need an extensive database schema for this proxy application
// The users table can remain for potential future authentication features
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// URL validation schema
export const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL including http:// or https://")
});

export type UrlRequest = z.infer<typeof urlSchema>;
