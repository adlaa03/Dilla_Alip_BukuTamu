import { useMutation, useQuery } from "@tanstack/react-query";

import * as mutations from "../../queries/users/[id]/route";
// import * as queries from "../../queries/users/route";
import { userForm } from "@/app/types/userSchema";
import { useRouter } from "next/navigation";
import { GetAllPost } from "../../queries/users/route";

export const useAllPost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        return await GetAllPost();
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/post");
    },
    onError: (error) => {
      console.error("Failed to fetch posts:", error);
    },
  });
};

export const useUpdatepost = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      idUser,
      body,
    }: {
      idUser: number;
      body: userForm;
    }) => {
      try {
        const result = mutations.UpdatePost({
          id: idUser,
          userData: body,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      router.push("/post");
    },
  });
};

export const usePost = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ body }: { body: userForm }) => {
      try {
        const result = mutations.PostUser({
          userData: body,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      router.push("/post");
    },
  });
};

export const useViewpost = (idUser: number) => {
  // const router = useRouter();

  return useQuery({
    queryKey: ["getById", idUser],
    queryFn: async () => {
      try {
        const result = mutations.ViewPost({
          id: idUser,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useDeletepost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        const result = await mutations.DeletePost(id);
        return result;
      } catch (error) {
        console.error("Failed to delete post:", error);
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/post");
    },
  });
};
