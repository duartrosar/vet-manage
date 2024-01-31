import React, { Suspense } from "react";
import { IoAddOutline, IoCreate, IoImageOutline } from "react-icons/io5";
import Image from "next/image";
import { getOwners } from "@/lib/db/actions/owner-actions";
import { FaUser } from "react-icons/fa6";
import ChatList from "@/components/chat/chat-list";
import { getConversations } from "@/lib/db/actions/chat-actions";
import { Conversation } from "@prisma/client";
import ChatLayout from "@/components/chat/chat-layout";
import ChatListSkeleton from "@/components/chat/chat-list-skeleton";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<ChatListSkeleton />}>
        <ChatLayout />
        {children}
      </Suspense>
    </div>
  );
}
