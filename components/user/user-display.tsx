import React from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export default function UserDisplay({
  displayEmail = true,
  className,
}: {
  displayEmail?: boolean;
  className?: string;
}) {
  const user = { image: null, name: "Admin Admin", email: "admin@email.com" };
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 aria-selected:bg-cerulean-800",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cerulean-100/10">
        {user.image ? (
          <Image
            className="h-[40px] w-[40px] flex-none rounded-full"
            src={user.image}
            width={40}
            height={40}
            alt="Profile picture"
          />
        ) : (
          <FaUser className="h-[20px] w-[20px] text-cerulean-500/50" />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white">{user?.name}</p>
        <p className="text-xs text-cerulean-100/50">
          {/* TODO: Get last message */}
          {user.email}
        </p>
      </div>
    </div>
  );
}
