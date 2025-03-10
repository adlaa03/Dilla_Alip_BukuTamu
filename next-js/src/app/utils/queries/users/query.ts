/* eslint-disable @typescript-eslint/no-explicit-any */
import { getApiKey, getAuthToken } from "@/app/utils/helper/authHelper";
import { NextResponse } from "next/server";

export const GetAllPost = async () => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch("http://localhost:3000/api/posts/data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-dilla": apiKey,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return { error: error.message };
  }
};

export const ViewPost = async ({ id }: { id: number }) => {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(`http://localhost:3000/api/posts/data/${id}`, {
      next: { revalidate: 10 },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "api-key-dilla": apiKey,
      },
    });

    const data = await res.json();
    return await data;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
