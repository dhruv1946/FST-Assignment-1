"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, type ProductFormValues } from "@/schemas/productSchema"
import { addProduct } from "@/actions/productActions"
import { toast } from "sonner"
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ProductForm() {
  const addItem = useCartStore((state) => state.addItem)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "" as unknown as number,
      description: "",
    },
  })

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const result = await addProduct(data)

      if (result.success) {
        toast.success(result.message)
        // Optimistically add to cart immediately after successful server response
        addItem({
          id: crypto.randomUUID(),
          name: data.name,
          price: Number(data.price),
          quantity: 1,
        })
        reset()
      } else {
        toast.error(result.message || "Failed to add product")
      }
    } catch {
      toast.error("An unexpected error occurred.")
    }
  }

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>
          Type-safe form using React Hook Form, Zod, and Server Actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="e.g. Wireless Headphones"
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm font-medium text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="99.99"
              {...register("price")}
              disabled={isSubmitting}
            />
            {errors.price && (
              <p className="text-sm font-medium text-destructive">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Brief details about the product"
              {...register("description")}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm font-medium text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit & Add to Cart"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
