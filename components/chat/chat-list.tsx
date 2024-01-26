"use client";

import { Owner } from "@prisma/client";
import React, { useMemo } from "react";
import { IoAddOutline } from "react-icons/io5";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import useConversation from "@/lib/hooks/useConversation";
import Link from "next/link";

export default function ChatList({
  owners,
  className,
}: {
  owners?: Owner[];
  className?: string;
}) {
  const { isOpen, conversation } = useConversation();
  return (
    <aside
      className={cn(
        "fixed inset-y-0 h-full w-80 overflow-y-auto border-r-2 border-cerulean-700/25 bg-cerulean-900 pt-20 lg:block lg:w-80",
        className,
        isOpen ? "hidden" : "left- block w-full",
      )}
    >
      <div className="flex items-center justify-between pl-4 pr-2 pt-2">
        <h1 className="text-xl text-white">Chats</h1>
        <button className="rounded-lg p-3 hover:bg-cerulean-800">
          <IoAddOutline className="h-[20px] w-[20px] cursor-pointer text-white" />
        </button>
      </div>
      <div className="space-y-4 p-2 px-2">
        {owners?.map((owner) => (
          <Link
            href="/app/messages/conversation"
            key={owner.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-cerulean-800"
          >
            {owner?.imageUrl ? (
              <Image
                className="h-[50px] w-[50px] flex-none rounded-full bg-cerulean-950"
                src={owner.imageUrl}
                width={50}
                height={50}
                alt="Profile picture"
              />
            ) : (
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
                <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
              </span>
            )}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">
                {owner.firstName} {owner.lastName}
              </p>
              <p className="text-xs text-cerulean-100/50">
                This was my last message.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
