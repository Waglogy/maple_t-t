"use server"

import { cookies } from "next/headers"

export async function logout() {
  // Remove the token cookie
  cookies().delete("token")
}

