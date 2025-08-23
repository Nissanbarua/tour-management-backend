import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createZodUserSchema = z.object({
  name: z
    .string({ error: "name must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" }),
  email: z
    .string({ error: "Email must be string" })
    .email({ message: "invalid email address format" })
    .min(5, { message: "Email must be 5 charcter long" })
    .max(100, { message: "email can not excced to 100 charcter" }),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .optional(),
});
export const updateZodUserSchema = z.object({
  name: z
    .string({ error: "name must be string" })
    .min(2, { message: "Name too short" })
    .max(50, { message: "Name too long" })
    .optional(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    )
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ error: "Is deleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ error: "isVerified must be a true or false" })
    .optional(),
});
