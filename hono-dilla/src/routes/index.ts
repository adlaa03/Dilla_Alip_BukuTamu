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
import { postSchema } from "../db/schema";

import { zValidator } from "@hono/zod-validator";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { get } from "node:http";

// export const postRouter = new Hono<{ Variables: JwtVariables }>();
export const postRouter = new OpenAPIHono();

// const SECRET_KEY: any = process.env.KEY;

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

// postRouter.use("/data/*", jwt({ secret: SECRET_KEY }));

// postRouter.use("/data/*", apiKeyAuth);
//routes posts index
postRouter.get("/data", (c) => getPost(c));

//routes posts create
// postRouter.post("/data", (c) => createPost(c));
postRouter.post("/data", zValidator("json", postSchema), (c) => createPost(c));

//routes posts detail
postRouter.get("/data/:id", (c) => getPostById(c));

//route post update
// postRouter.put("/data/:id", (c) => updatePost(c));
postRouter.put("/data/:id", zValidator("json", postSchema), (c) =>
  updatePost(c)
);

//route post delete
postRouter.delete("/data/:id", (c) => deletePost(c));

const getAllUserRoute = createRoute({
  method: "get",
  path: "/api/posts/data",
  responses: {
    200: {
      description: "Get all data user",
      content: {
        "application/json": {
          schema: z.array(postSchema),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

postRouter.openapi(getAllUserRoute, getPost);

const route = createRoute({
  method: "get",
  path: "/api/posts/data",
  responses: {
    200: {
      description: "Get all user",
      content: {
        "application/json": {
          schema: z.array(postSchema),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

postRouter.openapi(route, getPost);

const getDataByID = createRoute({
  method: "get",
  path: "/api/posts/data/{id}",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" },
    },
  ],
  responses: {
    200: {
      description: "Get user person by ID",
      content: {
        "application/json": {
          schema: z.object(postSchema.shape),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});
postRouter.openapi(getDataByID, getPostById);

const createUserRoute = createRoute({
  method: "post",
  path: "/api/posts/data",
  request: {
    body: {
      content: {
        "application/json": {
          schema: postSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Person created successfully",
      content: {
        "application/json": {
          schema: postSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

postRouter.openapi(createUserRoute, createPost);

postRouter.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "User API",
    version: "1.0.0",
    description: "API untuk mengelola data pengguna",
  },
});

postRouter.get("/ui", swaggerUI({ url: "/api/posts/doc" }));
