import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { postRouter } from "./routes";

const app = new Hono().basePath("/api");

// app.use(
//   "*",
//   cors({
//     origin: "http://localhost:3000",
//     allowMethods: ["GET", "POST", "PUT", "DELETE"],
//     allowHeaders: ["*"],
//   })
// );

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  } as any)
);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

app.route("/posts", postRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export default app;
