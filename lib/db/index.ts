"use server";

import { Owner, PrismaClient, User, Vet } from "@prisma/client";
import { ownerSchema, vetSchema } from "../zod/zodSchemas";
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
        firstName: userRegister.firstName,
        lastName: userRegister.lastName,
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
  console.log("userId", userId);

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log("deleteUser", error);
    return { success: false };
  }
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
        include: { owner: true },
      });

      const owner = ownerUser.owner;

      return { ownerUser, success: true, owner };
    }

    console.log(result.error.format());
    return { ownerUser: data, success: false };
  } catch (error) {
    console.log("createOwnerWithUser", error);
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
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          email: data.email,
          mobileNumber: data.mobileNumber,
          address: data.address,
          imageUrl: data.imageUrl,
          user: {
            update: {
              firstName: data.firstName,
              lastName: data.lastName,
              imageUrl: data.imageUrl,
            },
          },
        },
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

// Vets
export async function getVets() {
  try {
    const vets = await prisma.vet.findMany();
    return { vets: vets, success: true };
  } catch (error) {
    console.log("getVets", error);
    return { success: false };
  }
}

export async function getVet(vetId: number) {
  try {
    const vet = await prisma.vet.findUnique({
      where: {
        id: vetId,
      },
    });

    return { vet };
  } catch (error) {
    console.log("getVet", error);
    return { error };
  }
}

export async function createVetWithUser(data: Vet) {
  try {
    const result = ownerSchema.safeParse(data);

    if (result.success) {
      const password = await hash("", 12);

      const vetUser = await prisma.user.create({
        data: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          imageUrl: data.imageUrl,
          password: password,
          hasEntity: true,
          roles: {
            create: { role: "EMPLOYEE" },
          },
          vet: {
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
        include: { vet: true },
      });

      const vet = vetUser.vet;

      return { vetUser, success: true, vet };
    }

    console.log(result.error.format());
    return { vetUser: data, success: false };
  } catch (error) {
    console.log("createVetWithUser", error);
    return { success: false };
  }
}

export async function updateVet(data: Vet, vetId: number) {
  try {
    const result = vetSchema.safeParse(data);

    if (result.success) {
      const updatedvet = await prisma.vet.update({
        where: {
          id: vetId,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          email: data.email,
          mobileNumber: data.mobileNumber,
          address: data.address,
          imageUrl: data.imageUrl,
          user: {
            update: {
              firstName: data.firstName,
              lastName: data.lastName,
              imageUrl: data.imageUrl,
            },
          },
        },
      });

      return {
        updatedvet,
        success: true,
        message: "Vet was updated sucessfully",
      };
    }
    console.log(result.error.format());
    return {
      updatedvet: data,
      success: false,
      message: "An error ocurred atempting to create the Vet",
    };
  } catch (error) {
    console.log("updateVet", error);
  }
}
