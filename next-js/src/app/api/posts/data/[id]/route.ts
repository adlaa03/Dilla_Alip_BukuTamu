// /* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await fetch(
    // process.env.PATH_URL_BACKEND + `/api/posts/${params.id}`,
    `http://localhost:3000/api/posts/${params.id}`,
    {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();
  console.log(result);
  return result;
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const body = await request.json();
  const res = await fetch(
    // process.env.PATH_URL_BACKEND + `/api/posts/${params.id}`,
    `http://localhost:3000/api/posts/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}

// export async function DELETE(params: { id: number }) {
//   try {
//     const token = await getAuthToken();
//     const apiKey = await getApiKey(token);

//     const res = await fetch(
//       `http://localhost:3000/api/posts/data/${params.id}`,
//       {
//         next: { revalidate: 10 },
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "api-key": apiKey,
//         },
//       }
//     );

//     return await res.json();
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await fetch(
    // process.env.PATH_URL_BACKEND + `/api/posts/${params.id}`,
    `http://localhost:3000/api/posts/data/${params.id}`,
    {
      next: { revalidate: 10 },
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}
