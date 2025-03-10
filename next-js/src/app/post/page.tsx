/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
// import useSWR, { mutate } from "swr";
import { fetcher } from "../libs";
import { PostModel } from "../types";
import Link from "next/link";
// import Post from "../components/Post";
import { Button } from "@/components/ui/button";
import DataTable from "../components/tablePost";
import { useQuery } from "@tanstack/react-query";
import { useAllPost } from "../utils/hooks/post";

export default function Users() {
  const { mutate, data, error } = useAllPost();

  useEffect(() => {
    mutate();
  }, [mutate]);
  // const { data, error } = useQuery<{ result: PostModel[] }>({
  //   queryKey: ["users"],
  //   queryFn: () => fetcher("/utils/queries/users"),
  // });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-5 text-[#1A120B]">
        List Users - Counter: {data.length}
      </h2>
      <div className="flex justify-center">
        <Link href={`/post/create`}>
          <Button className="mb-4 bg-green-500 text-white">Create User</Button>
        </Link>
      </div>
      <DataTable data={data} />
    </div>
  );
}
