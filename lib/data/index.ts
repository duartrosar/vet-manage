"use server";

import { data } from "../mockup/mockup";
import { Owner, PrismaClient } from "@prisma/client";
import { ownerSchema } from "../zod/zodSchemas";

const prisma = new PrismaClient();

export async function getOwners(): Promise<Owner[]> {
  return data;
}

export async function createOwner(data: Owner) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const owner = await prisma.owner.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          address: "13, Flower Street",
          email: data.email,
          mobileNumber: data.mobileNumber,
          gender: data.gender,
          imageUrl: data.imageUrl,
        },
      });

      return { success: true, data: result.data };
    }

    if (result.error) {
      return { success: false, error: result.error.format() };
    }
  } catch (error) {
    return { success: false, error: error };
  }
}
