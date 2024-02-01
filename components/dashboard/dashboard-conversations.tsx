import React from "react";
import ChatConversation from "../chat/chat-conversation";
import { getConversations } from "@/lib/db/actions/chat-actions";

export default async function DashboardConversations() {
  const { conversations } = await getConversations();
  // await getData();

  if (!conversations) {
    return (
      <div>
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Messages
        </h2>
        <p className="text-lg font-medium tracking-wide text-gray-200">
          No conversations found
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h2 className="pl-2 text-lg font-medium tracking-wide text-gray-200">
        Messages
      </h2>
      {conversations.map((conversation, index) => (
        <ChatConversation
          key={conversation.id}
          conversation={conversation}
          selected={false}
        />
      ))}
    </div>
  );
}
