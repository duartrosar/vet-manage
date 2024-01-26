import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";

export default function ChatHeader() {
  return (
    <div className="flex h-16 w-full items-center gap-2 border-b-2 border-cerulean-700/25 bg-cerulean-900 px-4">
      <Link
        href="/app/messages"
        className="rounded-lg p-3 hover:bg-cerulean-800 lg:hidden"
      >
        <FaArrowLeft className="h-5 w-5 text-cerulean-600" />
      </Link>
      <div className="flex h-full items-center gap-2">
        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
          <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
        </span>
        <p className="text-sm font-semibold text-white">Duarte Ribeiro</p>
      </div>
    </div>
  );
}
