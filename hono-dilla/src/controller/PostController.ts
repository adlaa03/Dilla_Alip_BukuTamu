//import context
import { Context } from "hono";

//import prisma client
import prisma from "../../prisma/client";

/**
 * Getting all posts
 */
export const getPosts = async (c: Context) => {
  try {
    console.log("getpost", c);
    //get all posts
    const posts = await prisma.post.findMany({ orderBy: { id: "desc" } });

    //return JSON
    return c.json(posts);
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
  }
};

/**
 * Creating a post
 */
export async function createPost(c: Context) {
  try {
    //get body request
    const body = await c.req.parseBody();

    //check if title and content is string
    const username =
      typeof body["username"] === "string" ? body["username"] : "";
    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";

    //create post
    const post = await prisma.post.create({
      data: {
        username: username,
        name: name,
        address: address,
        phone: phone,
      },
    });

    //return JSON
    return c.json(
      {
        success: true,
        message: "Post Created Successfully!",
        data: post,
      },
      201
    );
  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
  }
}

/**
 * Getting a post by ID
 */
export async function getPostById(c: Context) {
  try {
    // Konversi tipe id menjadi number
    const postId = parseInt(c.req.param("id"));

    //get post by id
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    //if post not found
    if (!post) {
      //return JSON
      return c.json(
        {
          success: false,
          message: "Post Not Found!",
        },
        404
      );
    }

    //return JSON
    return c.json(
      {
        success: true,
        message: `Detail Data Post By ID : ${postId}`,
        data: post,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error finding post: ${e}`);
  }
}

/**
 * Updating a post
 */
export async function updatePost(c: Context) {
  try {
    // Konversi tipe id menjadi number
    const postId = parseInt(c.req.param("id"));

    //get body request
    const body = await c.req.parseBody();

    //check if title and content is string
    const username =
      typeof body["username"] === "string" ? body["username"] : "";
    const name = typeof body["name"] === "string" ? body["name"] : "";
    const address = typeof body["address"] === "string" ? body["address"] : "";
    const phone = typeof body["phone"] === "string" ? body["phone"] : "";

    //update post with prisma
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        username: username,
        name: name,
        address: address,
        phone: phone,
        // updatedAt: new Date(),
      },
    });

    //return JSON
    return c.json(
      {
        success: true,
        message: "Post Updated Successfully!",
        data: post,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error updating post: ${e}`);
  }
}

/**
 * Deleting a post
 */
export async function deletePost(c: Context) {
  try {
    // Konversi tipe id menjadi number
    const postId = parseInt(c.req.param("id"));

    //delete post with prisma
    await prisma.post.delete({
      where: { id: postId },
    });

    //return JSON
    return c.json(
      {
        success: true,
        message: "Post Deleted Successfully!",
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error deleting post: ${e}`);
  }
}
