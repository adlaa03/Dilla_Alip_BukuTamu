export default async function Page() {
  const response = await fetch("http://localhost:3000/api/posts/data", {
    headers: {
      "api-key-dilla": process.env.API_KEY ?? "",
      "jwt-dilla": process.env.JWT ?? "",
    },
  });
  if (!response.ok) {
    return <div>Error: {response.statusText}</div>;
  }

  const dilla = await response.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">List Dilla</h1>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Content</th>
            <th className="border border-gray-400 px-4 py-2">Create At</th>
            <th className="border border-gray-400 px-4 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {dilla.map(
            (post: {
              id: string;
              title: string;
              content: string;
              createdAt: string;
              updatedAt: string;
            }) => (
              <tr key={post.id} className="text-center">
                <td className="border border-gray-400 px-4 py-2">{post.id}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {post.title}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {post.content}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {post.createdAt}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {post.updatedAt}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import useSWR from "swr";
// import { fetcher } from "../libs";
// import Post from "../components/Post";
// import { PostModel } from "../types";
// import Link from "next/link";

// export default function Posts() {
//   const [posts, setPosts] = useState<PostModel[]>([]);
//   const { data, error, isLoading } = useSWR<any>(`/api/posts`, fetcher);
//   useEffect(() => {
//     if (data && data.result.data) {
//       console.log(data.result.data);
//       setPosts(data.result.data);
//     }
//   }, [data, isLoading]);
//   if (error) return <div>Failed to load</div>;
//   if (isLoading) return <div>Loading...</div>;
//   if (!data) return null;
//   let delete_Post: PostModel["deletePost"] = async (id: number) => {
//     const res = await fetch(`/api/posts/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const content = await res.json();
//     if (content.success > 0) {
//       setPosts(
//         posts?.filter((post: PostModel) => {
//           return post.id !== id;
//         })
//       );
//     }
//   };
//   return (
//     <div className="w-full max-w-7xl m-auto">
//       <table className="w-full border-collapse border border-slate-400">
//         <caption className="caption-top py-5 font-bold text-green-500 text-2xl">
//           List Posts - Counter :
//           <span className="text-red-500 font-bold">{posts?.length}</span>
//         </caption>

//         <thead>
//           <tr className="text-center">
//             <th className="border border-slate-300">ID</th>
//             <th className="border border-slate-300">Title</th>
//             <th className="border border-slate-300">Hide</th>
//             <th className="border border-slate-300">Created at</th>
//             <th className="border border-slate-300">Modify</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td colSpan={5}>
//               <Link
//                 href={`/post/create`}
//                 className="bg-green-500 p-2 inline-block text-white"
//               >
//                 Create
//               </Link>
//             </td>
//           </tr>
//           {posts &&
//             posts.map((item: PostModel) => (
//               <Post key={item.id} {...item} deletePost={delete_Post} />
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default async function Page() {
//   const response = await fetch("http://localhost:3000/api/posts/data");
//   if (!response.ok) {
//     return <div>Error: {response.statusText}</div>;
//   }

//   const dilla = await response.json();

//   return (
//     <main>
//       <h1>List dilla</h1>
//       <ul>
//         {dilla.map(
//           (posts: {
//             id: string;
//             title: string;
//             content: string;
//             createdAt: string;
//             updatedAt: string;
//           }) => (
//             <li key={posts.id}>
//               <p>{posts.title}</p>
//               <p>{posts.content}</p>
//               <p>{posts.createdAt}</p>
//               <p>{posts.updatedAt}</p>
//             </li>
//           )
//         )}
//       </ul>
//     </main>
//   );
// }

// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
// //       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
// //           <li className="mb-2">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
// //               src/app/page.tsx
// //             </code>
// //             .
// //           </li>
// //           <li>Save and see your changes instantly.</li>
// //         </ol>

// //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// //           <a
// //             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }
