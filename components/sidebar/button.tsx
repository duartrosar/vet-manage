"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";

export default function SidebarButton() {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  return (
    <button
      id="sidebarToggle"
      data-sidebar-toggle={true}
      onClick={() => dispatch(setIsOpen(!isOpen))}
      className="hover:bg-cerulean-800 cursor-pointer rounded-lg p-3 transition"
    >
      <CgMenuLeft
        data-sidebar-toggle={true}
        className="h-6 w-6 text-gray-400"
      />
    </button>
  );
}
