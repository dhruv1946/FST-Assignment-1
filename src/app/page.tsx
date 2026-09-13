import { ProductForm } from "@/components/product-form"
import { Cart } from "@/components/cart"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-background">
      <div className="w-full max-w-5xl flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment 1</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Next.js App Router · Zustand · Server Actions · Zod
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl items-start justify-center">
        <div className="w-full lg:w-1/2">
          <ProductForm />
        </div>
        <div className="w-full lg:w-1/2">
          <Cart />
        </div>
      </div>
    </main>
  )
}
