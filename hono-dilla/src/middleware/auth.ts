import type { Context, Next } from "hono";
import prisma from "../../prisma/client";

export const apiKeyAuth = async (c: Context, next: Next) => {
  const apiKey = c.req.header("api-key-dilla");
  const jwtToken = c.req.header("jwt-dilla");

  if (apiKey) console.log("Header Api Key:", apiKey);
  if (jwtToken) console.log("Header JWT:", jwtToken);

  const auth = await prisma.auth.findFirst({
    where: { key: apiKey },
  });

  if (!auth) {
    return c.json({ statusCode: 401, message: "Api key atau JWT salah" }, 401);
  }

  if (!apiKey) {
    return c.json(
      { statusCode: 401, message: "Masukan API key terlebih dahulu" },
      401
    );
  }

  if (!jwtToken) {
    return c.json(
      { statusCode: 401, message: "Masukan JWT terlebih dahulu" },
      401
    );
  }

  if (auth.jwt !== jwtToken) {
    return c.json({ statusCode: 401, message: "JWT tidak sesuai" }, 401);
  }

  await next();
};
