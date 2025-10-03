import { object, z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))),
    "Price must have two decimal places"
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  brand: z.string().min(3, "Brand must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: currency,
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least 1 image"),
  banner: z.string().nullable(),
  isFeatured: z.boolean(),
});

// Schema for user sign-in
export const signInSchema = object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters"),
});

// Schema for user sign-up
export const signUpSchema = object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters"),

  confirmPassword: z
    .string({ error: "Confirm password is required" })
    .min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
