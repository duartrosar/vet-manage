"use server";

import { Owner, PrismaClient, User } from "@prisma/client";
import { ownerSchema } from "../zod/zodSchemas";
import { RegisterProps } from "../types";
import { hash } from "bcrypt";
import prisma from "@/lib/db/prisma";

export interface Response {
  owners?: Owner[];
  user?: User;
  success: boolean;
}

// Users

export async function registerCustomerUser(userRegister: RegisterProps) {
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

    return { user: user };
  } catch (error) {
    console.log("registerCustomerUser", error);
    return { success: false };
  }
}

/**
 * Returns a user based on an email.
 *
 * @param email - The email of the user you want to get.
 * @returns An object with the user that matches the email passed in and a success flag.
 *
 */
export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return { user, success: true };
  } catch (error) {
    console.log("getUser", error);
    return { success: false };
  }
}

export async function getOwners(): Promise<Response> {
  try {
    const owners = await prisma.owner.findMany();
    return { owners: owners, success: true };
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
      const owner = await prisma.owner.create({
        data: data,
      });

      return { owner, success: true };
    }

    return { owner: data, success: false };
  } catch (error) {
    console.log("createOwner", error);
    return { success: false };
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

      return { success: true, owner: result.data };
    }
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
  } catch (error) {
    console.log("updateOwner", error);
    return { success: false, error: error };
  }
}
