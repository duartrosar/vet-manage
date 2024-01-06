"use client";

import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { genderOptions } from "@/lib/constants";
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
        <PopoverTrigger className="border-cerulean-100/10 mr-3 flex h-11 w-11 items-center justify-center rounded-full border bg-transparent">
          {user.image ? (
            <Image
              className="flex-none rounded-full"
              src={user.image}
              width={50}
              height={50}
              alt="Profile picture"
            />
          ) : (
            <FaUser className="text-cerulean-500/50 h-[20px] w-[20px]" />
          )}
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="border-cerulean-100/25 bg-cerulean-900 z-20 z-50 w-full rounded-lg border-2 px-0 pb-2 pt-6 text-sm"
        >
          <div className="border-cerulean-100/25 border-b px-5 pb-5">
            <h2 className=" text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <ul className="flex flex-col px-2 pt-2">
            <li
              onClick={(e) => handleClick(e)}
              className="hover:bg-cerulean-800 w-full cursor-pointer rounded-lg px-3 py-2 text-gray-400 transition hover:text-gray-200 hover:shadow-md"
            >
              <Link href="/">Account Settings</Link>
            </li>
            <li
              onClick={() => signOut()}
              className="hover:bg-cerulean-800 w-full cursor-pointer rounded-lg px-3 py-2 text-gray-400 transition hover:text-gray-200 hover:shadow-md"
            >
              Sign Out
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
