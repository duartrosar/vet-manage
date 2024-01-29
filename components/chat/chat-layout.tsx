import { getConversations } from "@/lib/db/actions/chat-actions";
import React from "react";
import ChatList from "./chat-list";

export default async function ChatLayout() {
  const result = await getConversations();

  return (
    <>
      <ChatList conversations={result?.conversations} className="z-10" />
    </>
  );
}
