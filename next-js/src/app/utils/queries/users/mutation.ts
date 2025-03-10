/* eslint-disable @typescript-eslint/no-explicit-any */
import { userForm } from "@/app/types/userSchema";
import { getApiKey, getAuthToken } from "@/app/utils/helper/authHelper";

export const PostUser = async ({ userData }: { userData: userForm }) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch("http://localhost:3000/api/posts/data", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-dilla": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const UpdatePost = async ({
  id,
  userData,
}: {
  id: number;
  userData: userForm;
}) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-dilla": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const DeletePost = async (id: number) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-dilla": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Gagal menghapus post.");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
