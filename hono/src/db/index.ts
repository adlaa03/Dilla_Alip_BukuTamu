import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

export let db: any;

async function connect() {
  const res = await mysql.createConnection(process.env.DATABASE_URL ?? "");
  db = drizzle(res, { schema, mode: "default" });
}

connect();
