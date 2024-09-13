"use server";

import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: any) {
  try {
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  } catch (error: any) {
    throw new Error(error.cause.err.message);
  }
}
