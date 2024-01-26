"use client";
import useConversation from "@/lib/hooks/useConversation";
import { cn } from "@/lib/utils";
import React from "react";

export default function MessagesPage() {
  const { isOpen } = useConversation();
  console.log({ isOpen });
  return (
    <div
      className={cn(
        "h-full bg-cerulean-950 lg:block lg:pl-80",
        isOpen ? "block" : "hidden",
      )}
    ></div>
  );
}
