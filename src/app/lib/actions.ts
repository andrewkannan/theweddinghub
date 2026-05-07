"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}

export async function register(prevState: string | undefined, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) return "Missing fields"

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return "Email already in use"

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    // Sign in automatically after registration
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong with login."
    }
    throw error
  }
}
