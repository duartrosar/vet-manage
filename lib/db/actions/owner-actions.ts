"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "./token-actions";
import { revalidatePath } from "next/cache";
import { ownerSchema } from "@/lib/zod/zodSchemas";
import { Owner } from "@prisma/client";
import { db } from "@/lib/db/prisma";

export async function getOwners() {
  try {
    const owners = await db.owner.findMany();
    return { owners: owners, success: true };
  } catch (error) {
    console.log("getOwners", error);
    return { success: false };
  }
}

export async function getOwner(ownerId: number) {
  try {
    const owner = await db.owner.findUnique({
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
      const ownerUser = await db.user.create({
        data: {
          email: data.email,
          name: data.firstName + " " + data.lastName,
          image: data.imageUrl,
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

      const verificationToken = await generateVerificationToken(data.email);

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      const owner = ownerUser.owner;

      revalidatePath("/app/owners");
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
      const updatedOwner = await db.owner.update({
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
              name: data.firstName + " " + data.lastName,
              image: data.imageUrl,
            },
          },
        },
      });

      revalidatePath("/app/owners");
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

export async function getOwnerByUserId(userId: string) {
  try {
    const owner = await db.owner.findUnique({
      where: {
        userId: userId,
      },
      include: {
        pets: true,
      },
    });

    return { owner };
  } catch (error) {
    return { owner: null };
  }
}
