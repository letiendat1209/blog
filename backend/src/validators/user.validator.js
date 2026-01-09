import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});