import clsx from "clsx";
import React from "react";

interface TdItemProps {
  type: "text" | "image" | "date" | "profile";
}

export default function TableData({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={clsx(
        "h-20 border-b-2 border-cerulean-800/50 py-5 pr-4",
        className,
      )}
    >
      {children}
    </td>
  );
}
