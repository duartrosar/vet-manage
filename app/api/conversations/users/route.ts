import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
      });
    }
    const user = session.user;

    const conversations = await db.conversation.findMany({
      where: {
        userConversations: {
          some: {
            userId: session.user.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const conversationsIds = conversations.map((id) => id.id);
    console.log({ conversations });
    // type x = Prisma.UserConversationListRelationFilter
    const users = await db.user.findMany({
      where: {
        id: {
          not: session.user.id, // Exclude the session user by their ID
        },
      },
      include: {
        roles: true,
        conversations: true,
      },
    });

    const isCustomer = user.roles.some((role) => role.role === "CUSTOMER");

    const filteredUsers = users.filter(
      (user) =>
        !user.conversations.some((conversation) =>
          conversationsIds.includes(conversation.conversationId),
        ),
    );

    return NextResponse.json({ users: filteredUsers, isCustomer });
  } catch (error) {}
}

async function getUsers(userId: string) {
  const users = await db.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
    include: {
      conversations: true,
      roles: true,
    },
  });

  return users;
}
