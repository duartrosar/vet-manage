"use client";

import { Conversation, Owner, User, UserConversation } from "@prisma/client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import useConversation from "@/lib/hooks/useConversation";
import Link from "next/link";
import ChatConversation from "./chat-conversation";
import ChatAddConversation from "./chat-add-conversation";
import { useSession } from "next-auth/react";

export interface FullUserConversation {
  id?: number;
  user?: User;
}

export interface FullConversation extends Conversation {
  userConversation: FullUserConversation;
}

export default function ChatList({
  conversations,
  className,
}: {
  conversations?: FullConversation[];
  className?: string;
}) {
  const { isChatSideBarOpen } = useConversation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 h-full w-80 overflow-y-auto border-r-2 border-cerulean-700/25 bg-cerulean-900 pt-20 lg:block lg:w-80",
        className,
        isChatSideBarOpen ? "hidden" : "block w-full",
      )}
    >
      <div className="flex items-center justify-between pl-4 pr-2 pt-2">
        <h1 className="text-xl text-white">Chats</h1>
        <ChatAddConversation />
      </div>
      <div className="space-y-4 p-2 px-2">
        {conversations?.map((conversation) => (
          <ChatConversation key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </aside>
  );
}
