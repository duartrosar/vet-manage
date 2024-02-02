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

const ownerWithPets = Prisma.validator<Prisma.OwnerDefaultArgs>()({
  include: {
    pets: true,
  },
});

const appointmensWithPets = Prisma.validator<Prisma.AppointmentDefaultArgs>()({
  include: {
    pet: true,
  },
});

export type MessageWithRelations = Prisma.MessageGetPayload<
  typeof messageWithRelations
>;

export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;

export type ConversationWithRelations = Prisma.ConversationGetPayload<
  typeof conversationWithRelations
>;

export type OwnerWithPets = Prisma.OwnerGetPayload<typeof ownerWithPets>;

export type AppointmentWithPets = Prisma.AppointmentGetPayload<
  typeof appointmensWithPets
>;
