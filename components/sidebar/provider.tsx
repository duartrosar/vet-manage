"use client";

import React, { useState } from "react";
import SidebarContext from "./context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const toggleSidebar: React.Dispatch<React.SetStateAction<boolean>> =
    setSideBarOpen;

  return (
    <SidebarContext.Provider
      value={{ isOpen: sidebarOpen, setIsOpen: toggleSidebar }}
    >
      <div
        className={`transition ${sidebarOpen ? "lg:pl-[280px]" : "lg:pl-6"}`}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
