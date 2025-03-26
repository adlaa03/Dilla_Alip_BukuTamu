import type { Context, Next } from "hono";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { auth } from "../db/schema.js";

import { verify } from "hono/jwt";

const SECRET_KEY: any = process.env.KEY;

export const apiKeyAuth = async (c: Context, next: Next) => {
  const apiKey = c.req.header("api-key-dilla");
  if (!apiKey) {
    return c.json(
      { statusCode: 401, message: "Masukan API key terlebih dahulu" },
      401
    );
  }

  const data = await db.query.auth.findFirst({
    where: eq(auth.key, apiKey),
  });

  if (!data) {
    return c.json({ statusCode: 401, message: "Api key salah" }, 401);
  }
  await next();
};

export const jwtAuth = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ statusCode: 401, message: "Token tidak ditemukan" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifikasi token
    const payload = await verify(token, SECRET_KEY);
    c.set("jwtPayload", payload);
    await next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return c.json({ statusCode: 401, message: "Token tidak valid" }, 401);
  }
};
