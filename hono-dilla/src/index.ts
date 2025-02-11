import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
} from "./controller/PostController";

const app = new Hono();

app.get("/api/posts", getPosts);
app.post("/api/posts", createPost);
app.get("/api/posts/:id", getPostById);
app.patch("/api/posts/:id", updatePost);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
