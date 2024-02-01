import { getConversations } from "@/lib/db/actions/chat-actions";
import React from "react";
import ChatList from "./chat-list";

export default async function ChatLayout() {
  const { conversations } = await getConversations();

  if (!conversations) {
    return <></>;
  }

  return (
    <>
      <ChatList conversations={conversations} className="z-10" />
    </>
  );
}
