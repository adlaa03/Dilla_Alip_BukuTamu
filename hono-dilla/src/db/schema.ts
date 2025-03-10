import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
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
export type Post = typeof post.$inferSelect;
export type InsertPost = typeof post.$inferInsert;

import { z } from "zod";

export const postSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3),
  name: z.string().min(3),
  address: z.string().min(3),
  phone: z
    .string()
    .min(10)
    .regex(/^(?:\+62|62|0)[2-9]\d{7,11}$/, {
      message: "Number must start with '08'",
    }),
});

export type PostForm = z.infer<typeof postSchema>;
