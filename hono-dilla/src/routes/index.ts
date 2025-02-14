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
import { bearerAuth } from "hono/bearer-auth";

import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

export const postRouter = new Hono<{ Variables: JwtVariables }>();

//basic auth
postRouter.use(
  "/basic/*",
  basicAuth({
    username: "adilla",
    password: "adilla123",
  })
);

postRouter.get("/basic/page", (c) => {
  return c.text("You are authorized");
});

postRouter.delete("/basic/delete/page", (c) => {
  return c.text("Page deleted");
});

//basic bearer
const token = "adillacoba";
postRouter.use("/bearer/*", bearerAuth({ token }));

postRouter.get("/bearer/page", (c) => {
  return c.json({ message: "Read post!" });
});

postRouter.post("bearer/create/page", (c) => {
  return c.json({ message: "Created post!" }, 201);
});

//jwt
postRouter.use(
  "/jwt/*",
  jwt({
    secret: "it-is-very-secret",
  })
);

postRouter.get("/jwt/page", (c) => {
  const payload = c.get("jwtPayload");
  return c.json(payload); // eg: { "sub": "1234567890", "name": "dilla", "iat": 1516239022 }
});

postRouter.use("*", apiKeyAuth);
//routes posts index
postRouter.get("/data", (c) => getPosts(c));

//routes posts create
postRouter.post("/data", (c) => createPost(c));

//routes posts detail
postRouter.get("/data/:id", (c) => getPostById(c));

//route post update
postRouter.put("/data/:id", (c) => updatePost(c));

//route post delete
postRouter.delete("/data/:id", (c) => deletePost(c));

// postRouter.get("/adilla", apiKeyAuth, async (c) => {
//   const auth = await prisma.auth.findFirst();
//   if (auth) {
//     return c.json({
//       statusCode: 200,
//       message: "Authorized",
//       key: auth.key,
//       jwt: auth.jwt,
//     });
//   }
// });

// Specify the variable types to infer the `c.get('jwtPayload')`:
// postRouter.use(
//   "/auth/*",
//   jwt({
//     secret: "41175c2343889ebf33d0e286b67f6d17bcb8c426a856d4466137baba022edf3f",
//   })
// );
