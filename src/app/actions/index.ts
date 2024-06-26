"use server"

import { signIn } from "@/auth"

export async function doSocialLogin(formData: any) {
    const action = formData.get("action")
    await signIn(action, { redirectTo: "/" })
}

//elimie doSocialRegister

export async function doLogout() {

}

export async function doCredentialLogin(formData: any) {
    try {
        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false
        });
        if (res.error) {
            throw new Error(res.error);
        }
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
}