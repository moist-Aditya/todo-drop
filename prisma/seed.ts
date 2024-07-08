import { prisma } from "./client"

async function main() {
  try {
    const defaultTodo = await prisma.category.upsert({
      where: { name: "TODO" },
      update: {},
      create: {
        name: "TODO",
        Todo: {
          create: [
            {
              content: "Task 1",
            },
            {
              content: "Task 2",
            },
            {
              content: "Task 3",
            },
          ],
        },
      },
    })

    const defaultChores = await prisma.category.upsert({
      where: { name: "Chores" },
      update: {},
      create: {
        name: "Chores",
        Todo: {
          create: [
            {
              content: "Play games",
            },
            {
              content: "Complete Bloggo app",
            },
          ],
        },
      },
    })

    console.log("Seeded default data with 2 columns and 5 tasks.")
  } catch (error) {
    console.error("ERROR SEEDING DATA: ", error)
    process.exit(1)
  }
}

main()
