import { Context } from "hono";

import { asc, eq } from "drizzle-orm";
import { db } from "../db/index";
import { post } from "../db/schema";

export const getPost = async (c: Context) => {
  try {
    const data = await db.query.post.findMany({
      orderBy: [asc(post.id)],
    });

    return c.json(data, 200);
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export async function createPost(c: Context) {
  try {
    const body = await c.req.json();

    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";
    const comment = typeof body["comment"] === "string" ? body["comment"] : "";

    //HonoApi
    if (!body.name || !body.address || !body.phone) {
      return c.json(
        { error: "All fields are required: name, address, phone" },
        400
      );
    }

    const data = await db.insert(post).values({
      name: name,
      address: address,
      phone: phone,
      comment: comment,
    });

    const insertedId = data[0].insertId;

    return c.json({
      id: insertedId,
      name: name,
      address: address,
      phone: phone,
      comment: comment,
    });
  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function getPostById(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));

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

export async function updatePost(c: Context) {
  try {
    const userId = Number.parseInt(c.req.param("id"));
    const body = await c.req.json();

    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";
    const comment = typeof body["comment"] === "string" ? body["comment"] : "";

    if (!body.name || !body.address || !body.phone) {
      return c.json(
        { error: "All fields are required: name, address, phone" },
        400
      );
    }

    const user = await db.select().from(post).where(eq(post.id, userId));
    if (user.length === 0) {
      return c.json({ error: "Post not found" }, 404);
    }

    await db
      .update(post)
      .set({
        name: name,
        address: address,
        phone: phone,
        comment: comment,
      })
      .where(eq(post.id, userId));

    const updatedPost = await db.select().from(post).where(eq(post.id, userId));

    return c.json(updatedPost[0]);
  } catch (e: unknown) {
    console.error(`Error updating post: ${e}`);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function deletePost(c: Context) {
  try {
    const postId = Number.parseInt(c.req.param("id"));

    const person = await db.select().from(post).where(eq(post.id, postId));
    if (person.length === 0) {
      return c.json(
        {
          statusCode: 404,
          message: "Person not found",
        },
        404
      );
    }

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
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
