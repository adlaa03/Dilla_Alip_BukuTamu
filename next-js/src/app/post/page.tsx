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

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-5">
        List Users - Counter: {data.result.length}
      </h2>
      <div className="flex justify-center">
        <Link href={`/post/create`}>
          <Button className="mb-4 bg-green-500 text-white">Create User</Button>
        </Link>
      </div>
      <DataTable data={data.result} />
    </div>
  );
}
