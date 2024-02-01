import React from "react";
import { CommandItem } from "../ui/command";
import ChatConversation from "./chat-conversation";
import { ConversationWithRelations } from "@/lib/db/extended-types";

export default function ChatCommandItem({
  conversation,
  conversationId,
}: {
  conversation: ConversationWithRelations;
  conversationId: number;
}) {
  const user = conversation.userConversations[0].user;

  return (
    <CommandItem
      className="block w-full bg-cerulean-900 px-0 aria-selected:bg-cerulean-900"
      key={conversation.id}
      value={user?.id + "-" + user?.name}
    >
      <ChatConversation
        selected={conversation.id === conversationId}
        conversation={conversation}
      />
    </CommandItem>
  );
}
