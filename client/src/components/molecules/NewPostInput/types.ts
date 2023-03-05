import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { HTMLAttributes } from "react";
import { z, ZodRawShape } from "zod";

export interface NewPostInputProps<T, F extends ZodRawShape> extends HTMLAttributes<HTMLFormElement> {
  mutate: UseMutateFunction<AxiosResponse<any, any>, any, T, any>
  fieldsParser: z.ZodObject<F>
}