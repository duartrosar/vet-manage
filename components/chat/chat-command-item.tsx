import React from "react";
import { FullConversation } from "./chat-list";
import { CommandItem } from "../ui/command";
import ChatConversation from "./chat-conversation";

export default function ChatCommandItem({
  conversation,
  conversationId,
}: {
  conversation: FullConversation;
  conversationId: number;
}) {
  const user = conversation.userConversation.user;

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
