"use client"
import { Button } from "./../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./../ui/form";
import { Input } from "./../ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link";
import { registerUserSchema } from "@/schemas/users";
import UserApi from "@/api/usersApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const userApi = new UserApi();

export function RegisterForm() {
    const [error, setError] = useState("")
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: "",
            name: "",
            surname: "",
            password: "",
            phone: "",
            // @ts-expect-error
            age: "",
            location: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof registerUserSchema>) {
        try {
            const res = await userApi.registerUser(values)
            if (res.error) {
                setError(res.error.message);
            } else {
                router.push("/");
            }
        } catch (error: any) {
            setError(error.message)
        }
    }
    return (
        <>
            <div className="text-x1 text-red-500">{error}</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Example@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Surname</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your surname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter your age"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>

                    <p className="text-center text-sm text-gray-600 mt-2">Do you already have an account? please&nbsp;
                        <Link className="text-blue-500 hove:underline" href={"/signIn"}>Sing In</Link>
                    </p>
                </form>
            </Form>
        </>
    )
}