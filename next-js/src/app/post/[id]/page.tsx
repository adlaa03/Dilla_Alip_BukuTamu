/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useViewpost } from "@/app/utils/hooks/post";

export default function Detail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: userId } = use(params);

  const getUserById = useViewpost(userId);

  const user = getUserById.data;

  if (!user) {
    return (
      <div>
        <span>No user found</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4 py-6">
      <h2 className="text-center font-bold text-3xl text-[#3C2A21]">
        {user.username}
      </h2>
      <Card className="w-full max-w-4xl text-[#3C2A21] border-2 border-[#3C2A21] focus:border-[#3C2A21]">
        <CardContent>
          <b>Name</b>
          <p>{user.name}</p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl text-[#3C2A21] border-2 border-[#3C2A21] focus:border-[#3C2A21]">
        <CardContent>
          <b>Address</b>
          <p>{user.address}</p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl text-[#3C2A21] border-2 border-[#3C2A21] focus:border-[#3C2A21]">
        <CardContent>
          <b>Phone</b>
          <p>{user.phone}</p>
        </CardContent>
      </Card>
    </div>
  );
}
