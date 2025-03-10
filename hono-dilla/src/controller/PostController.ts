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

    //HonoApi
    if (!body.name || !body.address || !body.phone) {
      return c.json(
        { error: "All fields are required: name, address, phone" },
        400
      );
    }

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
    console.log("Post ID:", postId);

    const data = await db.select().from(post).where(eq(post.id, postId));
    console.log("Post data:", data);

    //HonoApi
    if (data.length === 0) {
      return c.json(
        {
          success: false,
          message: "ID Post Not Found!",
        },
        404
      );
    }
    //

    return c.json(data[0]);
  } catch (e: unknown) {
    console.error(`Error finding post: ${e}`);
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
}

// export async function updatePost(c: Context) {
//   try {
//     const postId = parseInt(c.req.param("id"));
//     const body = await c.req.json();

//     const username =
//       typeof body["username"] === "string" ? body["username"] : "";
//     const name = typeof body["name"] === "string" ? body["name"] : "";
//     const address = typeof body["address"] === "string" ? body["address"] : "";
//     const phone = typeof body["phone"] === "string" ? body["phone"] : "";

//     await db
//       .update(post)
//       .set({
//         username: username,
//         name: name,
//         address: address,
//         phone: phone,
//       })
//       .where(eq(post.id, postId));

//     const updatedPost = await db.select().from(post).where(eq(post.id, postId));
//     return c.json(updatedPost);
//   } catch (e: unknown) {
//     console.error(`Error updating post: ${e}`);
//   }
// }

export async function updatePost(c: Context) {
  try {
    const userId = parseInt(c.req.param("id"));

    const body = await c.req.json();

    const username =
      typeof body["username"] === "string" ? body["username"] : "";
    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";

    if (!body.name || !body.address || !body.phone) {
      return c.json(
        { error: "All fields are required: name, address, phone" },
        400
      );
    }
    //

    const user = await prisma.post.update({
      where: { id: userId },
      data: {
        username: username,
        name: name,
        address: address,
        phone: phone,
      },
    });

    return c.json(user);
  } catch (e: unknown) {
    console.error(`Error updating post: ${e}`);
  }
}

export async function deletePost(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));

    //HonoApi
    const person = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!person) {
      return c.json(
        {
          statusCode: 404,
          message: "Person not found",
        },
        404
      );
    }
    //

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
