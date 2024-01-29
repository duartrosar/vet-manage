"use client";
import useConversation from "@/lib/hooks/useConversation";
import { cn } from "@/lib/utils";
import React from "react";

export default function ChatListSkeleton() {
  const { isChatSideBarOpen } = useConversation();

  // TODO: finish this
  return (
    <div
      className={cn(
        "fixed inset-y-0 h-full w-80 overflow-y-auto border-r-2 border-cerulean-700/25 bg-cerulean-900 pt-20 lg:block lg:w-80",
        isChatSideBarOpen ? "hidden" : "block w-full",
      )}
    ></div>
  );
}
