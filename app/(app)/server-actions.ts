"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout() {
  const c = await cookies()
  c.delete("auth-token")
  c.delete("auth-remember")
  redirect("/login")
}
