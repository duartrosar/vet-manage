import clsx from "clsx";
import React from "react";
import { FaUser } from "react-icons/fa6";

interface TdItemProps {
  type: "text" | "image" | "date" | "profile";
}

export default function TdItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={clsx(
        "h-20 w-14 border-b-2 border-cerulean-800/50 py-5 pr-4",
        className,
      )}
    >
      {children}
    </td>
  );
}
