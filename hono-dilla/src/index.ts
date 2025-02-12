import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Routes } from "./routes/index.js";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["*"],
  })
);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

app.route("/posts", Routes);
// app.route("/adilla", Routes);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export default app;
