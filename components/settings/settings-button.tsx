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
        "group flex h-10 w-full items-center justify-start gap-3 rounded-lg px-3 font-normal text-gray-600 transition duration-75 hover:bg-gray-100 hover:text-cerulean-900 hover:shadow-sm dark:text-gray-400 dark:hover:bg-cerulean-800 dark:hover:text-gray-200",
      )}
    >
      <span>
        <IoSettings className="h-[20px] w-[20px] text-cerulean-500 group-hover:text-cerulean-500 dark:text-cerulean-500" />
      </span>
      {isOpen && "Settings"}
    </button>
  );
}
