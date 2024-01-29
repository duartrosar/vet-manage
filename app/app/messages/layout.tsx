import React from "react";
import { IoAddOutline, IoCreate, IoImageOutline } from "react-icons/io5";
import Image from "next/image";
import { getOwners } from "@/lib/db/actions/owner-actions";
import { FaUser } from "react-icons/fa6";
import ChatList from "@/components/chat/chat-list";
import {
  getConversations,
  getUserConversations,
} from "@/lib/db/actions/chat-actions";
import { Conversation } from "@prisma/client";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getConversations();
  const userResult = await getUserConversations("clrb1qrxi0000j0m7bmsccf8g");
  // console.log(result?.conversations[0].userConversations);

  return (
    <div className="h-full w-full">
      <ChatList conversations={result?.conversations} className="z-10" />
      {children}
    </div>
  );
}
