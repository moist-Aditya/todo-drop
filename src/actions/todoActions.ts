"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../../prisma/client"
import { auth } from "@/lib/auth"

export const addTask = async (categoryId: string, formData: FormData) => {
  const session = await auth()
  if (!session || !session?.user.id) return { error: "Not Authorized." }

  const data = {
    content: formData.get("content") as string,
  }

  const userId = session.user.id

  console.log(data)

  try {
    // add new todo and connect to category and user
    await prisma.todo.create({
      data: {
        content: data.content,
        categoryId,
        userId,
      },
    })
  } catch (error: any) {
    return { error: error?.message }
  }

  revalidatePath("/")
}

export const addCategory = async (formData: FormData) => {
  const session = await auth()
  if (!session || !session?.user.id) return { error: "Not Authorized." }

  const data = {
    name: formData.get("categoryName") as string,
  }

  const userId = session.user.id

  try {
    // add category to user
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        Category: {
          create: {
            name: data.name,
          },
        },
      },
    })
  } catch (error: any) {
    return { error: error?.message }
  }

  revalidatePath("/")
}

export const deleteTask = async (taskId: string) => {
  const session = await auth()
  if (!session || !session?.user.id) return { error: "Not Authorized." }

  try {
    await prisma.todo.delete({
      where: {
        id: taskId,
      },
    })
  } catch (error: any) {
    return { error: error?.message }
  }

  revalidatePath("/")
}

export const moveTask = async (taskId: string, categoryId: string) => {
  try {
    await prisma.todo.update({
      where: {
        id: taskId,
      },
      data: {
        categoryId,
      },
    })
  } catch (error: any) {
    return { error: error?.message }
  }

  revalidatePath("/")
}
