"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import clsx from "clsx";
import React, { Dispatch } from "react";
import { IoSettings } from "react-icons/io5";

export default function SettingsButton({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  return (
    <button
      onClick={() => setIsDialogOpen(!isDialogOpen)}
      className={clsx(
        "group flex h-10 w-full items-center justify-start gap-3 rounded-lg px-3 text-gray-400 transition duration-75 hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md",
      )}
    >
      <span>
        <IoSettings className="h-[20px] w-[20px] text-cerulean-500" />
      </span>
      {isOpen && "Settings"}
    </button>
  );
}
