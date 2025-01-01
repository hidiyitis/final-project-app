import { z } from "zod";
import { serviceSchema } from "../schemas/serviceSchema";

export type IService = z.infer<typeof serviceSchema>;