"use client";

import { SidebarItemProps } from "@/lib/types";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setIsOpen, setActive } from "@/lib/redux/slices/sidebar-slice";
import { useWindowSize } from "@uidotdev/usehooks";
import clsx from "clsx";

export default function SidebarItem({
  title,
  urlPath,
  icon,
  pathName,
}: SidebarItemProps) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const active = useAppSelector((state) => state.sidebar.active);
  const dispatch = useAppDispatch();
  const size = useWindowSize();

  const handleClick = () => {
    dispatch(setActive(pathName));

    if (size.width && size.width <= 1024) {
      dispatch(setIsOpen(false));
    }
  };

  return (
    <li
      className={clsx(
        "group w-full rounded-lg transition duration-75 hover:bg-cerulean-800 hover:shadow-md",
        active === pathName && "bg-cerulean-800",
      )}
    >
      <Link
        href={urlPath}
        className={clsx(
          "flex h-10 items-center justify-start gap-3 px-3 group-hover:text-gray-200",
          active === pathName ? "text-gray-200" : "text-gray-400",
        )}
        onClick={handleClick}
      >
        <span>
          {React.createElement(icon, {
            className: "h-[20px] w-[20px] text-cerulean-500",
          })}
        </span>
        {isOpen && title}
      </Link>
    </li>
  );
}
