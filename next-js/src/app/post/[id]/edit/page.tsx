"use client";

import Post from "@/app/components/Post";
import React, { use } from "react";
import { useViewpost } from "@/app/utils/hooks/post";

export default function PostEdit({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: userId } = use(params);

  const getUserById = useViewpost(userId);

  const user = getUserById.data;

  if (!user) return <div>User not found.</div>;

  return (
    <div className="container w-full py-10">
      <div className="flex justify-center">
        <Post user={user} titleText="Update User" buttonText="Update" />
      </div>
    </div>
  );
}
