import { z } from "zod";
export const createTaxInformationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    rate: z.number().min(0, "Rate must be a non-negative number"),
}).strict();
export const updateTaxInformationSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    rate: z.number().min(0, "Rate must be a non-negative number").optional(),
}).strict();