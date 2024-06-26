import { signIn } from "@/auth";

export default class UserApi {
    async registUser() {
        const res = await fetch('http://localhost:8080/api/users/login', { cache: 'no-store' });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }
        return res.json();
    }
    async logUser(formData: any) {
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