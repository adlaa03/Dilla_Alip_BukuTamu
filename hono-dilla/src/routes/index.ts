//import hono
import { Hono } from "hono";
import { getPosts } from "../controller/PostController";

//import controller

//inistialize router
const router = new Hono();

//routes posts index
router.get("/", (c) => getPosts(c));

export const Routes = router;
