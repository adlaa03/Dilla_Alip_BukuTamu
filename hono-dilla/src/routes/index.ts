//import hono
import { Hono } from "hono";

//import controller
import {
  createPost,
  deletePost,
  getPostById,
  getPost,
  updatePost,
} from "../controller/PostController";

import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";

import { db } from "../db/index.js";
import { apiKeyAuth } from "../middleware/auth";

import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { loginUser } from "../controller/authController";

export const postRouter = new Hono<{ Variables: JwtVariables }>();

const SECRET_KEY: any = process.env.KEY;

postRouter.post("/login", loginUser);

postRouter.get("/", async (c) => {
  const auth = await db.query.auth.findFirst();

  if (auth) {
    return c.json({
      statusCode: 200,
      message: "Authorized",
      key: auth.key,
    });
  }
});

postRouter.use("/data/*", jwt({ secret: SECRET_KEY }));

postRouter.use("/data/*", apiKeyAuth);
//routes posts index
postRouter.get("/data", (c) => getPost(c));

//routes posts create
postRouter.post("/data", (c) => createPost(c));

//routes posts detail
postRouter.get("/data/:id", (c) => getPostById(c));

//route post update
postRouter.put("/data/:id", (c) => updatePost(c));

//route post delete
postRouter.delete("/data/:id", (c) => deletePost(c));
