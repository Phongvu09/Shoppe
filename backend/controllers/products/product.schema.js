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
    name: z.string().min(5, "Product name must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    price: z.string().transform(Number).refine((val) => !isNaN(val) && val > 0, {
        message: "Price must be a number > 0",
    }),
    category: z.enum(CATEGORY_ENUM, { errorMap: () => ({ message: "Invalid category" }) }),
    sizes: z.string().transform((val) => {
        try { return JSON.parse(val); } catch { return val.split(",").map((s) => s.trim()); }
    }).default([]),
    colors: z.string().transform((val) => {
        try { return JSON.parse(val); } catch { return val.split(",").map((c) => c.trim()); }
    }).default([]),
    origin: z.string().optional(),
    material: z.string().optional(),
    weight: z.string().transform(Number).refine((val) => !isNaN(val) && val > 0, { message: "Weight must be positive" }),
    stock: z.string().transform(Number).refine((val) => !isNaN(val) && val >= 0, { message: "Stock must be >= 0" }).default(0),
    soldQuantity: z.union([z.string(), z.number()]).transform((val) => typeof val === "string" ? Number(val) : val)
        .refine((val) => !isNaN(val) && val >= 0, { message: "soldQuantity must be a number >= 0" }).default(0),
    isFeatured: z.union([z.string(), z.boolean()]).transform((val) => typeof val === "string" ? val === "true" : val).default(false),
    images: z.array(imageSchema).optional(), // <-- Thêm dòng này
}).strict();

export const updateProductSchema = createProductSchema.partial();

