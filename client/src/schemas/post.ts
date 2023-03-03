import { z } from "zod";

export const postBodySchema = z.object({
  text: z.string().max(449),
  image: z.string().url().optional()
})

export type IPostBody = z.infer<typeof postBodySchema>

