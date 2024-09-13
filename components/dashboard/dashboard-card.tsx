import clsx from "clsx";
import React from "react";

export default function DashBoardCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg border-2 border-cerulean-700/25 bg-gray-100 shadow-xl dark:bg-cerulean-900",
        className,
      )}
    >
      {children}
    </div>
  );
}
