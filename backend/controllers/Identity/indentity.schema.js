import { z } from "zod";
export const createIdentityInformationSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    idNumber: z.string().min(1, "ID number is required"),
    idIssueDate: z.string().min(1, "ID issue date is required"),
    idIssuePlace: z.string().min(1, "ID issue place is required"),
    frontIdImage: z.string().min(1, "Front ID image is required"),
    backIdImage: z.string().min(1, "Back ID image is required"),
    selfieWithIdImage: z.string().min(1, "Selfie with ID image is required"),
}).strict()

export const updateIdentityInformationSchema = z.object({
    fullName: z.string().min(1, "Full name is required").optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required").optional(),
    idNumber: z.string().min(1, "ID number is required").optional(),
    idIssueDate: z.string().min(1, "ID issue date is required").optional(),
    idIssuePlace: z.string().min(1, "ID issue place is required").optional(),
    frontIdImage: z.string().min(1, "Front ID image is required").optional(),
    backIdImage: z.string().min(1, "Back ID image is required").optional(),
    selfieWithIdImage: z.string().min(1, "Selfie with ID image is required").optional(),
}).strict()