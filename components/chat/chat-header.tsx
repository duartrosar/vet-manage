import React from "react";
import { FaUser } from "react-icons/fa6";

export default function ChatHeader() {
  return (
    <div className="h-16 w-full border-b-2 border-cerulean-700/25 bg-cerulean-900 px-4">
      <div className="flex h-full items-center gap-2">
        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
          <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
        </span>
        <p className="text-sm font-semibold text-white">Duarte Ribeiro</p>
      </div>
    </div>
  );
}
