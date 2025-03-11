"use client";

import React from "react";
import Post from "@/app/components/Post";

export default function UserCreate() {
  return (
    <div className="container w-full py-10">
      <div className="flex justify-center">
        <Post titleText="Add User" buttonText="Submit" />
      </div>
    </div>
  );
}
