/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Post from "@/app/components/Post";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { UpdatePost } from "@/app/utils/queries/users/mutation";
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
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="w-full mx-32">
            <div className="text-center">
              <span className="font-bold py-2 block text-4xl">Edit User</span>
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter address"
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full py-2">
              <Button type="submit" className="bg-black text-white">
                Update
              </Button>
            </div>
          </form>
        </Form> */}
        <Post user={user} titleText="Update User" buttonText="Update" />
      </div>
    </div>
  );
}
