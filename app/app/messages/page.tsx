"use client";
import useConversation from "@/lib/hooks/useConversation";
import { cn } from "@/lib/utils";
import React from "react";

export default function MessagesPage() {
  const { isChatSideBarOpen } = useConversation();

  return (
    <div
      className={cn(
        "h-full lg:block lg:pl-80",
        isChatSideBarOpen ? "block" : "hidden",
      )}
    >
      <div className="flex h-full flex-col items-center justify-center text-sm text-gray-800 dark:text-cerulean-100/50">
        <p>Select a conversation to start chatting.</p>
      </div>
    </div>
  );
}
