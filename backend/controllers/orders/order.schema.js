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

// ✅ Trạng thái đơn hàng hợp lệ
const ORDER_STATUS_ENUM = [
  "pending",
  "waiting_pickup",
  "processed",
  "canceled",
  "returned",
  "delivered",
];

// ✅ Schema tạo đơn hàng (FE Checkout.jsx)
export const createOrderSchema = z
  .object({
    // Không bắt buộc, vì backend tự lấy từ token
    userId: z.string().optional(),
    shopId: z.string().optional(),

    products: z
      .array(orderProductSchema)
      .min(1, "At least one product is required"),

    totalPrice: z.number().min(1, "Total price must be at least 1đ"),

    status: z
      .enum(ORDER_STATUS_ENUM, {
        errorMap: () => ({ message: "Invalid order status" }),
      })
      .default("pending"),

    // ✅ Thêm 2 field để khớp với FE Shopee Lite
    address: z
      .string()
      .default("123 Đường ABC, Quận 1, TP. Hồ Chí Minh")
      .optional(),

    paymentMethod: z.string().default("COD").optional(),

    isLockedByAdmin: z.boolean().default(false),
  })
  .strict();

// ✅ Schema cập nhật đơn hàng
export const updateOrderSchema = createOrderSchema.partial();

// ✅ Schema cập nhật trạng thái đơn hàng
export const updateStatusSchema = z.object({
  newStatus: z.enum(ORDER_STATUS_ENUM, {
    errorMap: () => ({ message: "Invalid order status" }),
  }),
});
