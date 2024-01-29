"use client";

import { getUserByConversationId } from "@/lib/db/actions/chat-actions";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { FullConversation } from "./chat-list";

export default function ChatConversation({
  conversation,
}: {
  conversation: FullConversation;
}) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (conversation.userConversation.user) {
      setUser(conversation.userConversation.user);
    }
  }, []);

  return (
    <Link
      href={`/app/messages/${conversation.id}`}
      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-cerulean-800"
    >
      {user?.image ? (
        <Image
          className="h-[50px] w-[50px] flex-none rounded-full bg-cerulean-950"
          src={user.image}
          width={50}
          height={50}
          alt="Profile picture"
        />
      ) : (
        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
          <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
        </span>
      )}
      {user?.name && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">{user.name}</p>
          <p className="text-xs text-cerulean-100/50">
            {/* TODO: Get last message */}
            This was my last message.
          </p>
        </div>
      )}
    </Link>
  );
}
