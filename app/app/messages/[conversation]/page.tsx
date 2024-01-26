import ChatBody from "@/components/chat/chat-body";
import ChatFooter from "@/components/chat/chat-footer";
import ChatHeader from "@/components/chat/chat-header";
import ChatList from "@/components/chat/chat-list";
import React from "react";

export default function ConversationPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log({ params });
  return (
    <>
      <div className="relative flex h-full w-full flex-col lg:pl-80 ">
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
      </div>
    </>
  );
}
