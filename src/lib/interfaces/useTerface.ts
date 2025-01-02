import { z } from "zod";
import { userSchema } from "../schemas/userSchema";

export type userServce = z.infer<typeof userSchema>;