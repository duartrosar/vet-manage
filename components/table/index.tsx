import React from "react";
import TableHead from "./table-head";

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="relative w-full table-auto border-separate border-spacing-0 text-sm">
      {children}
    </table>
  );
}
