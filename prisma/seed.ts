import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("123456", 12);
  const user = await prisma.user.create({
    data: {
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      imageUrl: "",
      password: password,
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
