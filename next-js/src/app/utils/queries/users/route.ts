/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getApiKey, getAuthToken } from "@/app/utils/helper/authHelper";
// import { userForm } from "@/app/types/userSchema";

// export async function GET() {
//   try {
//     const token = await getAuthToken();
//     const apiKey = await getApiKey(token);

//     const res = await fetch("http://localhost:3000/api/posts/data", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "api-key-dilla": apiKey,
//       },
//     });

//     const result = await res.json();
//     return NextResponse.json({ result });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export const GetAllPost = async ({ userData }: { userData: userForm }) => {
//   try {
//     const token = await getAuthToken();
//     const apiKey = await getApiKey(token);

//     const res = await fetch("http://localhost:3000/api/posts/data", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "api-key-dilla": apiKey,
//       },
//       body: JSON.stringify(userData),
//     });

//     return await res.json();
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

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

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthToken();
    const apiKey = await getApiKey(token);
    const body = await request.json();

    const res = await fetch("http://localhost:3000/api/posts/data", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
