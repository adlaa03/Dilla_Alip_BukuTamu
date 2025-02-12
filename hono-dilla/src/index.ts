import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Routes } from "./routes/index.js";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

app.route("/posts", Routes);
app.route("/adilla", Routes);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export default app;
