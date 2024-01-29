"use client";

import { Conversation, Owner } from "@prisma/client";
import React, { Suspense, useMemo } from "react";
import { IoAddOutline } from "react-icons/io5";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import useConversation from "@/lib/hooks/useConversation";
import Link from "next/link";
import ChatConversation from "./chat-conversation";

export default function ChatList({
  conversations,
  className,
}: {
  conversations?: Conversation[];
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
        <button className="rounded-lg p-3 hover:bg-cerulean-800">
          <IoAddOutline className="h-[20px] w-[20px] cursor-pointer text-white" />
        </button>
      </div>
      <div className="space-y-4 p-2 px-2">
        {conversations?.map((conversation) => (
          <Suspense
            key={conversation.id}
            fallback={<div className="bg-red h-12 animate-pulse"></div>}
          >
            <ChatConversation conversation={conversation} />
          </Suspense>
        ))}
      </div>
    </aside>
  );
}
