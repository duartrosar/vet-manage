import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("123456", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {
      roles: {
        create: [{ role: "ADMIN" }],
      },
    },
    create: {
      email: "admin@admin.com",
      password: password,
      roles: {
        create: [{ role: "ADMIN" }],
      },
    },
    include: {
      roles: true,
    },
  });
  console.log(user);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
