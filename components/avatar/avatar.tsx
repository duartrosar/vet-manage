import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FaPaw } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

export default function Avatar({
  type,
  imageUrl,
  width,
  height,
}: {
  type: "pet" | "user";
  imageUrl?: string | null;
  width: number;
  height: number;
}) {
  const iconSize = Math.round(Math.min(width, height) * 0.4);
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-gray-300 dark:border-2 dark:border-cerulean-100/10 dark:bg-cerulean-950",
        `h-[${height}px] w-[${width}px]`,
      )}
    >
      {imageUrl ? (
        <Image
          className={`h-[${height}px] w-[${width}px] flex-none rounded-full`}
          src={imageUrl}
          width={width}
          height={height}
          alt="Profile picture"
        />
      ) : (
        <span
          className={`flex h-[${height}px] w-[${width}px] items-center justify-center rounded-full`}
        >
          {type === "pet" ? (
            <FaPaw
              className={`h-[${iconSize}px] w-[${iconSize}px] text-gray-500 dark:text-cerulean-500/50`}
            />
          ) : (
            <FaUser
              className={`h-[${iconSize}px] w-[${iconSize}px] text-gray-500 dark:text-cerulean-500/50`}
            />
          )}
        </span>
      )}
    </div>
  );
}
