"use server";

import { Owner, PrismaClient, User } from "@prisma/client";
import { ownerSchema } from "../zod/zodSchemas";
import { RegisterProps } from "../types";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export interface Response {
  owners?: Owner[];
  user?: User;
  success: boolean;
}

export async function registerCustomerUser(
  userRegister: RegisterProps,
): Promise<Response> {
  try {
    const password = await hash(userRegister.password, 12);

    const user = await prisma.user.create({
      data: {
        email: userRegister.email,
        password: password,
        roles: {
          create: { role: "CUSTOMER" },
        },
      },
    });

    return { user, success: true };
  } catch (error) {
    console.log("registerCustomerUser", error);
    return { success: false };
  }
}

export async function getOwners(): Promise<Response> {
  try {
    const owners = await prisma.owner.findMany();
    return { owners, success: true };
  } catch (error) {
    console.log("getOwners", error);
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
    console.log("getOwner", error);
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
    console.log("createOwner", error);
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
    console.log("updateOwner", error);
    return { success: false, error: error };
  }
}
