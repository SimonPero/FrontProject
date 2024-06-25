import { redirect } from 'next/navigation'

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
        console.log(formData)
        const res = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            body: formData,
            cache: 'no-store'
        });

        if (!res.ok) {
            console.log(res)
        }
        redirect("/")
    }
}