import z from "zod"
import { registerUserSchema, logUserSchema } from "@/schemas/users";



export default class UserApi {
    async registerUser(formData: z.infer<typeof registerUserSchema>) {
        try {
            const res = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                const errorMessage = await res.json();
                throw errorMessage.error;
            }
            const data = await res.json();
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
    async logUser(formData: z.infer<typeof logUserSchema>) {
        try {
            const res = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw res;
            }
            const data = await res.json();
            return data;
        } catch (error) {
            throw new Error('Invalid password or email');
        }
    }
}