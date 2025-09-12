import { z } from "zod";
export const createShippingSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        address: z.string().min(10, "Address must be at least 10 characters long"),
        phone: z.string().min(10, "Phone number must be at least 10 characters long"),
        email: z.string().email("Invalid email address"),
    })
    .strict();
export const updateShippingSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters long").optional(),
        address: z.string().min(10, "Address must be at least 10 characters long").optional(),
        phone: z.string().min(10, "Phone number must be at least 10 characters long").optional(),
        email: z.string().email("Invalid email address").optional(),
    })
    .strict();