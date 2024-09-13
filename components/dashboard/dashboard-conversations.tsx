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
      <>
        <p className="pl-2 text-sm font-medium tracking-wide text-gray-600 dark:text-gray-400">
          No conversations found
        </p>
      </>
    );
  }

  return (
    <>
      {conversations.map((conversation, index) => (
        <ChatConversation
          key={conversation.id}
          conversation={conversation}
          selected={false}
        />
      ))}
    </>
  );
}
