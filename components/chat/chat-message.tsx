"use client";

import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ChatMessage({
  message,
  userId,
}: {
  message: Message;
  userId: string;
}) {
  return (
    <div
      key={message.id}
      className={clsx(
        "flex w-full",
        userId === message.senderId ? "justify-end" : "",
      )}
    >
      <div
        className={clsx(
          "flex items-end gap-6 rounded-lg p-2 text-sm font-normal text-white",
          userId === message.senderId ? "bg-green-700" : "bg-cerulean-800",
        )}
      >
        <p>{message.body}</p>
        <span className="text-[10px] text-gray-200">
          {format(message.createdAt, "HH:mm")}
        </span>
      </div>
    </div>
  );
}
