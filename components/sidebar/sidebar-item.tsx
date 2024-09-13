"use client";

import { SidebarItemProps } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { usePathname } from "next/navigation";

export default function SidebarItem({
  title,
  urlPath,
  icon,
}: SidebarItemProps) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const currentPathname = usePathname();
  const isActive = currentPathname === urlPath;

  return (
    <li
      data-active={isActive ? true : false}
      className="group w-full rounded-lg transition duration-75 hover:bg-gray-100 hover:shadow-sm data-[active=true]:bg-gray-100 data-[active=true]:shadow-sm dark:hover:bg-cerulean-800 dark:data-[active=true]:bg-cerulean-800"
    >
      <Link
        href={urlPath}
        data-active={isActive ? true : false}
        className="flex h-10 items-center justify-start gap-3 px-3 font-medium text-gray-600 group-hover:text-cerulean-900 data-[active=true]:text-cerulean-900 dark:text-gray-400 dark:group-hover:text-gray-200 dark:data-[active=true]:text-gray-200"
      >
        <span>
          {React.createElement(icon, {
            className:
              "h-[20px] w-[20px] text-cerulean-500 group-hover:text-cerulean-500 dark:text-cerulean-500",
          })}
        </span>
        {isOpen && title}
      </Link>
    </li>
  );
}
