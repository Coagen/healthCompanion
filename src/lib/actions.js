"use server";
// import { auth } from "@/lib/auth";
import { signIn, signOut } from "./auth";

export async function handleSignin() {
  await signIn("google", { redirectTo: "/application" });
}

export async function handleSignout() {
  await signOut({ redirectTo: "/" });
}
