import { z } from "zod";

export const createShopInformationSchema = z.object({
    shopName: z.string().min(1, "Shop name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    pickupAddress: z.object({
        fullName: z.string().min(1, "Full name is required"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        addressDetail: z.string().min(1, "Address detail is required"),
        address: z.object({
            province: z.string().min(1, "Province is required"),
            district: z.string().min(1, "District is required"),
            ward: z.string().min(1, "Ward is required"),
            commune: z.string().optional(),
        }),
    }),
}).strict();

export const updateShopInformationSchema = z.object({
    shopName: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    phoneNumber: z.string().optional(),
    pickupAddress: z.object({
        fullName: z.string().optional(),
        phoneNumber: z.string().optional(),
        addressDetail: z.string().optional(),
        address: z.object({
            province: z.string().optional(),
            district: z.string().optional(),
            ward: z.string().optional(),
            commune: z.string().optional(),
        }).optional(),
    }).optional(),
}).strict();
