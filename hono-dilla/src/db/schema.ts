import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
export const post = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 300 }).notNull(),
  phone: varchar({ length: 300 }).notNull(),
});
export const auth = mysqlTable("auth", {
  key: varchar({ length: 191 }),
});

export const blacklistedTokens = mysqlTable("blacklisted_tokens", {
  id: serial("id").primaryKey(),
  token: varchar({ length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});
export type Post = typeof post.$inferSelect;
export type InsertPost = typeof post.$inferInsert;

import { z } from "zod";

export const postSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3),
  name: z.string().min(3),
  address: z.string().min(3),
  phone: z.string().min(10),
});

export type PostForm = z.infer<typeof postSchema>;
