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
        "rounded-lg border-2 border-cerulean-700/25 bg-cerulean-900 shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
