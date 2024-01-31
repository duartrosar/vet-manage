"use client";

import {
  Conversation,
  Owner,
  Roles,
  User,
  UserConversation,
  UserRole,
} from "@prisma/client";
import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import useConversation from "@/lib/hooks/useConversation";
import ChatConversation from "./chat-conversation";
import ChatAddConversation from "./chat-add-conversation";
import useFilterConversations from "@/lib/hooks/useFilterConversations";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../ui/command";
import { CommandItem } from "cmdk";
import ChatCommandItem from "./chat-command-item";
import dynamic from "next/dynamic";

// TODO: This is just for testing
// const LazyAddConversation = dynamic(() => import("./chat-add-conversation"), {
//   ssr: false,
//   loading: () => (
//     <div className="h-full w-full animate-pulse bg-red-500 text-white">
//       HEllo world
//     </div>
//   ),
// });

export interface FullUser extends User {
  roles?: UserRole[];
}

export interface FullUserConversation {
  id?: number;
  user?: FullUser;
  roles?: string[];
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
  const [customerConversations, setCustomerConversations] =
    useState<FullConversation[]>();
  const [employeeConversations, setEmployeeConversations] =
    useState<FullConversation[]>();
  const { isChatSideBarOpen, conversationId } = useConversation();
  const { getCustomerConversations, getEmployeeConversations } =
    useFilterConversations(conversations);

  useEffect(() => {
    const custConversations = getCustomerConversations();
    const empConversations = getEmployeeConversations();

    console.log({ custConversations });

    if (custConversations) {
      setCustomerConversations(custConversations);
    }
    if (empConversations) {
      setEmployeeConversations(empConversations);
    }
  }, [conversations]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 h-full w-80 overflow-hidden border-r-2 border-cerulean-700/25 bg-cerulean-900 pb-14 pt-20 lg:block lg:w-80",
        className,
        isChatSideBarOpen ? "hidden" : "block w-full",
      )}
    >
      <div className="flex items-center justify-between pl-4 pr-2 pt-2">
        <h1 className="text-xl text-white">Chats</h1>
        {/* TODO: This is just for testing */}
        <ChatAddConversation />
      </div>
      <Command className="space-y-2 overflow-y-hidden rounded-lg bg-cerulean-900 text-sm">
        <CommandInput
          className="px-2 text-gray-200"
          placeholder="Search User..."
        />
        <CommandEmpty className="py-6 text-center text-gray-400">
          No conversations found.
        </CommandEmpty>
        <CommandList className="max-h- max-h-fit">
          {employeeConversations?.length && (
            <CommandGroup heading="Vets" className="space-y-4 p-2 px-2">
              {employeeConversations?.map((conversation) => (
                <ChatCommandItem
                  key={conversation.id}
                  conversation={conversation}
                  conversationId={conversationId}
                />
              ))}
            </CommandGroup>
          )}
          {customerConversations?.length && (
            <CommandGroup heading="Owners">
              {customerConversations?.map((conversation) => (
                <ChatCommandItem
                  key={conversation.id}
                  conversation={conversation}
                  conversationId={conversationId}
                />
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </aside>
  );
}
