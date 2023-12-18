"use server";

import { Owner, PrismaClient, User } from "@prisma/client";
import { ownerSchema } from "../zod/zodSchemas";
import { RegisterProps } from "../types";
import { hash } from "bcrypt";
import prisma from "@/lib/db/prisma";
import { generateOwnerFromUser } from "../utils";

export interface Response {
  owners?: Owner[];
  user?: User;
  success: boolean;
}

// USERS
export async function createUserWithOwner(userRegister: RegisterProps) {
  try {
    const password = await hash(userRegister.password, 12);

    const user = await prisma.user.create({
      data: {
        email: userRegister.email,
        password: password,
        isActive: true,
        hasEntity: true,
        roles: {
          create: { role: "CUSTOMER" },
        },
        owner: {
          create: {
            firstName: userRegister.firstName,
            lastName: userRegister.lastName,
            email: userRegister.email,
          },
        },
      },
    });

    return { user: user, success: true };
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

export async function deleteUser(userId: number) {
  // try{
  //   const user
  // }
}

// OWNERS
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

export async function createOwnerWithUser(data: Owner) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const password = await hash("", 12);

      const ownerUser = await prisma.user.create({
        data: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          imageUrl: data.imageUrl,
          password: password,
          hasEntity: true,
          roles: {
            create: { role: "CUSTOMER" },
          },
          owner: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              dateOfBirth: data.dateOfBirth,
              gender: data.gender,
              email: data.email,
              mobileNumber: data.mobileNumber,
              address: data.address,
              imageUrl: data.imageUrl,
            },
          },
        },
      });

      return { ownerUser, success: true };
    }

    console.log(result.error.format());
    return { ownerUser: data, success: false };
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

      return {
        updatedOwner,
        success: true,
        message: "Owner was updated sucessfully",
      };
    }
    console.log(result.error.format());
    return {
      updatedOwner: data,
      success: false,
      message: "An error ocurred atempting to create the owner",
    };
  } catch (error) {
    console.log("updateOwner", error);
  }
}
