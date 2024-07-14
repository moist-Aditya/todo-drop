import { z } from "zod"

export const signupSchema = z.object({
  username: z.string().trim().min(6),
  password: z.string().min(6),
  email: z.string().email(),
})
