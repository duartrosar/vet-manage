"use server";

import { Owner, data } from "../mockup/mockup";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOwners(): Promise<Owner[]> {
  return data;
}

export async function createOwner() {
  try {
    const owner = await prisma.owner.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: new Date(),
        address: "13, Flower Street",
        email: "johndoe@email.com",
        mobileNumber: "954-555-4568",
        gender: "Male",
        imageUrl: "https://example.thisisanimageurl.com/profile-pic",
      },
    });
  } catch (error) {
    return "Error creating owner";
  }
}
