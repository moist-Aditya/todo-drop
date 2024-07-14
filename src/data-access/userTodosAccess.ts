"use server"

import { auth } from "@/lib/auth"
import { prisma } from "../../prisma/client"
import { getErrorMessage } from "@/lib/utils"

export const getUserCategories = async () => {
  const session = await auth()

  if (!session || !session.user) return

  const userId = session.user.id

  const data = await prisma.category.findMany({
    where: {
      userId,
    },
  })

  return data
}

export const getUserTodos = async () => {
  const session = await auth()

  if (!session || !session.user) return

  const userId = session.user.id

  const data = await prisma.todo.findMany({
    where: {
      userId,
    },
  })

  return data
}
