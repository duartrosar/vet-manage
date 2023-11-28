"use server";

import { Owner } from "@prisma/client";
import { ownerSchema } from "../zod/zodSchemas";
import prisma from "../prisma";

export async function getOwners() {
  try {
    const owners = await prisma.owner.findMany();
    console.log(owners);
    return { owners };
  } catch (error) {
    return { error };
  }
}

export async function createOwner(data: Owner) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const owner = await prisma.owner.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: new Date(),
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
    console.log(error);
    return { success: false, error: error };
  }
}
