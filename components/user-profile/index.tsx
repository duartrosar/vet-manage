"use client";

import React, { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaUser } from "react-icons/fa6";
import type { User } from "next-auth";
import Link from "next/link";
import { logout } from "@/lib/db/actions";

interface ProfileMenuProps {
  user: User;
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  function handleClick(e: ReactMouseEvent<HTMLLIElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const text = element.innerHTML;
    console.log(text);
  }

  return (
    <div className="">
      <Popover>
        <PopoverTrigger className="mr-3 flex h-11 w-11 items-center justify-center rounded-full border border-cerulean-100/10 bg-transparent">
          {user.image ? (
            <Image
              className="flex-none rounded-full"
              src={user.image}
              width={50}
              height={50}
              alt="Profile picture"
            />
          ) : (
            <FaUser className="h-[20px] w-[20px] text-cerulean-500/50" />
          )}
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="z-50 w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 px-0 pb-2 pt-6 text-sm"
        >
          <div className="border-b border-cerulean-100/25 px-5 pb-5">
            <h2 className=" text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <ul className="flex flex-col px-2 pt-2">
            <li
              onClick={(e) => handleClick(e)}
              className="w-full cursor-pointer rounded-lg px-3 py-2 text-gray-400 transition hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md"
            >
              <Link href="/">Account Settings</Link>
            </li>
            <li
              onClick={async () => await logout()}
              className="w-full cursor-pointer rounded-lg px-3 py-2 text-gray-400 transition hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md"
            >
              Sign Out
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
