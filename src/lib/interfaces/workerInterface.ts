import { z } from "zod";
import { workerSchema } from "../schemas/workerSchema";

export type IWorker = z.infer<typeof workerSchema>;