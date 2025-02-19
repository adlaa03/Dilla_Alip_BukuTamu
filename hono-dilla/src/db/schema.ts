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
