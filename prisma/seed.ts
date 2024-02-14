import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { vets, owners, generateAppointments } from "./seed-data";

const prisma = new PrismaClient();

async function getPassword() {
  const password = await hash("123456", 12);
  return password;
}

async function main() {
  const password = await getPassword();
  const userAdmin = await prisma.user.create({
    data: {
      name: "admin admin",
      email: "admin@admin.com",
      emailVerified: new Date(),
      image: "",
      password: password,
      isActive: true,
      roles: {
        create: [{ role: "ADMIN" }, { role: "VET" }],
      },
      vet: {
        create: {
          firstName: "admin",
          lastName: "admin",
          dateOfBirth: new Date(),
          gender: "Male",
          email: "admin@admin.com",
        },
      },
    },
  });

  for (const vet of vets) {
    await prisma.vet.create({
      data: {
        ...vet,
        user: {
          create: {
            name: vet.firstName + " " + vet.lastName,
            email: vet.email,
            emailVerified: new Date(),
            image: null,
            password: password,
            roles: {
              create: {
                role: "VET",
              },
            },
          },
        },
      },
    });
  }

  for (const owner of owners) {
    await prisma.owner.create({
      data: {
        firstName: owner.firstName,
        lastName: owner.lastName,
        dateOfBirth: owner.dateOfBirth,
        gender: owner.gender,
        email: owner.email,
        mobileNumber: owner.mobileNumber,
        address: owner.mobileNumber,
        pets: {
          create: [...owner.pets],
        },
        user: {
          create: {
            name: owner.firstName + " " + owner.lastName,
            email: owner.email,
            emailVerified: new Date(),
            image: null,
            password: password,
            roles: {
              create: {
                role: "OWNER",
              },
            },
          },
        },
      },
    });
  }

  const appointments = generateAppointments(100);

  await prisma.appointment.createMany({
    data: appointments,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
