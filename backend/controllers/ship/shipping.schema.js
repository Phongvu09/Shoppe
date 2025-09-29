import { z } from "zod";

export const createShippingSchema = z.object({
    shopId: z.string().min(1, "ShopId is required"),
    methods: z.array(
        z.object({
            name: z.enum(["express", "fast", "pickup", "bulky"]),
            isActive: z.boolean().optional(),
            codEnabled: z.boolean().optional(),
            weightLimit: z.number().optional()
        })
    )
}).strict();

export const updateShippingSchema = z.object({
    methods: z.array(
        z.object({
            name: z.enum(["express", "fast", "pickup", "bulky"]),
            isActive: z.boolean().optional(),
            codEnabled: z.boolean().optional(),
            weightLimit: z.number().optional()
        })
    ).optional()
}).strict();
