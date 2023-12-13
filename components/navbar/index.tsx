"use client";

import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import Logo from "../logo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";

export default function Navbar() {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed left-0 top-0 z-50 h-20 w-full">
      <div className="h-full w-full border-b-2 border-cerulean-700/25 bg-cerulean-950 shadow-xl">
        <div className="flex h-full items-center justify-between gap-3 p-3">
          <div className="flex items-center gap-3">
            {/* <SidebarButton /> */}
            <button
              id="sidebarToggle"
              data-sidebar-toggle={true}
              onClick={() => dispatch(setIsOpen(!isOpen))}
              className="cursor-pointer rounded-lg p-3 hover:bg-cerulean-900"
            >
              <CgMenuLeft
                data-sidebar-toggle={true}
                className="h-6 w-6 text-gray-400"
              />
            </button>
            <Logo />
          </div>
          {/* <ProfileMenu user={user} /> */}
        </div>
      </div>
    </nav>
  );
}
