import { auth } from "@/auth";
import ChatBody from "@/components/chat/chat-body";
import ChatFooter from "@/components/chat/chat-footer";
import ChatHeader from "@/components/chat/chat-header";
import ChatList from "@/components/chat/chat-list";
import {
  createConversation,
  getConversationById,
  getConversations,
  getMessages,
} from "@/lib/db/actions/chat-actions";
import { Conversation } from "@prisma/client";
import React from "react";

interface IParams {
  conversationId: number;
}

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversationId = parseInt(params.conversationId, 10);

  const { conversation } = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation || !conversation.userConversations[0].user) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col items-center justify-center text-sm text-cerulean-100/50">
          <p>No conversations found. </p>
          <p>Click the plus sign to add one.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex h-full w-full flex-col lg:pl-80 ">
        <ChatHeader user={conversation.userConversations[0].user} />
        <ChatBody messages={messages} />
        <ChatFooter />
      </div>
    </>
  );
};

export default ConversationPage;
