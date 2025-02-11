import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getPosts } from "./controller/PostController";

const app = new Hono();

app.get("/api/posts", getPosts);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
