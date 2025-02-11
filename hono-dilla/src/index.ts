import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getPosts, createPost, getPostById } from "./controller/PostController";

const app = new Hono();

app.get("/api/posts", getPosts);
app.post("/api/posts", createPost);
app.get("/api/posts/:id", getPostById);
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
