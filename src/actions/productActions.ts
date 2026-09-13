"use server"

import { productSchema } from "@/schemas/productSchema"

export type ActionResponse = {
  success: boolean
  message: string
  data?: unknown
  errors?: Record<string, string[]>
}

export async function addProduct(data: unknown): Promise<ActionResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const parsed = productSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  // In a real application, you would persist to a database here:
  // e.g. await db.products.create(parsed.data)

  return {
    success: true,
    message: `"${parsed.data.name}" added successfully!`,
    data: parsed.data,
  }
}
