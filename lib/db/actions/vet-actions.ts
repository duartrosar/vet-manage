"use server";

import { vetSchema } from "@/lib/zod/zodSchemas";
import { db } from "@/lib/db/prisma";
import { Vet } from "@prisma/client";
import { generateVerificationToken } from "./token-actions";
import { sendVerificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export async function getVets() {
  try {
    const vets = await db.vet.findMany();
    return { vets: vets, success: true };
  } catch (error) {
    console.log("getVets", error);
    return { success: false };
  }
}

export async function getVet(vetId: number) {
  try {
    const vet = await db.vet.findUnique({
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
    const result = vetSchema.safeParse(data);

    if (result.success) {
      const vetUser = await db.user.create({
        data: {
          email: data.email,
          name: data.firstName + " " + data.lastName,
          image: data.imageUrl,
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

      const verificationToken = await generateVerificationToken(data.email);

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      const vet = vetUser.vet;

      revalidatePath("/app/vets");
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
      const updatedvet = await db.vet.update({
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
              name: data.firstName + " " + data.lastName,
              image: data.imageUrl,
            },
          },
        },
      });

      revalidatePath("/app/vets");
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

export async function getVetByUserId(userId: string) {
  try {
    const vet = await db.vet.findUnique({
      where: {
        userId: userId,
      },
    });

    return { vet };
  } catch (error) {
    return { vet: null };
  }
}
