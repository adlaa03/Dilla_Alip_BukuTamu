/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../libs";
import { PostModel } from "../types";
import Link from "next/link";
// import Post from "../components/Post";
import { Button } from "@/components/ui/button";
import DataTable from "../components/tablePost";

export default function Users() {
  const { data, error } = useSWR<{ result: PostModel[] }>(
    `/utils/queries/users`,
    fetcher
  );
  // const [users, setUsers] = useState<PostModel[]>([]);

  // useEffect(() => {
  //   // console.log("Data fetched:", data);
  //   if (data && data.result && Array.isArray(data.result)) {
  //     //   setUsers(data.result);
  //     // } else if (data !== undefined) {
  //     //   console.error("Invalid data format:", data);
  //     setUsers(data.result);
  //   }
  // }, [data, users]);

  // console.log("data :", data);
  // console.log("users :", users);
  // if (error) {
  //   console.error("Error fetching data:", error);
  //   return <div>Failed to load</div>;
  // }

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-5">
        List Users - Counter: {data.result.length}
      </h2>
      <div className="flex justify-center">
        <Link href={`/post/create`}>
          <Button className="mb-4">Create User</Button>
        </Link>
      </div>
      <DataTable data={data.result} />
    </div>
  );
}

// const columns: ColumnDef<PostModel>[] = [
//   { accessorKey: "id", header: "ID" },
//   { accessorKey: "username", header: "Username" },
//   { accessorKey: "name", header: "Name" },
//   { accessorKey: "address", header: "Address" },
//   { accessorKey: "phone", header: "Phone" },
//   {
//     header: "Actions",
//     cell: ({ row }) => (
//       <TableCell className="flex gap-2">
//         <Button
//           variant="destructive"
//           size="sm"
//           onClick={() => deletePost(row.original.id)}
//         >
//           Delete
//         </Button>
//         <Link href={`/post/edit/${row.original.id}`}>
//           <Button variant="outline" size="sm">
//             Edit
//           </Button>
//         </Link>
//         <Link href={`/post/read/${row.original.id}`}>
//           <Button variant="outline" size="sm">
//             View
//           </Button>
//         </Link>
//       </TableCell>
//     ),
//   },
// ];

// return (
//   <div className="container mx-auto py-10">
//     <h2 className="text-2xl font-bold text-center mb-5">
//       List Users - Counter: {Array.isArray(Users) ? Users.length : 0}
//     </h2>
//     <div className="flex justify-center">
//       <Link href={`/post/create`}>
//         <Button className="mb-4">Create User</Button>
//       </Link>
//     </div>

//     <DataTable columns={columns} data={users} />
//   </div>
// );

// <div className="w-full max-w-7xl m-auto">
//   <table className="w-full border-collapse border border-slate-400">
//     <caption className="caption-top py-5 font-bold text-green-500 text-2xl">
//       List Users - Counter:
//       <span className="text-red-500 font-bold">{users.length}</span>
//       <p>
//         <Link
//           href={`/post/create`}
//           className="bg-green-500 p-2 mt-6 inline-block text-white"
//         >
//           Create
//         </Link>
//       </p>
//     </caption>
//     <thead>
//       <tr className="text-center">
//         <th className="border border-slate-300">ID</th>
//         <th className="border border-slate-300">Username</th>
//         <th className="border border-slate-300">Name</th>
//         <th className="border border-slate-300">Address</th>
//         <th className="border border-slate-300">Phone</th>
//         <th className="border border-slate-300">Action Button</th>
//       </tr>
//     </thead>
//     <tbody>
//       {users.map((item: PostModel) => (
//         <Post key={item.id} {...item} deletePost={delete_Post} />
//       ))}
//     </tbody>
//   </table>
