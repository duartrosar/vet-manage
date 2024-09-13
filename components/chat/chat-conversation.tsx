"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";
import useConversation from "@/lib/hooks/useConversation";
import { ConversationWithRelations } from "@/lib/db/extended-types";

export default function ChatConversation({
  conversation,
  selected,
}: {
  conversation: ConversationWithRelations;
  selected: boolean;
}) {
  const [user, setUser] = useState<User>();
  const { conversationId } = useConversation();

  useEffect(() => {
    if (conversation.userConversations[0].user) {
      setUser(conversation.userConversations[0].user);
    }
  }, []);

  return (
    <Link
      href={`/app/messages/${conversation.id}`}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg p-2 shadow-md hover:bg-gray-100 dark:shadow-xl dark:hover:bg-cerulean-800",
        conversation.id === conversationId
          ? "bg-gray-100 dark:bg-cerulean-800"
          : "",
      )}
    >
      {user?.image ? (
        <Image
          className="h-[40px] w-[40px] flex-none rounded-full dark:bg-cerulean-950"
          src={user.image}
          width={40}
          height={40}
          alt="Profile picture"
        />
      ) : (
        <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full dark:bg-cerulean-950">
          <FaUser className="h-[25px] w-[25px] text-cerulean-500/50" />
        </span>
      )}
      {user?.name && (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-cerulean-900 dark:text-white">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-cerulean-100/50">
            {/* TODO: Get last message */}
            {conversation.messages[0]?.body
              ? conversation.messages[0].body
              : "No messages"}
          </p>
        </div>
      )}
    </Link>
  );
}
