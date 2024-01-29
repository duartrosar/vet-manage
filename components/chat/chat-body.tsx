"use client";

import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./chat-message";

export default function ChatBody({ messages }: { messages?: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string>("");

  const session = useSession();
  useEffect(() => {
    if (session?.data) {
      setUserId(session.data.user.id);
    }
  }, [session]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, []);

  return (
    <div className=" flex-1 overflow-y-auto p-4">
      <div className="m-auto flex w-full max-w-6xl flex-col space-y-2">
        {messages &&
          userId &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} userId={userId} />
          ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
