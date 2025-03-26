import { Hono } from "hono";
import {
  createPost,
  deletePost,
  getPostById,
  getPost,
  updatePost,
} from "../controller/PostController";
import { db } from "../db/index.js";
import { loginUser, logoutUser } from "../controller/authController";
import { postSchema } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

export const postRouter = new OpenAPIHono();

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

postRouter.get("/data", (c) => getPost(c));
postRouter.post("/data", zValidator("json", postSchema), (c) => createPost(c));
postRouter.get("/data/:id", (c) => getPostById(c));
postRouter.put("/data/:id", zValidator("json", postSchema), (c) =>
  updatePost(c)
);
postRouter.delete("/data/:id", (c) => deletePost(c));
postRouter.post("/logout", logoutUser);

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
      description: "User created successfully",
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

const updateUserRoute = createRoute({
  method: "put",
  path: "/api/posts/data/{id}",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: z.number(),
    },
  ],
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
    200: {
      description: "User updated successfully",
      content: {
        "application/json": {
          schema: postSchema,
        },
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
});

postRouter.openapi(updateUserRoute, updatePost);

const deleteUserRoute = createRoute({
  method: "delete",
  path: "/api/posts/data/{id}",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: z.string(),
    },
  ],
  responses: {
    200: {
      description: "User deleted successfully",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
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
});

postRouter.openapi(deleteUserRoute, deletePost);

postRouter.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "User API",
    version: "1.0.0",
    description: "API untuk mengelola data pengguna",
  },
});

postRouter.get("/ui", swaggerUI({ url: "/api/posts/doc" }));
