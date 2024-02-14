import React from "react";
import ChatConversation from "../chat/chat-conversation";
import { getConversations } from "@/lib/db/actions/chat-actions";

const fetchData = async () =>
  new Promise((resolve) => setTimeout(() => resolve("Data loaded"), 10000));

export default async function DashboardConversations() {
  const { conversations } = await getConversations();
  // await fetchData();
  // await getData();

  console.log({ conversations });

  if (!conversations?.length) {
    return (
      <div className="space-y-4 pl-2">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Messages
        </h2>
        <p className="text-sm font-medium tracking-wide text-gray-400">
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
