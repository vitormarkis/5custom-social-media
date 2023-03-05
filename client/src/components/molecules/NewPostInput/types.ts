import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { z, ZodRawShape } from "zod";

export interface NewPostInputProps<T, F extends ZodRawShape> {
  mutate: UseMutateFunction<AxiosResponse<any, any>, any, T, any>
  fieldsParser: z.ZodObject<F>
}