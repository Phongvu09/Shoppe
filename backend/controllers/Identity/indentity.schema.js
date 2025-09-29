import { z } from "zod";

export const createIdentitySchema = z.object({
    shopId: z.string().min(1, "Shop ID is required"),
    fullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    idType: z.enum(["CCCD", "CMND", "Passport"], { message: "Invalid ID type" }),
    idNumber: z.string().min(1, "ID number is required"),
    issuedDate: z.string().min(1, "Issued date is required"),
    issuedPlace: z.string().min(1, "Issued place is required"),
    frontImage: z.string().min(1, "Front ID image is required"),
    backImage: z.string().min(1, "Back ID image is required"),
    selfieImage: z.string().min(1, "Selfie image is required"),

    address: z.object({
        country: z.string().default("Việt Nam").optional(),
        province: z.string().min(1, "Province is required"),
        district: z.string().min(1, "District is required"),
        ward: z.string().min(1, "Ward is required"),
        street: z.string().min(1, "Street is required"),
    }),

    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(8, "Phone number is required"),
}).strict()

export const updateIdentitySchema = createIdentitySchema.partial();
