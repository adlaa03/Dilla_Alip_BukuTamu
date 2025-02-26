/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use } from "react";
import { GET } from "@/app/utils/queries/users/[id]/route";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/app/libs";
import { PostModel } from "@/app/types";

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

  console.log("user data:", user);

  // Menambahkan pemeriksaan untuk loading dan error
  if (isLoading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <span>Error fetching data</span>
      </div>
    );
  }

  // Memastikan user tidak undefined sebelum mengakses propertinya
  if (!user) {
    return (
      <div>
        <span>No user found</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4 py-6">
      <h2 className="text-center font-bold text-3xl">{user.username}</h2>
      <Card className="w-full max-w-4xl">
        <CardContent>
          <b>Name</b>
          <p>{user.name}</p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl">
        <CardContent>
          <b>Address</b>
          <p>{user.address}</p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl">
        <CardContent>
          <b>Phone</b>
          <p>{user.phone}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// <div className="w-full">
//   <h2 className="text-center font-bold text-3xl py-3">View User</h2>
//   <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
//     <p>{user.username}</p>
//   </div>
//   <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
//     <p>{user.name}</p>
//   </div>
//   <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
//     <p>{user.address}</p>
//   </div>
//   <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
//     <p>{user.phone}</p>
//   </div>
// </div>
