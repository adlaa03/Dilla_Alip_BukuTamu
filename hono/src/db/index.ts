import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

// const connection = await mysql.createConnection(process.env.DATABASE_URL ?? "");
// export const db = drizzle(connection, { schema, mode: "default" });

export let db: any;

async function connect() {
  const res = await mysql.createConnection(process.env.DATABASE_URL ?? "");
  db = drizzle(res, { schema, mode: "default" });
}

connect();
