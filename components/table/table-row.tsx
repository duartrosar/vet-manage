"use client";

import React, { useEffect } from "react";

export default function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr
      className={`cursor-pointer bg-cerulean-800/25 px-8 shadow-xl hover:border-cerulean-800 hover:bg-cerulean-700/50 hover:outline-cerulean-800`}
    >
      {children}
    </tr>
  );
}
