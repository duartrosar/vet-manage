"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";
import { Button } from "../ui/button";

export default function SidebarButton() {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  return (
    <Button
      id="sidebarToggle"
      data-sidebar-toggle={true}
      onClick={() => dispatch(setIsOpen(!isOpen))}
      className="group cursor-pointer rounded-md p-3 text-gray-400 transition hover:bg-gray-100 dark:hover:bg-cerulean-800"
    >
      <CgMenuLeft data-sidebar-toggle={true} className="h-6 w-6 " />
    </Button>
  );
}
