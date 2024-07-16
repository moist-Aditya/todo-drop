"use server"

import { auth } from "@/lib/auth"
import { prisma } from "../../prisma/client"

export const getUserCount = async () => {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return null
  }

  const userCount = await prisma.user.count({
    where: {
      role: "USER",
    },
  })

  return userCount
}

export const getAdminCount = async () => {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return null
  }

  const adminCount = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  })

  return adminCount
}

export const getTaskCount = async () => {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return null
  }

  const taskCount = await prisma.todo.count()

  return taskCount
}
