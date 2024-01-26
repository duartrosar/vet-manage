import ChatBody from "@/components/chat/chat-body";
import ChatFooter from "@/components/chat/chat-footer";
import ChatHeader from "@/components/chat/chat-header";
import React from "react";

export default function ConversationPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log({ params });
  return (
    <>
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </>
  );
}
