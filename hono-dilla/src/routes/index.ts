//import hono
import { Hono } from "hono";

//import controller
import { createPost, getPosts } from "../controller/PostController";

//inistialize router
const router = new Hono();

//routes posts index
router.get("/", (c) => getPosts(c));

//routes posts create
router.post("/", (c) => createPost(c));

export const Routes = router;
