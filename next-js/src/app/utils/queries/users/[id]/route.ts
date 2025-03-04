/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostAddModel } from "@/app/types";
import { getApiKey, getAuthToken } from "@/app/utils/authHelper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(
      `http://localhost:3000/api/posts/data/${params.id}`,
      {
        next: { revalidate: 10 },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "api-key-dilla": apiKey,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);
    const body = await request.json();

    const res = await fetch("http://localhost:3000/api/posts/data", {
      method: "POST",
      headers: {
        Authorization: "Bearer ${token}",
        "api-key-dilla": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(params: { id: number }, userData: PostAddModel) {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);
    // const body = await request.json();

    const res = await fetch(
      `http://localhost:3000/api/posts/data/${params.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "api-key-dilla": apiKey,
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);

    const res = await fetch(
      `http://localhost:3000/api/posts/data/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "api-key-dilla": apiKey,
        },
      }
    );

    const contentType = res.headers.get("content-type");
    const textResponse = await res.text();
    console.log("DELETE Response:", textResponse);

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Unexpected response format: ${textResponse}`);
    }

    const data = JSON.parse(textResponse);

    if (!res.ok) {
      console.error("DELETE Error:", data);
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
