import { sql } from "drizzle-orm";
import { bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const post = mysqlTable("posts", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 300 }).notNull(),
  comment: varchar("comment", { length: 300 }).notNull(),
});

export const auth = mysqlTable("auth", {
  key: varchar("key", { length: 191 }).notNull(),
});

export type Post = typeof post.$inferSelect;
export type InsertPost = typeof post.$inferInsert;

import { z } from "zod";

export const postSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3),
  address: z.string().min(3),
  phone: z.string().min(10),
  comment: z.string().min(20),
});

export type PostForm = z.infer<typeof postSchema>;
