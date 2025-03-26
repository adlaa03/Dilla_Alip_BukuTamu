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

export async function logoutUser(c: Context) {
  try {
    // Cek apakah token ada di header Authorization
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ statusCode: 401, message: "Token tidak ditemukan" }, 401);
    }

    // Logout hanya dengan memberi respons ke klien untuk menghapus token
    return c.json({
      statusCode: 200,
      message: "Logout berhasil, harap hapus token dari klien",
    });
  } catch (error) {
    console.error("Error saat logout:", error);
    return c.json(
      { statusCode: 500, message: "Terjadi kesalahan server" },
      500
    );
  }
}
