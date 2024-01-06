import React from "react";
import Logo from "../logo";
import ProfileMenu from "../user-profile";
import SidebarButton from "../sidebar/button";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth/options";

export default async function Navbar() {
  const session = await getServerSession(options);

  console.log("session in navbar", session);

  return (
    <nav className="fixed left-0 top-0 z-40 h-20 w-full">
      <div className="border-cerulean-700/25 bg-cerulean-950 h-full w-full border-b-2 shadow-xl">
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
