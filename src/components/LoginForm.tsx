"use client"
import { Button } from "./ui/button"
import { doSocialLogin, doCredentialLogin } from "@/app/actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link";
import { logUserSchema } from "@/schemas/users";
import UserApi from "@/api/usersApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {

    const [error, setError] = useState("")
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof logUserSchema>>({
        resolver: zodResolver(logUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof logUserSchema>) {
        try {
            const res = await doCredentialLogin(values)
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} />
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
                                    <Input placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                    Or
                </div>

                <form action={doSocialLogin}>
                    <Button type="submit" name="action" value="google" className="mx-auto my-4 flex w-full items-center justify-evenly">
                        Sign In With Google
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-2">If you don&apos;t have an account, please&nbsp;
                    <Link className="text-blue-500 hove:underline" href={"/signUp"}>Sing Up</Link>
                </p>

            </Form>
        </>
    )
}