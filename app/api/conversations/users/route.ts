import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
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
            userId: user.id,
          },
        },
      },
      include: {
        userConversations: true,
      },
    });

    const users = await getUsers(user.id);
    const isCustomer = user.roles.some((role) => role.role === "CUSTOMER");

    const userIds = conversations.flatMap((conversation) =>
      conversation.userConversations
        .filter((uc) => uc.userId !== user.id)
        .map((uc) => uc.userId),
    );

    const filteredIds = userIds.filter((id) => id !== undefined);

    const filteredUsers = users.filter(
      (user) => !filteredIds.includes(user.id),
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
