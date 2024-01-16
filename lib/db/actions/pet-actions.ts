"use server";

import { petSchema } from "@/lib/zod/zodSchemas";
import { db } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { Pet } from "@prisma/client";
import { deleteBlob } from "@/lib/db/actions/blob-actions";

export async function getPets() {
  try {
    const pets = await db.pet.findMany();

    return { pets: pets, success: true };
  } catch (error) {
    console.log("getPets", error);
    return { success: false };
  }
}

export async function createPet(data: Pet) {
  try {
    const result = petSchema.safeParse(data);

    if (result.success) {
      const pet = await db.pet.create({
        data: data,
      });

      if (pet) {
        revalidatePath("/app/pets");
        return { pet, success: true };
      }
    }

    return { pet: data, success: false };
  } catch (error) {
    console.log("createPet", error);
    return { success: false };
  }
}

export async function updatePet(data: Pet) {
  try {
    const result = petSchema.safeParse(data);

    if (result) {
      const updatedPet = await db.pet.update({
        where: {
          id: data.id,
        },
        data: data,
      });

      revalidatePath("/app/pets");
      return { updatedPet, success: true };
    }

    return { updatedPet: data, success: false };
  } catch (error) {
    console.log("updatePet", error);
    return { success: false };
  }
}

export async function deletePet(petId: number) {
  try {
    const pet = await db.pet.findUnique({
      where: { id: petId },
    });

    if (pet?.imageUrl) {
      await deleteBlob(pet.imageUrl);
    }

    await db.pet.delete({
      where: {
        id: petId,
      },
    });
    revalidatePath("/app/pets");
  } catch (error) {
    console.log("deletePet", error);
    return { success: false };
  }
}
