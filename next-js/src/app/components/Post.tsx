/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import Link from "next/link";
// import { PostModel } from "../types";

// export default function Post(params: PostModel) {
//   return (
//     <tr>
//       <td className="w-10 border border-slate-300 text-center">{params.id}</td>
//       <td className="border border-slate-300">{params.username}</td>
//       <td className="border border-slate-300 text-center">{params.name}</td>
//       <td className="border border-slate-300">{params.address}</td>
//       <td className="border border-slate-300 text-center">{params.phone}</td>
//       <td className="w-52 border border-slate-300">
//         <span
//           onClick={() => params.deletePost(params.id)}
//           className="bg-red-500 p-2 inline-block text-white text-sm"
//         >
//           Delete
//         </span>

//         <Link
//           href={`/post/${params.id}/edit`}
//           className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
//         >
//           Edit
//         </Link>

//         <Link
//           href={`/post/${params.id}`}
//           className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
//         >
//           View
//         </Link>
//       </td>
//     </tr>
//   );
// }

"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormProps } from "../types/index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../types/userSchema";
import { userDefaultValues } from "../types/defaultValues";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePost, useUpdatepost } from "../utils/hooks/post";
import { toast } from "sonner";

// export default function UserForm({
//   form,
//   onSubmit,
//   titleText,
//   buttonText,
//   required,
// }: FormProps) {
export default function UserForm({ user, titleText, buttonText }: FormProps) {
  const queryClient = new QueryClient();

  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: user || userDefaultValues,
  });

  const mutationUpdate = useUpdatepost();
  const mutationPost = usePost();

  const onSubmit = form.handleSubmit(async (data) => {
    if (!data.phone.startsWith("08")) {
      toast.error("Nomor telepon harus dimulai dengan 08!");
      return;
    }
    if (data.username.includes(" ")) {
      toast.error("Username tidak boleh mengandung spasi!");
      return;
    }

    if (user) {
      mutationUpdate.mutate(
        {
          idUser: user?.id || 0,
          body: data,
        },
        {
          onSuccess: (response) => {
            console.log("Update Success:", response);
            toast.success("User berhasil diperbarui!");
          },
          onError: (error) => {
            console.error("Update Error:", error);
            toast.error("Gagal memperbarui user!");
          },
        }
      );
    } else {
      mutationPost.mutate(
        {
          body: data,
        },
        {
          onSuccess: (response) => {
            console.log("Create Success:", response);
            toast.success("User berhasil ditambahkan!");
          },
          onError: (error) => {
            console.error("Create Error:", error);
            toast.error("Gagal menambahkan user!");
          },
        }
      );
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full mx-32">
        <div className="text-[#1A120B] text-center">
          <span className="font-bold py-2 block text-4xl">{titleText}</span>
        </div>

        <div className="w-full py-2">
          <FormField
            control={form.control}
            name="username"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A120B] font-bold">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    {...field}
                    disabled={!!user}
                    className="border-2 border-[#3C2A21] focus:border-[#3C2A21] rounded-md p-2 placeholder-[#3C2A21]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full py-2">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A120B] font-bold">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    {...field}
                    className="border-2 border-[#3C2A21] focus:border-[#3C2A21] rounded-md p-2 placeholder-[#3C2A21]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full py-2">
          <FormField
            control={form.control}
            name="address"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A120B] font-bold">
                  Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter address"
                    {...field}
                    className="border-2 border-[#3C2A21] focus:border-[#3C2A21] rounded-md p-2 placeholder-[#3C2A21]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full py-2">
          <FormField
            control={form.control}
            name="phone"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A120B] font-bold">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
                    {...field}
                    className="border-2 border-[#3C2A21] focus:border-[#3C2A21] rounded-md p-2 placeholder-[#3C2A21]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full py-2">
          <Button
            type="submit"
            className="bg-[#3C2A21] text-white hover:bg-[#2E1F18] transition-all"
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
