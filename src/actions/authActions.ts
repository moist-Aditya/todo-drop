"use server"

import { signupSchema } from "@/schemas/signupSchema"
import { prisma } from "../../prisma/client"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "@/lib/auth"
import { AuthError } from "next-auth"
import { getErrorMessage } from "@/lib/utils"
import { redirect } from "next/navigation"

export const registerUser = async (formData: FormData) => {
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
  }

  try {
    const parsedData = signupSchema.safeParse(data)

    if (!parsedData.success) {
      return { error: "Invalid data." }
    }

    const { username, password, email } = parsedData.data

    const userFromDbByUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    if (userFromDbByUsername) {
      return { error: "User already exists." }
    }

    const userFromDbByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (userFromDbByEmail) {
      return { error: "Email already in use." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
      },
    })

    // TODO: Signin automatically
  } catch (error: any) {
    console.log("ERROR registerUser ACTION: ", error)
    return { error: error?.message }
  }

  redirect("/login")
}

export const loginUser = async (formData: FormData, callbackUrl?: string) => {
  const form = {
    username: formData.get("username"),
    password: formData.get("password"),
  }

  const redirectUrl = callbackUrl ? callbackUrl : "/dashboard"

  try {
    await signIn("credentials", {
      redirect: false,
      ...form,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.cause?.err?.message || "Incorrect username or password",
      }
    }
    return {
      error: getErrorMessage(error),
    }
  }
  console.log("REDIRECT TO:", redirectUrl)

  redirect(redirectUrl)
}

export const logoutUser = async () => {
  await signOut({ redirectTo: "/login" })
  // redirect("/login")
}
