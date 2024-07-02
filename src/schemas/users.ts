import z from "zod"

export const logUserSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Invalid password"),
})

export const registerUserSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    name: z.string()
        .min(1, "Surname is required"),
    surname: z.string()
        .min(1, "Surname is required"),
    password: z.string()
        .min(1, "Password is required"),
    phone: z.string()
        .min(1, "Phone is required"),
    age: z.number()
        .min(1, "Age is required")
        .gte(13, "You must be older than 13 years old")
        .lte(90, "You must be younger than 90 years old"),
    location: z.string()
        .min(1, "Location is required"),
})