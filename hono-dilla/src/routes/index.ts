//import hono
import { Hono } from "hono";

//import controller
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/PostController";

import { basicAuth } from "hono/basic-auth";

//inistialize router
const router = new Hono();
router.use(
  "/auth/*",
  basicAuth({
    username: "adilla",
    password: "adilla123",
  })
);

router.get("/auth/page", (c) => {
  return c.text("You are authorized");
});

//routes posts index
router.get("/", (c) => getPosts(c));

//routes posts create
router.post("/", (c) => createPost(c));

//routes posts detail
router.get("/:id", (c) => getPostById(c));

//route post update
router.patch("/:id", (c) => updatePost(c));

//route post delete
router.delete("/:id", (c) => deletePost(c));

export const Routes = router;
