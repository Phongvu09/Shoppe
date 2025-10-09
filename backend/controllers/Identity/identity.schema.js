import { z } from "zod";

const imageSchema = z.object({
    url: z.string().url(),
    public_id: z.string(),
});

const baseSchema = z.object({
    shopId: z.string().min(1, "Shop ID is required"),
    fullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    idType: z.enum(["CCCD", "CMND", "Passport"]),
    idNumber: z.string().min(1),
    issuedDate: z.string().min(1),
    issuedPlace: z.string().min(1),
    frontImage: imageSchema,
    backImage: imageSchema,
    selfieImage: imageSchema,
    address: z.object({
        country: z.string().default("Việt Nam").optional(),
        province: z.string().min(1),
        district: z.string().min(1),
        ward: z.string().min(1),
        street: z.string().min(1),
    }),
    email: z.string().email(),
    phoneNumber: z.string().min(8),
});

export const createIdentitySchema = baseSchema;
export const updateIdentitySchema = baseSchema.partial();
