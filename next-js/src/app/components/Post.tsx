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

import React from "react";
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
import { userForm, userSchema } from "../types/userSchema";
import { userDefaultValues } from "../types/defaultValues";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PUT } from "../utils/queries/users/[id]/route";
import { POST } from "../utils/queries/users/route";

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

  const mutation = useMutation({
    mutationFn: (data: userForm) => {
      if (user) {
        return PUT({ id: user.id }, data);
      } else {
        return POST(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.push("/users");
    },
  });

  function submit(values: z.infer<typeof userSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="w-full mx-32">
        <div className="text-center">
          <span className="font-bold py-2 block text-4xl">{titleText}</span>
        </div>

        <div className="w-full py-2">
          <FormField
            control={form.control}
            name="username"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full py-2">
          <Button type="submit">{buttonText}</Button>
        </div>
      </form>
    </Form>
  );
}
