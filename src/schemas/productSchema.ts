import z from "zod"

export const productSchema = z.object({
    name: z.string()
        .min(1, "Name is required"),
    description: z.string()
        .min(1, "Password is required")
        .min(8, "Invalid description"),
    size: z.string()
        .min(1, "Size is required"),
    price: z.number()
        .min(1, "Price is required"),
    stock: z.number()
        .min(1, "Stock is required"),
    category: z.string()
        .min(1, "Category is required"),
    image: z.instanceof(File).optional(),
})

