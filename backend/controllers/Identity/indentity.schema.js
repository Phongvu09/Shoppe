import { z } from "zod";
// Schema tạo thông tin cửa hàng mới
export const createIdentitySchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
}).strict();

// Schema cập nhật thông tin cửa hàng
export const updateIdentitySchema = z.object({
    fullName: z.string().min(1, "Full name is required").optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required").optional(),
    gender: z.string().min(1, "Gender is required").optional(),
    email: z.string().email("Invalid email address").optional(),
    phoneNumber: z.string().min(1, "Phone number is required").optional(),
}).strict();
