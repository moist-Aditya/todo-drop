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
  } catch (e: any) {
    return { error: e?.message }
  }

  revalidatePath("/")
}
