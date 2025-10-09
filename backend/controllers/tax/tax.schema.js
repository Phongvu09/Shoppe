import { z } from "zod";

// Schema riêng cho từng loại hình
const individualSchema = z.object({
    businessType: z.literal("Individual"),
    fullName: z.string().min(1, "Full name is required"),
    personalAddress: z.string().min(1, "Personal address is required"),
    taxCode: z.string().min(1, "Tax code is required"),
    emailForReceivingEInvoices: z.string().email("Invalid email"),
    shopId: z.string(),
});

const businessSchema = z.object({
    businessType: z.enum(["HouseholdBusiness", "Company"]),
    companyName: z.string().min(1, "Company name is required"),
    businessRegistrationAddress: z.object({
        country: z.string().default("Việt Nam"),
        province: z.string().min(1, "Province is required"),
        district: z.string().min(1, "District is required"),
        ward: z.string().min(1, "Ward is required"),
        commune: z.string().optional(),
    }),
    businessLicense: z.string().min(1, "Business license is required"),
    taxCode: z.string().min(1, "Tax code is required"),
    emailForReceivingEInvoices: z.string().email("Invalid email"),
    shopId: z.string(),
});

// Dùng union để tự động chọn schema phù hợp
export const taxSchema = z.union([individualSchema, businessSchema]);
