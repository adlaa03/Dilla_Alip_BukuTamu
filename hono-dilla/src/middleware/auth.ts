import type { Context, Next } from "hono";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { auth } from "../db/schema.js";

import { verify } from "hono/jwt";
import { blacklistedTokens } from "../db/schema";

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

// Middleware untuk memeriksa token yang di-blacklist dan melakukan autentikasi
export const jwtAuthWithBlacklist = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ statusCode: 401, message: "Token tidak ditemukan" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    // Periksa apakah token ada di blacklist
    console.log("Checking token in blacklist:", token);
    const blacklistedToken = await db.query.blacklistedTokens.findFirst({
      where: eq(blacklistedTokens.token, token),
    });
    console.log("Blacklisted token found:", blacklistedToken);

    if (blacklistedToken) {
      return c.json(
        {
          statusCode: 401,
          message: "Token tidak valid atau telah kedaluwarsa",
        },
        401
      );
    }

    // Verifikasi token
    try {
      const payload = await verify(token, SECRET_KEY);
      c.set("jwtPayload", payload);
      await next();
    } catch (verifyError) {
      console.error("Error verifying token:", verifyError);
      return c.json({ statusCode: 401, message: "Token tidak valid" }, 401);
    }
  } catch (dbError) {
    console.error("Error checking blacklist:", dbError);
    return c.json(
      { statusCode: 500, message: "Terjadi kesalahan server" },
      500
    );
  }
};
