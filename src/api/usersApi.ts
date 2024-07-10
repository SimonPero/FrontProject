import z from "zod"
import { registerUserSchema, logUserSchema } from "@/schemas/users";
import envConfig from "@/config/env.config";

export default class UserApi {
    async registerUser(formData: z.infer<typeof registerUserSchema>) {
        try {
            const res = await fetch(`${envConfig.apiUrl}/api/users/register`, {
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
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const res = await fetch(`${envConfig.apiUrl}/api/users/login`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            throw new Error('Invalid password or email');
        }
    }
}