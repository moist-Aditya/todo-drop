"use server"

import { auth } from "@/lib/auth"
import { prisma } from "../../../../prisma/client"
import { getErrorMessage } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export const makeAdmin = async (userId: string) => {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Not Authorized!" }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "ADMIN",
      },
    })
  } catch (error) {
    console.log("ERROR MAKING ADMIN: ", getErrorMessage(error))
    return { error: getErrorMessage(error) }
  }

  revalidatePath("/admin-panel")
}

export const deleteUser = async (userId: string) => {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Not Authorized!" }
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    })
  } catch (error) {
    console.log("ERROR DELETING USER: ", getErrorMessage(error))
    return { error: getErrorMessage(error) }
  }

  revalidatePath("/admin-panel")
}
