import { z } from "zod";

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

// Subschema cho ảnh
const imageSchema = z.object({
    url: z.string().url("Invalid image URL"),
    public_id: z.string().min(1, "public_id is required"),
});

// Schema tạo sản phẩm mới
export const createProductSchema = z
    .object({
        ownerId: z.string().min(1, "ownerId is required"),
        name: z.string().min(1, "Product name is required"),
        description: z
            .string()
            .min(20, "Description must be at least 20 characters"),
        price: z.number().min(1, "Product price must be at least 1đ"),
        category: z.enum(CATEGORY_ENUM, {
            errorMap: () => ({ message: "Invalid category" }),
        }),
        sizes: z.array(z.string()).default([]),
        colors: z.array(z.string()).default([]),
        images: z.array(imageSchema).min(1, "At least one image is required"),
        stock: z.number().min(0),
        isFeatured: z.boolean().optional().default(false),
    })
    .strict();

// Schema cập nhật sản phẩm
export const updateProductSchema = z
    .object({
        ownerId: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        description: z.string().min(20).optional(),
        price: z.number().min(1).optional(),
        category: z.enum(CATEGORY_ENUM).optional(),
        sizes: z.array(z.string()).optional(),
        colors: z.array(z.string()).optional(),
        images: z.array(imageSchema).optional(),
        stock: z.number().min(0).optional(),
        isFeatured: z.boolean().optional(),
    })
    .strict();