import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.array(z.string()).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.array(z.string()).optional(),
});

/* ✅ schema cho refresh */
export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

/* (nếu làm forgot/reset) */
export const forgotSchema = z.object({ email: z.string().email() });
export const resetSchema  = z.object({
  email: z.string().email(),
  token: z.string().min(10),
  newPassword: z.string().min(6),
});
