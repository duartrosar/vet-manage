"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export default function ChatBody() {
  const numbers: number[] = [];

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, []);

  for (let i = 0; i < 25; i++) {
    numbers.push(i);
  }
  return (
    <div className=" flex-1 overflow-y-auto p-4">
      <div className="m-auto flex w-full max-w-6xl flex-col space-y-2">
        {numbers.map((value, index) => (
          <div
            key={value}
            className={cn("flex w-full", value % 2 === 0 ? "justify-end" : "")}
          >
            <div
              className={cn(
                "flex items-end gap-6 rounded-lg p-2 text-sm font-normal text-white",
                value % 2 === 0 ? "bg-green-700" : "bg-cerulean-800",
              )}
            >
              <p>This is a message</p>
              <span className="text-xs text-gray-200">16:00</span>
            </div>
          </div>
        ))}
      </div>
      <div className="" ref={bottomRef} />
    </div>
  );
}
