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
            userId: session.user.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const conversationsIds = conversations.map((id) => id.id);
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

    const isCustomer = user.roles.some((role) => role.role === "OWNER");

    const filteredUsers = users.filter(
      (user) =>
        !user.conversations.some((conversation) =>
          conversationsIds.includes(conversation.conversationId),
        ),
    );

    return NextResponse.json({ users: filteredUsers, isCustomer });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      },
    );
  }
}
