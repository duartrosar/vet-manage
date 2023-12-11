import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "customertest@test.com" },
    update: {
      roles: {
        create: [{ role: "CUSTOMER" }],
      },
    },
    create: {
      email: "customertest@test.com",
      password: password,
      roles: {
        create: [{ role: "CUSTOMER" }],
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
