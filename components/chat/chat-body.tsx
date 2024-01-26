import { cn } from "@/lib/utils";
import React from "react";
import { number } from "zod";

export default function ChatBody() {
  const numbers: number[] = [];

  for (let i = 0; i < 25; i++) {
    numbers.push(i);
  }
  return (
    <div className=" flex-1 space-y-2 overflow-y-auto p-4">
      <div className="m-auto flex w-full max-w-6xl flex-col">
        {numbers.map((value, index) => (
          <div
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
    </div>
  );
}
