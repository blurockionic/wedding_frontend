import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[a-z]/, "Password must include at least one lowercase letter")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter")
  .regex(/\d/, "Password must include at least one number")
  .regex(/[!@#$%^&*]/, "Password must include at least one special character");


export const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase()),
  password: passwordValidation,
  confirmPassword: z.string(),
  username: z
    .string()
    .min(1, "Username is required")
    .transform((val) => val?.toLowerCase()),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  wedding_date: z.string(),
  wedding_location: z
    .string()
    .min(1, "Wedding location is required")
    .transform((val) => val?.toLowerCase()), // Optional string
})
  .superRefine((data, ctx) => {
    // Custom validation logic for matching password and confirmPassword
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords must match",
        code: z.ZodIssueCode.custom,
      });
    }
  });
