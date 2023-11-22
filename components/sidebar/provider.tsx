"use client";

import React, { useEffect, useState } from "react";
import SidebarContext from "./context";

export default function Providers({ children }: { children: React.ReactNode }) {
  // TODO: Fix this. At the moment it's always gonna be true at first load
  // beacause the value gets changed in local storage before it gets upadted in
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Read from localStorage and set the initial state
    const sidebarExpanded = localStorage.getItem("sidebarExpanded");
    setSidebarOpen(sidebarExpanded === "true");
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isOpen: sidebarOpen, setIsOpen: setSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
