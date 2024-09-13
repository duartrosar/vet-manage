import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-gray-300 bg-white shadow-xl dark:border-2 dark:border-cerulean-700/25 dark:bg-cerulean-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "ml-2 text-lg font-medium tracking-wide text-gray-800 dark:text-gray-200",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export { Card, CardTitle };
