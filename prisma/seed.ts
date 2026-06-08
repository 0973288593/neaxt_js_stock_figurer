import { PrismaClient } from '@prisma/client'
// const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.person.createMany({
    data: [
      {
        LastName: "Admin",
        FirstName: "Super",
        Address: "123 Main St",
        City: "Bangkok",
        Email: "admin@admin.com",
        Password: "admin"
      },
    ],
    skipDuplicates: true, // กัน insert ซ้ำ
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })