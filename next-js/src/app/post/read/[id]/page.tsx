/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use } from "react";
import { GET } from "@/app/utils/queries/users/[id]/route";
import { useQuery } from "@tanstack/react-query";
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

  return (
    <div className="w-full">
      {user.map((userData: PostModel) => (
        <div key={userData.id}>
          <h2 className="text-center font-bold text-3xl py-3">
            {userData.username}
          </h2>
          <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
            <p>{userData.name}</p>
          </div>
          <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
            <p>{userData.name}</p>
          </div>
          <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
            <p>{userData.address}</p>
          </div>
          <div className="w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md">
            <p>{userData.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
