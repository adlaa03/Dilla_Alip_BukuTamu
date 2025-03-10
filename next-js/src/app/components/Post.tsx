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
// import { PUT } from "../utils/queries/users/[id]/route";
import { usePost, useUpdatepost } from "../utils/hooks/post";

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

  // const mutation = useMutation({
  //   mutationFn: async (data: userForm) => {
  //     if (user) {
  //       // UPDATE
  //       const res = await fetch(`/utils/queries/users/${user.id}`, {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       });

  //       if (!res.ok) {
  //         const errorText = await res.text();
  //         throw new Error(`Failed to update user: ${errorText}`);
  //       }
  //       return res.json();
  //     } else {
  //       // CREATE
  //       const res = await fetch("/utils/queries/users", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to create user");
  //       }
  //       return res.json();
  //     }
  //   },
  //   onSuccess: () => {
  //     Swal.fire({
  //       title: user
  //         ? "Data Berhasil Diperbarui!"
  //         : "Data Berhasil Ditambahkan!",
  //       text: user
  //         ? "Informasi pengguna telah diperbarui."
  //         : "Pengguna baru telah ditambahkan.",
  //       icon: "success",
  //       confirmButtonColor: "#3085d6",
  //       confirmButtonText: "OK",
  //     }).then(() => {
  //       router.push("/post");
  //     });
  //   },
  //   onError: (error) => {
  //     Swal.fire({
  //       title: "Gagal!",
  //       text: error.message,
  //       icon: "error",
  //       confirmButtonColor: "#d33",
  //       confirmButtonText: "OK",
  //     });
  //   },
  // });

  // function submit(values: z.infer<typeof userSchema>) {
  //   mutation.mutate(values);
  // }

  const mutationUpdate = useUpdatepost();
  const mutationPost = usePost();

  const onSubmit = form.handleSubmit((data) => {
    if (user) {
      mutationUpdate.mutate({
        idUser: user?.id || 0,
        body: data,
      });
    } else {
      mutationPost.mutate({
        body: data,
      });
    }
  });

  // const onSubmit = form.handleSubmit((data) => {
  //   if (!data.phone.startsWith("08")) {
  //     alert("Nomor telepon harus dimulai dengan 08!");
  //     return;
  //   }

  //   const isConfirmed = window.confirm(
  //     user
  //       ? "Apakah Anda yakin ingin memperbarui data ini?"
  //       : "Apakah Anda yakin ingin menambahkan data ini?"
  //   );

  //   if (!isConfirmed) return;

  //   if (user) {
  //     mutationUpdate.mutate(
  //       {
  //         idUser: user?.id || 0,
  //         body: data,
  //       },
  //       {
  //         onSuccess: () => {
  //           alert(
  //             "Data Berhasil Diperbarui!\n\nInformasi pengguna telah diperbarui."
  //           );
  //           router.push("/post");
  //         },
  //         onError: (error) => {
  //           alert("Gagal!\n\n" + (error?.message || "Terjadi kesalahan"));
  //         },
  //       }
  //     );
  //   } else {
  //     mutationPost.mutate(
  //       {
  //         body: data,
  //       },
  //       {
  //         onSuccess: () => {
  //           alert(
  //             "Data Berhasil Ditambahkan!\n\nPengguna baru telah ditambahkan."
  //           );
  //           router.push("/post");
  //         },
  //         onError: (error) => {
  //           alert("Gagal!\n\n" + (error?.message || "Terjadi kesalahan"));
  //         },
  //       }
  //     );
  //   }
  // });

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
