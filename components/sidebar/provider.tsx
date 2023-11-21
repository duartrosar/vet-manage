"use client";

import React, { useState } from "react";
import SidebarContext from "./context";
import { Transition } from "@headlessui/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar: React.Dispatch<React.SetStateAction<boolean>> =
    setSidebarOpen;

  return (
    <SidebarContext.Provider
      value={{ isOpen: sidebarOpen, setIsOpen: toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
