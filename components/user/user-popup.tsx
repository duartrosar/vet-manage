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
import { signOut } from "next-auth/react";
import Avatar from "../avatar/avatar";

interface ProfileMenuProps {
  user: User;
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  function handleClick(e: ReactMouseEvent<HTMLLIElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const text = element.innerHTML;
  }

  return (
    <div className="">
      <Popover>
        <PopoverTrigger className="mr-3 flex h-11 w-11 items-center justify-center rounded-full">
          <Avatar width={45} height={45} type="user" imageUrl={user.image} />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="z-50 w-full rounded-lg  px-0 pb-2 pt-6 text-sm"
        >
          <div className="border-b border-cerulean-700/25 px-5 pb-5 dark:border-cerulean-100/25">
            <h2 className="text- dark:text-white">{user.name}</h2>
            <p className="dark:text-gray-400">{user.email}</p>
          </div>
          <ul className="flex flex-col px-2 pt-2">
            <li
              onClick={(e) => handleClick(e)}
              className="w-full cursor-pointer rounded-md px-3 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-800 hover:shadow dark:text-gray-400 dark:hover:bg-cerulean-800 dark:hover:text-gray-200"
            >
              <Link href="/">Account Settings</Link>
            </li>
            <li
              onClick={async () => await signOut()}
              className="w-full cursor-pointer rounded-md px-3 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-800 hover:shadow dark:text-gray-400 dark:hover:bg-cerulean-800 dark:hover:text-gray-200"
            >
              Sign Out
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
