require("iconv-lite").encodingExists("foo");
import { Context } from "hono";
import prisma from "../prisma/client";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../src/controller/PostController";
import { db } from "../src/db";
import { post } from "../src/db/schema";
import { eq } from "drizzle-orm";

describe("getPost test", () => {
  test("getPost test", async () => {
    const getPostsTest = {
      json: jest.fn(),
    } as unknown as Context;

    const posts = await prisma.post.findMany();

    await getPost(getPostsTest);

    expect(getPostsTest.json).toHaveBeenCalledWith(posts);
  });

  test("getPostById test", async () => {
    const postId = 10;
    const getPostsByIdTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
      },
      json: jest.fn(),
    } as unknown as Context;

    const Posts = await prisma.post.findMany();

    await getPost(getPostsByIdTest);

    expect(getPostsByIdTest.json).toHaveBeenCalledWith(Posts);
  });
});

describe("createPost test", () => {
  test("createPost test", async () => {
    const createTest = {
      req: {
        json: jest.fn().mockResolvedValue({
          username: "user",
          name: "name",
          address: "address",
          phone: "000000000000",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newPostData = {
      username: "user",
      name: "name",
      address: "address",
      phone: "000000000000",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining(newPostData)
    );
  });

  test("createUser without username", async () => {
    const createTest = {
      req: {
        json: jest.fn().mockReturnValue({
          name: "name user",
          address: "address",
          phone: "000000000000",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newPostData = {
      name: "name user",
      address: "address",
      phone: "000000000000",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "name user",
        address: "address",
        phone: "000000000000",
      })
    );
  });

  test("createUser without name", async () => {
    const createTest = {
      req: {
        json: jest.fn().mockReturnValue({
          username: "username",
          address: "address",
          phone: "000000000000",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newPostData = {
      username: "username",
      address: "address",
      phone: "000000000000",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining(newPostData)
    );
  });

  test("createUser without address", async () => {
    const createTest = {
      req: {
        json: jest.fn().mockReturnValue({
          username: "username",
          name: "name",
          phone: "000000000000",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newPostData = {
      username: "username",
      name: "name",
      phone: "000000000000",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining(newPostData)
    );
  });

  test("createUser without phone", async () => {
    const createTest = {
      req: {
        json: jest.fn().mockReturnValue({
          username: "username",
          name: "name",
          address: "address",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const newPostData = {
      username: "username",
      name: "name",
      address: "address",
    };

    await createPost(createTest);

    expect(createTest.json).toHaveBeenCalledWith(
      expect.objectContaining(newPostData)
    );
  });
});

describe("updatePost describe", () => {
  test("updatePost update all", async () => {
    const postId = 12;
    const updateTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
        json: jest.fn().mockResolvedValue({
          username: "update username",
          name: "update name",
          address: "update address",
          phone: "1234567890",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedPostData = {
      username: "update username",
      name: "update name",
      address: "update address",
      phone: "1234567890",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining(updatedPostData)
    );
  });

  test("updatePost update username only", async () => {
    const postId = 12;
    const updateTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
        json: jest.fn().mockResolvedValue({
          username: "update username",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedPostData = {
      username: "update username",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining(updatedPostData)
    );
  });

  test("updatePost update name only", async () => {
    const postId = 12;
    const updateTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
        json: jest.fn().mockResolvedValue({
          name: "update name",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedPostData = {
      name: "update name",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining(updatedPostData)
    );
  });

  test("updatePost update address only", async () => {
    const postId = 13;
    const updateTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
        json: jest.fn().mockResolvedValue({
          address: "update address",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedPostData = {
      address: "update address",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining(updatedPostData)
    );
  });

  test("updatePost update phone only", async () => {
    const postId = 14;
    const updateTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
        json: jest.fn().mockResolvedValue({
          phone: "1234567890",
        }),
      },
      json: jest.fn(),
    } as unknown as Context;

    const updatedPostData = {
      phone: "1234567890",
    };

    await updatePost(updateTest);

    expect(updateTest.json).toHaveBeenCalledWith(
      expect.objectContaining(updatedPostData)
    );
  });
});

describe("deletePost test", () => {
  test("deletePost test", async () => {
    const postId = 10;
    const deleteTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
      },
      json: jest.fn(),
    } as unknown as Context;

    await deletePost(deleteTest);

    expect(deleteTest.json).toHaveBeenCalledWith(
      {
        message: "User Berhasil Dihapus!",
        statusCode: 200,
      },
      200
    );
  });

  test("deletePost id doenst exist", async () => {
    const postId = 11;
    const deleteTest = {
      req: {
        param: jest.fn().mockReturnValue(postId),
      },
      json: jest.fn(),
    } as unknown as Context;

    await deletePost(deleteTest);

    expect(deleteTest.json).toHaveBeenCalledWith(
      {
        message: "User Berhasil Dihapus!",
        statusCode: 200,
      },
      200
    );
  });
});
