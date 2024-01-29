"use server";

import { db } from "@/lib/db/prisma";
import {
  generateVerificationToken,
  getVerificationTokenByToken,
} from "./token-actions";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterProps } from "@/lib/types";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { deleteBlob } from "@/lib/db/actions/blob-actions";
import { auth } from "@/auth";

export async function createUserWithOwner(userRegister: RegisterProps) {
  try {
    const password = await hash(userRegister.password, 12);

    const user = await db.user.create({
      data: {
        name: userRegister.firstName + " " + userRegister.lastName,
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

    const verificationToken = await generateVerificationToken(
      userRegister.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      true,
    );

    return { user: user, success: true };
  } catch (error) {
    console.log("registerCustomerUser", error);
    return { success: false };
  }
}

export async function getUser(email: string) {
  try {
    const user = await db.user.findUnique({
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

export async function deleteUser(userId: string, pathToRevalidate: string) {
  console.log("userId", userId);

  try {
    const user = await getUserById(userId);

    if (user?.image) {
      await deleteBlob(user?.image);
    }

    await db.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.log("deleteUser", error);
    return { success: false };
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: { roles: true },
    });

    return user;
  } catch (error) {
    return null;
  }
};
