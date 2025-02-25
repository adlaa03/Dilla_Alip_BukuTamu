import { Context } from "hono";

import { asc, eq } from "drizzle-orm";
import { db } from "../db/index";
import { post } from "../db/schema";
import prisma from "../../prisma/client";

export const getPost = async (c: Context) => {
  try {
    const data = await db.query.post.findMany({
      orderBy: [asc(post.id)],
    });

    return c.json(data);
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
  }
};

export async function createPost(c: Context) {
  try {
    const body = await c.req.json();

    const username =
      typeof body["username"] === "string" ? body["username"] : "";
    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";

    const data = await db.insert(post).values({
      username: username,
      name: name,
      address: address,
      phone: phone,
    });

    return c.json({
      username: username,
      name: name,
      address: address,
      phone: phone,
    });
  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
  }
}

export async function getPostById(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));
    const data = await db.select().from(post).where(eq(post.id, postId));

    if (!data) {
      return c.json(
        {
          success: false,
          message: "ID Post Not Found!",
        },
        404
      );
    }

    return c.json(data);
  } catch (e: unknown) {
    console.error(`Error finding food: ${e}`);
  }
}

export async function updatePost(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));
    const body = await c.req.json();

    const username =
      typeof body["username"] === "string" ? body["username"] : "";
    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";

    await db
      .update(post)
      .set({
        username: username,
        name: name,
        address: address,
        phone: phone,
      })
      .where(eq(post.id, postId));

    const updatedPost = await db.select().from(post).where(eq(post.id, postId));
    return c.json(updatedPost);
  } catch (e: unknown) {
    console.error(`Error updating post: ${e}`);
  }
}

// export async function updatePost(c: Context) {
//   try {
//     const userId = parseInt(c.req.param("id"));

//     const body = await c.req.json();

//     const username =
//       typeof body["username"] === "string" ? body["username"] : "";
//     const name = typeof body["name"] === "string" ? body["name"] : "";
//     const address = typeof body["address"] === "string" ? body["address"] : "";
//     const phone = typeof body["phone"] === "string" ? body["phone"] : "";

//     const user = await prisma.post.update({
//       where: { id: userId },
//       data: {
//         username: username,
//         name: name,
//         address: address,
//         phone: phone,
//       },
//     });

//     return c.json(user);
//   } catch (e: unknown) {
//     console.error(`Error updating post: ${e}`);
//   }
// }

export async function deletePost(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));

    await db.delete(post).where(eq(post.id, postId));

    return c.json(
      {
        statusCode: 200,
        message: "User Berhasil Dihapus!",
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error deleting user: ${e}`);
  }
}
