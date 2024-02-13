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

export async function getAllUsers(userId: string) {
  try {
    const conversations = await db.conversation.findMany({
      where: {
        userConversations: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        userConversations: true,
      },
    });

    const users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
        AND: {
          roles: {
            some: {
              role: "CUSTOMER",
            },
          },
        },
      },
      include: {
        conversations: true,
      },
    });

    const userIds = conversations.flatMap((conversation) =>
      conversation.userConversations
        .filter((uc) => uc.userId !== userId)
        .map((uc) => uc.userId),
    );

    const filteredIds = userIds.filter((id) => id !== undefined);

    const filteredUsers = users.filter(
      (user) => !filteredIds.includes(user.id),
    );
    return { users: filteredUsers };
  } catch (error) {
    console.log({ error });
  }
}

export async function getEmployeeUsers(userId: string) {
  try {
    const conversations = await db.conversation.findMany({
      where: {
        userConversations: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        userConversations: true,
      },
    });

    const users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
        AND: {
          roles: {
            some: {
              role: "EMPLOYEE",
            },
          },
        },
      },
      include: {
        conversations: true,
      },
    });

    const userIds = conversations.flatMap((conversation) =>
      conversation.userConversations
        .filter((uc) => uc.userId !== userId)
        .map((uc) => uc.userId),
    );

    const filteredIds = userIds.filter((id) => id !== undefined);

    const filteredUsers = users.filter(
      (user) => !filteredIds.includes(user.id),
    );
    return { users: filteredUsers };
  } catch (error) {
    console.log({ error });
  }
}

export async function getPasswordHash(
  userId: string,
): Promise<{ hash: string | null | undefined }> {
  try {
    const select = await db.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    return { hash: select?.password };
  } catch (error) {
    return { hash: "" };
  }
}

export async function setNewPassword(userId: string, password: string) {
  try {
    const passwordHash = await hash(password, 12);

    await db.user.update({
      where: { id: userId },
      data: { password: passwordHash },
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
