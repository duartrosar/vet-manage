import React, { Suspense } from "react";
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
