import React from "react";
import Logo from "../logo";
import ProfileMenu from "../user/user-popup";
import SidebarButton from "../sidebar/button";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed left-0 top-0 z-40 h-20 w-full">
      <div className="h-full w-full border-b-2 border-cerulean-700/25 bg-cerulean-950 shadow-xl">
        <div className="flex h-full items-center justify-between gap-3 px-3 py-3">
          <div className="flex items-center gap-3">
            <SidebarButton />
            <Logo />
          </div>
          {session?.user && <ProfileMenu user={session?.user} />}
        </div>
      </div>
    </nav>
  );
}
