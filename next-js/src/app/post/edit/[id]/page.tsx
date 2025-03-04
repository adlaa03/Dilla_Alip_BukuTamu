/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
// import { fetcher } from "@/app/libs";
// import useSWR from "swr";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const fetchUser = async (id: number) => {
  const res = await fetch(`/utils/queries/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export default function PostEdit({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  console.log("data :", user);
  const form = useForm({
    defaultValues: {
      username: "",
      name: "",
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        name: user.name,
        address: user.address,
        phone: user.phone,
      });
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async (formData: {
      username: string;
      name: string;
      address: string;
      phone: string;
    }) => {
      const res = await fetch(`/utils/queries/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      return res.json();
    },
    onSuccess: () => {
      router.push("/post");
      alert("Data berhasil diubah");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const submit = (data: any) => {
    mutation.mutate(data);
  };

  if (!user) return <div>User not found.</div>;

  return (
    <div className="container w-full py-10">
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="w-full mx-32">
            <div className="text-center">
              <span className="font-bold py-2 block text-4xl">Edit User</span>
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="username"
                rules={{ required: "harap isi semua bidang" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "harap isi semua bidang" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="address"
                rules={{ required: "harap isi semua bidang" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter address" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full py-2">
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "harap isi semua bidang" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
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
        </Form>
      </div>
    </div>
  );
}
