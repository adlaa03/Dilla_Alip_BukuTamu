//import hono
import { Hono } from "hono";

//import controller
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/PostController";

//inistialize router
const router = new Hono();

//routes posts index
router.get("/", (c) => getPosts(c));

//routes posts create
router.post("/", (c) => createPost(c));

//routes posts detail
router.get("/:id", (c) => getPostById(c));

//route post update
router.patch("/:id", (c) => updatePost(c));

export const Routes = router;
