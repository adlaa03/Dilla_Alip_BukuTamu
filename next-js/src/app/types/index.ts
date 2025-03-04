import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "./userSchema";

export interface PostModel {
  id: number;
  username: string;
  name: string;
  address: string;
  phone: string;
  deletePost: (id: number) => void;
}

export interface PostAddModel {
  username: string;
  name: string;
  adress: string;
  phone: string;
}

export interface FormProps {
  form: UseFormReturn<z.infer<typeof userSchema>>;
  onSubmit(values: z.infer<typeof userSchema>): void;
  titleText: string;
  buttonText: string;
  required: boolean;
}
