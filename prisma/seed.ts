import { prisma } from "./client"

async function main() {
  try {
    await prisma.user.update({
      where: { username: "wobber" },
      data: {
        role: "ADMIN",
      },
    })
  } catch (error) {
    console.error("ERROR SEEDING DATA: ", error)
    process.exit(1)
  }
}

main()
