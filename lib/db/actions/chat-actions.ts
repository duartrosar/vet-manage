"use server";

import { auth } from "@/auth";
import { db } from "../prisma";
import { Conversation, Message } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ConversationWithRelations } from "../extended-types";

interface DashboardConversationsResponse {
  conversations: ConversationWithRelations[] | null;
}

export async function createConversation(otherUserId: string) {
  try {
    const session = await auth();

    if (session?.user) {
      const conversation = await db.conversation.create({
        data: {
          userConversations: {
            create: [{ userId: session.user.id }, { userId: otherUserId }],
          },
        },
        include: {
          userConversations: {
            include: { user: true },
          },
        },
      });

      revalidatePath("/app/messages", "layout");

      return conversation;
    }
  } catch (error) {}
}

export async function getConversationById(conversationId: number) {
  try {
    const session = await auth();
    if (session?.user) {
      const conversation = await db.conversation.findUnique({
        where: { id: conversationId },
        include: {
          userConversations: {
            where: {
              user: {
                isNot: {
                  id: session.user.id,
                },
              },
            },
            include: {
              user: true,
            },
          },
          messages: true,
        },
      });

      const filteredConversation = {
        id: conversation?.id,
        createdAt: conversation?.createdAt,
        lastMessageAt: conversation?.lastMessageAt,
        messages: conversation?.messages,
        name: conversation?.messages,
        userConversation: {
          ...conversation?.userConversations.find((uc) => {
            return uc.userId !== session.user.id;
          }),
        },
      };

      return { conversation };
    }
    return { converstation: null };
  } catch (error) {
    console.log({ error });
    return { converstation: null };
  }
}

export async function getConversations(): Promise<DashboardConversationsResponse> {
  try {
    const session = await auth();

    console.log({ session });

    if (session) {
      const conversations = await db.conversation.findMany({
        where: {
          userConversations: {
            some: {
              userId: session.user.id,
            },
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
          userConversations: {
            where: {
              user: {
                isNot: {
                  id: session.user.id,
                },
              },
            },
            include: {
              user: { include: { roles: true } },
            },
          },
        },
      });

      return { conversations };
    }
    return { conversations: null };
  } catch (error) {
    return { conversations: null };
  }
}

export async function getConversationsOld() {
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
        orderBy: { createdAt: "desc" },
        include: {
          userConversations: {
            include: {
              user: {
                include: {
                  roles: true,
                },
              },
            },
          },
        },
      });

      // map over the conversations
      // create a new conversation with every property using the spread operator
      // in that new conversation, we find the ONLY userConversation where
      // the userId doesn't match the id of the logged in user
      // then we return the spreaded userConversation, so that
      // we get all the values in that userConversation
      const filteredConversations = conversations.map((conversation) => {
        const newConversation = {
          id: conversation.id,
          createdAt: conversation.createdAt,
          lastMessageAt: conversation.lastMessageAt,
          name: conversation.name,
          userConversation: {
            ...conversation.userConversations.find(
              (userConversation) => userConversation.userId !== session.user.id,
            ),
          },
        };
        return newConversation;
      });

      return { conversations: filteredConversations, success: true };
    }
  } catch (error) {
    console.log("🚀 ~ getConversations ~ error:", { error });
  }
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
