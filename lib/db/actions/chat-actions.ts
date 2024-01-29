"use server";

import { auth } from "@/auth";
import { db } from "../prisma";
import { Message } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createConversation(
  sessionUserId: string,
  otherUserId: string,
) {
  try {
    const conversation = await db.conversation.create({
      data: {
        userConversations: {
          create: [{ userId: sessionUserId }, { userId: otherUserId }],
        },
      },
      include: {
        userConversations: {
          include: { user: true },
        },
      },
    });

    return conversation;
  } catch (error) {}
}

export async function getConversationById(conversationId: number) {
  try {
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        userConversations: { include: { user: true } },
        messages: true,
      },
    });

    return conversation;
  } catch (error) {
    console.log({ error });
  }
}

export async function getConversations() {
  try {
    const session = await auth();

    if (session?.user) {
      const conversations = await db.conversation.findMany({
        where: {
          userConversations: {
            some: {
              userId: session.user.id,
            },
          },
        },
        include: { userConversations: true },
      });

      return { conversations: conversations, success: true };
    }
  } catch (error) {}
}

export async function createMessage(data: Message) {
  try {
    const session = await auth();
    if (session?.user) {
      data.senderId = session.user.id;
      const message = await db.message.create({
        data: data,
      });

      console.log({ message });
      revalidatePath(`/app/messages/${data.conversationId}`);
      return message;
    }
  } catch (error) {
    console.log({ error });
  }
}

export async function getMessages(conversationId: number) {
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: { createdAt: "asc" },
    });

    return messages;
  } catch (error) {}
}

export async function getUserByConversationId(conversationId: number) {
  try {
    const session = await auth();

    if (session?.user) {
      const user = await db.user.findFirst({
        where: {
          conversations: {
            some: {
              AND: {
                conversationId: conversationId,
              },
              NOT: {
                userId: session.user.id,
              },
            },
          },
        },
      });

      return user;
    }
  } catch (error) {}
}

export async function getUserConversations(userId: string) {
  try {
    const result = await getConversations();

    if (result?.conversations) {
      const userConversations = result.conversations.flatMap((conversation) =>
        conversation.userConversations.filter((uc) => uc.userId !== userId),
      );

      const userIds = userConversations.map((uc) => uc.userId);

      if (userIds !== null) {
        const users = await db.user.findMany({
          where: {
            id: {
              in: userIds as string[],
            },
          },
        });
      }
    }
  } catch (error) {}
}
