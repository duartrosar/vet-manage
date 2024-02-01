import { Prisma, Roles } from "@prisma/client";

const userWithRoles = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    roles: true,
  },
});

const messageWithRelations = Prisma.validator<Prisma.MessageDefaultArgs>()({
  include: {
    Conversation: {
      include: {
        userConversations: {
          include: {
            user: true,
          },
        },
      },
    },
  },
});

const conversationWithRelations =
  Prisma.validator<Prisma.ConversationDefaultArgs>()({
    include: {
      messages: true,
      userConversations: {
        include: {
          user: { include: { roles: true } },
        },
      },
    },
  });

export type MessageWithRelations = Prisma.MessageGetPayload<
  typeof messageWithRelations
>;

export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;

export type ConversationWithRelations = Prisma.ConversationGetPayload<
  typeof conversationWithRelations
>;
