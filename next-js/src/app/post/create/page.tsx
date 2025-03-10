"use client";

import React from "react";
// import { useRouter } from "next/navigation";
// import { QueryClient, useMutation } from "@tanstack/react-query";
// import { POST } from "@/app/utils/queries/users/route";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { userSchema } from "@/app/types/userSchema";
// import { z } from "zod";
// import { userDefaultValues } from "@/app/types/defaultValues";
import Post from "@/app/components/Post";

export default function UserCreate() {
  // const queryClient = new QueryClient();
  // const router = useRouter();
  // const form = useForm({
  //   // defaultValues: {
  //   //   username: "",
  //   //   name: "",
  //   //   address: "",
  //   //   phone: "",
  //   // },
  //   defaultValues: userDefaultValues,
  // });

  // const mutation = useMutation({
  //   mutationFn: async (userData: {
  //     username: string;
  //     name: string;
  //     address: string;
  //     phone: string;
  //   }) => {
  //     const response = await fetch("/utils/queries/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //     router.push("/post");
  //   },
  // });

  // // const submit = (data: any) => {
  // //   mutation.mutate(data);
  // // };
  // function submit(values: z.infer<typeof userSchema>) {
  //   mutation.mutate(values);
  // }

  return (
    <div className="container w-full py-10">
      <div className="flex justify-center">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="w-full mx-32">
            <div className="text-center">
              <span className="font-bold py-2 block text-4xl">Add User</span>
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
                Submit
              </Button>
            </div>
          </form>
        </Form> */}
        <Post titleText="Add User" buttonText="Submit" />
      </div>
    </div>
  );
}
