import React from "react";
import Logo from "../logo";
import ProfileMenu from "../user/user-popup";
import SidebarButton from "../sidebar/button";
import { auth } from "@/auth";
import ThemeToggle from "../theme-toggle/theme-toggle";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed left-0 top-0 z-40 h-20 w-full">
      <div className="h-full w-full border-b border-gray-300 bg-white shadow-sm dark:border-b-2 dark:border-cerulean-700/25 dark:bg-cerulean-900 dark:shadow-xl">
        <div className="flex h-full items-center justify-between gap-3 px-3 py-3">
          <div className="flex items-center gap-3">
            <SidebarButton />
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session?.user && <ProfileMenu user={session?.user} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
