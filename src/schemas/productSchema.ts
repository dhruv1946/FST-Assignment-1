import { z } from "zod"

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .min(0.01, "Minimum price is $0.01"),
  description: z
    .string()
    .max(200, "Description must be under 200 characters")
    .optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>
