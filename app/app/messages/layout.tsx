import React from "react";
import { IoAddOutline, IoCreate, IoImageOutline } from "react-icons/io5";
import Image from "next/image";
import { getOwners } from "@/lib/db/actions/owner-actions";
import { FaUser } from "react-icons/fa6";
import ChatList from "@/components/chat/chat-list";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { owners } = await getOwners();

  return (
    <div className="h-full w-full">
      <ChatList owners={owners} className="z-10" />
      {children}
    </div>
  );
}
