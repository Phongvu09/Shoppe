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

// Trạng thái của order (chỉ cho phép 1 cái active tại 1 thời điểm)
const ORDER_STATUS_ENUM = [
    "PENDING_CONFIRMATION", // chờ xác nhận
    "WAITING_PICKUP",        // chờ lấy hàng
    "PROCESSED",             // đã xử lý
    "CANCELED",              // đơn hủy
    "RETURNED",              // trả hàng/hoàn tiền
];

export const createOrderSchema = z
    .object({
        buyerId: z.string().min(1, "buyerId is required"),
        sellerId: z.string().min(1, "sellerId is required"),
        products: z
            .array(orderProductSchema)
            .min(1, "At least one product is required"),
        totalPrice: z.number().min(1, "Total price must be at least 1đ"),
        status: z.enum(ORDER_STATUS_ENUM, {
            errorMap: () => ({ message: "Invalid order status" }),
        }).default("PENDING_CONFIRMATION"),
    })
    .strict();

export const updateOrderSchema = createOrderSchema.partial();
