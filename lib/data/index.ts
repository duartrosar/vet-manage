"use server";

import { Owner } from "@prisma/client";
import { ownerSchema } from "../zod/zodSchemas";
import prisma from "../prisma";

export interface OwnersResponse {
  owners?: Owner[];
  success: boolean;
}

export async function getOwners(): Promise<OwnersResponse> {
  try {
    const owners = await prisma.owner.findMany();
    console.log(owners);
    return { owners: owners, success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getOwner(ownerId: number) {
  try {
    const owner = await prisma.owner.findUnique({
      where: {
        id: ownerId,
      },
    });

    return { owner };
  } catch (error) {
    return { error };
  }
}

export async function createOwner(data: Owner) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      // TODO: Fix this to get the actual associated user
      // A user will have to be created in the cases that one doesn't exist
      // eg. the user is being created by an employee
      data.userId = 1;
      const owner = await prisma.owner.create({
        data: data,
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

export async function updateOwner(data: Owner, ownerId: number) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const updatedOwner = await prisma.owner.update({
        where: {
          id: ownerId,
        },
        data: data,
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
