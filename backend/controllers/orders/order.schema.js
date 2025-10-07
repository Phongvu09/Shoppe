import z from "zod";

const imageSchema = z.object({
    url: z.string().url("Invalid image URL"),
    public_id: z.string().min(1, "public_id is required"),
});

const orderProductSchema = z.object({
    productId: z.string().min(1, "productId is required"),
    name: z.string().min(1, "Product name is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    sizes: z.array(z.string()).default([]),
    colors: z.array(z.string()).default([]),
    images: z.array(imageSchema).min(1, "At least one image is required"),
});

const ORDER_STATUS_ENUM = [
    "pending",
    "waiting_pickup",
    "processed",
    "canceled",
    "returned",
    "delivered",
];

export const createOrderSchema = z
    .object({
        // ❌ bỏ userId — vì bạn set từ token
        shopId: z.string().min(1, "shopId is required"),
        products: z
            .array(orderProductSchema)
            .min(1, "At least one product is required"),
        totalPrice: z.number().min(1, "Total price must be at least 1đ"),

        // ✅ thêm các trường đang gửi từ client
        shippingMethod: z.enum(["express", "fast", "pickup", "bulky"]),
        shippingFee: z.number().default(0),
        discount: z.number().default(0),
        totalAmount: z.number().min(1, "Total amount is required"),

        // optional mặc định
        status: z.enum(ORDER_STATUS_ENUM).default("pending"),
        isLockedByAdmin: z.boolean().default(false),
    })
    .strict(); // có thể bỏ .strict() nếu bạn muốn chấp nhận thêm field không cần validate
