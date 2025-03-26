import type { Context } from "hono";
import { sign } from "hono/jwt";

const SECRET_KEY: any = process.env.KEY;

export async function loginUser(c: Context) {
  try {
    const body = await c.req.json();
    const { username, password } = body;
    if (username !== "adilla" || password !== "adilla123") {
      return c.json(
        { statusCode: 401, message: "Username atau password salah" },
        401
      );
    }
    const token = await sign({ username }, SECRET_KEY);
    return c.json({
      statusCode: 200,
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    console.error("Error saat login:", error);
    return c.json(
      { statusCode: 500, message: "Terjadi kesalahan server" },
      500
    );
  }
}

// Tambahkan ini di src/controller/authController.ts
import { verify } from "hono/jwt";
import { blacklistedTokens } from "../db/schema";
import { db } from "../db";

export async function logoutUser(c: Context) {
  try {
    // Dapatkan token dari header Authorization
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ statusCode: 401, message: "Token tidak ditemukan" }, 401);
    }

    const token = authHeader.split(" ")[1];

    // Tidak perlu memverifikasi token untuk logout
    // Langsung tambahkan ke blacklist
    try {
      // Tambahkan token ke blacklist dengan expiry 24 jam dari sekarang
      // Ini akan mencegah token digunakan lagi, terlepas dari validitasnya
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await db.insert(blacklistedTokens).values({
        token,
        expiresAt,
      });

      console.log("Token berhasil ditambahkan ke blacklist:", token);

      return c.json({
        statusCode: 200,
        message: "Logout berhasil",
      });
    } catch (dbError) {
      console.error("Error saat menyimpan token ke blacklist:", dbError);
      return c.json(
        { statusCode: 500, message: "Terjadi kesalahan saat logout" },
        500
      );
    }
  } catch (error) {
    console.error("Error saat logout:", error);
    return c.json(
      { statusCode: 500, message: "Terjadi kesalahan server" },
      500
    );
  }
}
