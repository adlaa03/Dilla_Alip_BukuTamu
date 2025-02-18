// // import { NextRequest, NextResponse } from "next/server";
// // export async function GET(
// //   request: NextRequest,
// //   { params }: { params: { id: number } }
// // ) {
// //   const res = await fetch(
// //     process.env.PATH_URL_BACKEND + `/api/posts/${params.id}`,
// //     {
// //       next: { revalidate: 10 },
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );
// //   const result = await res.json();
// //   return NextResponse.json(result);
// // }
// // export async function PUT(
// //   request: NextRequest,
// //   { params }: { params: { id: number } }
// // ) {
// //   const body = await request.json();
// //   const res = await fetch(
// //     process.env.PATH_URL_BACKEND + `/api/posts/${params.id}`,
// //     {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(body),
// //     }
// //   );
// //   const data = await res.json();
// //   return NextResponse.json(data);
// // }
// // export async function DELETE(
// //   request: NextRequest,
// //   { params }: { params: { id: number } }
// // ) {
// //   const res = await fetch(
// //     process.env.PATH_URL_BACKEND + `/api/posts/${params.id}`,
// //     {
// //       next: { revalidate: 10 },
// //       method: "DELETE",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );
// //   const data = await res.json();
// //   return NextResponse.json(data);
// // }

// "use client";
// import { fetcher } from "@/app/libs";
// import useSWR from "swr";

// export default function Detail({ params }: { params: { id: number } }) {
//   const {
//     data: post,
//     isLoading,
//     error,
//   } = useSWR(`/api/posts/${params.id}`, fetcher);
//   if (isLoading)
//     return (
//       <div>
//         <span>Loading...</span>
//       </div>
//     );
//   if (!post) return null;
//   return (
//     <div className="w-full">
//       <h2 className="text-center font-bold text-3xl py-3">
//         {post.result.title}
//       </h2>

//       <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
//         <p dangerouslySetInnerHTML={{ __html: post.result.content }}></p>
//       </div>
//     </div>
//   );
// }

"use client";

import { fetcher } from "@/app/libs";
import { use } from "react";
import useSWR from "swr";

export default function Detail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const resolvedParams = use(params);
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(`/utils/queries/users/${resolvedParams.id}`, fetcher);

  if (isLoading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  if (error)
    return (
      <div>
        <span>Error fetching data</span>
      </div>
    );
  if (!user)
    return (
      <div>
        <span>No user found</span>
      </div>
    );

  return (
    <div className="w-full">
      <h2 className="text-center font-bold text-3xl py-3">{user.username}</h2>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.username}</p>
      </div>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.name}</p>
      </div>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.address}</p>
      </div>
      <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
        <p>{user.phone}</p>
      </div>
    </div>
  );
}
