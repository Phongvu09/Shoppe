import z from "zod"
const imageSchema = z.object({
    url: z.string().url("Invalid image URL"),
    public_id: z.string().min(1, "public_id is required"),
});

const CATEGORY_ENUM = [
    "electronics",
    "fashion",
    "beauty",
    "home_living",
    "health_personal_care",
    "baby_products",
    "groceries",
    "mobile_accessories",
    "computer_peripherals",
    "gaming",
    "pet_supplies",
    "sports_outdoors",
    "automotive_parts",
    "kitchen_appliances",
    "furniture",
    "lighting",
    "books",
    "stationery_office",
    "toys_hobbies",
    "jewelry",
    "watches",
    "bags_luggage",
    "shoes",
    "eyewear",
    "audio",
    "video_equipment",
    "camera_accessories",
    "travel_accessories",
    "home_decor",
    "bed_bath",
    "lawn_garden",
    "tools_hardware",
    "groceries_beverages",
    "snacks",
    "beauty_tools",
    "personal_care_appliances",
    "digital_goods",
    "gift_cards",
];

export const createProductSchema = z.object({
    ownerId: z.string().min(1, "ownerId is required"),
    name: z.string().min(5, "Product name must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    price: z.number().min(1, "Product price must be at least 1đ"),
    category: z.enum(CATEGORY_ENUM, {
        errorMap: () => ({ message: "Invalid category" }),
    }),
    sizes: z.array(z.string()).default([]),
    colors: z.array(z.string()).default([]),
    origin: z.string().optional(),
    material: z.string().optional(),
    weight: z.number().min(1, "Weight must be positive"),
    stock: z.number().min(0).default(0),
    isFeatured: z.boolean().optional().default(false),
}).strict()
    .refine((data, ctx) => {
        if (!ctx?.req?.files || ctx.req.files.length === 0) {
            ctx.addIssue({
                code: "custom",
                message: "At least one image is required",
                path: ["images"],
            });
            return false;
        }
        return true;
    });

export const updateProductSchema = createProductSchema.partial();
