import { z } from "zod";
// Schema tạo thông tin cửa hàng mới
export const createShopInformationSchema = z.object({
    userId: z.string().min(1, "UserId is required"),  // đổi lại đây
    shopName: z.string().min(1, "Shop name is required"),
    pickupAddress: z.object({
        receiverName: z.string().min(1, "Receiver name is required"),
        phone: z.string().min(1, "Phone number is required"),
        street: z.string().min(1, "Street is required"),
        ward: z.string().min(1, "Ward is required"),
        district: z.string().min(1, "District is required"),
        city: z.string().min(1, "City is required"),
    }),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
}).strict();


// Schema cập nhật thông tin cửa hàng
export const updateShopInformationSchema = z.object({
    shopName: z.string().min(1, "Shop name is required").optional(),
    pickupAddress: z.object({
        receiverName: z.string().min(1, "Receiver name is required").optional(),
        phone: z.string().min(1, "Phone number is required").optional(),
        street: z.string().min(1, "Street is required").optional(),
        ward: z.string().min(1, "Ward is required").optional(),
        district: z.string().min(1, "District is required").optional(),
        city: z.string().min(1, "City is required").optional(),
    }).optional(),
    email: z.string().email("Invalid email address").optional(),
    phoneNumber: z.string().min(1, "Phone number is required").optional(),
}).strict();

