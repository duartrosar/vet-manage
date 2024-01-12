import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("123456", 12);
  const user = await prisma.user.create({
    data: {
      name: "admin admin",
      email: "admin@admin.com",
      emailVerified: new Date(),
      image: "",
      password: password,
      isActive: true,
      roles: {
        create: [{ role: "ADMIN" }],
      },
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
