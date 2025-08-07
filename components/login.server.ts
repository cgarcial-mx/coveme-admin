"use server"

import { cookies } from "next/headers"

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")
  const remember = formData.get("remember") === "on"

  // Demo auth: accept any email/password with "password" as the password.
  if (!email || password !== "password") {
    return { ok: false, message: "Invalid credentials" }
  }

  const token = Math.random().toString(36).slice(2)
  const c = await cookies()
  c.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: false,
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
  })
  c.set("auth-remember", remember ? "1" : "0", { path: "/" })

  return { ok: true }
}
