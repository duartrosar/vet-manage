"use client";

import { Conversation, Owner, User, UserConversation } from "@prisma/client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import useConversation from "@/lib/hooks/useConversation";
import ChatConversation from "./chat-conversation";
import ChatAddConversation from "./chat-add-conversation";

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
  const { isChatSideBarOpen, conversationId } = useConversation();

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
        {conversations?.length ? (
          conversations?.map((conversation) => (
            <ChatConversation
              key={conversation.id}
              selected={conversation.id === conversationId}
              conversation={conversation}
            />
          ))
        ) : (
          <div className="flex flex-col items-center text-sm font-normal text-cerulean-100/50">
            <p>No conversations found. </p>
            <p>Click the plus sign to add one.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
