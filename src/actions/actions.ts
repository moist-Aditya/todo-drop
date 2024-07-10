"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../../prisma/client"

export const addTask = async (categoryId: string, formData: FormData) => {
  const data = {
    content: formData.get("content") as string,
  }

  console.log(data)

  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        Todo: {
          create: {
            content: data.content,
          },
        },
      },
    })
  } catch (error: any) {
    return { error: error?.message }
  }

  revalidatePath("/")
}

export const addCategory = async (formData: FormData) => {
  const data = {
    name: formData.get("categoryName") as string,
  }

  try {
    await prisma.category.create({
      data: {
        name: data.name,
      },
    })
  } catch (error: any) {
    return { error: error?.message }
  }

  revalidatePath("/")
}

export const deleteTask = async (taskId: string) => {
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
