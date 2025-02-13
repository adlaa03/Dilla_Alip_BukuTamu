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
import prisma from "../../prisma/client/index.js";
import { apiKeyAuth } from "../middleware/auth";

//inistialize router
const router = new Hono();
// router.use(
//   "/auth/*",
//   basicAuth({
//     username: "adilla",
//     password: "adilla123",
//   })
// );

// router.get("/", async (c) => {
//   const auth = await prisma.auth.findFirst();
//   if (auth) {
//     return c.json({
//       statusCode: 200,
//       message: "Authorized",
//       key: auth.key,
//     });
//   }
// });

router.get("/auth/page", (c) => {
  return c.text("You are authorized");
});

// router.use("*", apiKeyAuth);
//routes posts index
router.get("/data", (c) => getPosts(c));

//routes posts create
router.post("/data", (c) => createPost(c));

//routes posts detail
router.get("/data/:id", (c) => getPostById(c));

//route post update
router.put("/data/:id", (c) => updatePost(c));

//route post delete
router.delete("/data/:id", (c) => deletePost(c));

export const Routes = router;
