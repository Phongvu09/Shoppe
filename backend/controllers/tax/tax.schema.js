import { z } from "zod";
export const createTaxSchema = z.object({
    shopId: z.string().min(1, "shopId is required"),
    businessType: z.enum(["Individual", "HouseholdBusiness", "Company"], {
        errorMap: () => ({ message: "Invalid businessType" }),

    }),
    // Cá nhân
    fullName: z.string().min(1, "Full name is required").optional(),
    personalAddress: z.string().min(1, "Personal address is required").optional(),

    // Hộ kinh doanh / Công ty
    companyName: z.string().min(1, "Company name is required").optional(),
    businessRegistrationAddress: z.object({
        country: z.string().default("Việt Nam").optional(),
        province: z.string().min(1, "Province is required").optional(),
        district: z.string().min(1, "District is required").optional(),
        ward: z.string().min(1, "Ward is required").optional(),
        commune: z.string().optional()
    }).optional(),
    businessLicense: z.string().min(1, "Business license is required").optional(),
    // Chung
    taxCode: z.string().min(1, "Tax code is required"),
    emailForReceivingEInvoices: z.string().email("Invalid email address"),
}).strict()

export const updateTaxSchema = z.object({
    businessType: z.enum(["Individual", "HouseholdBusiness", "Company"], {
        errorMap: () => ({ message: "Invalid businessType" }),
    }),
    // Cá nhân
    fullName: z.string().min(1, "Full name is required").optional(),
    personalAddress: z.string().min(1, "Personal address is required").optional(),
    // Hộ kinh doanh / Công ty
    companyName: z.string().min(1, "Company name is required").optional(),
    businessRegistrationAddress: z.object({
        country: z.string().default("Việt Nam").optional(),
        province: z.string().min(1, "Province is required").optional(),
        district: z.string().min(1, "District is required").optional(),
        ward: z.string().min(1, "Ward is required").optional(),
        commune: z.string().optional()
    }).optional(),
    businessLicense: z.string().min(1, "Business license is required").optional(),
    // Chung
    taxCode: z.string().min(1, "Tax code is required").optional(),
    emailForReceivingEInvoices: z.string().email("Invalid email address").optional(),
}).strict()