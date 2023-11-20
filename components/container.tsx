import React from "react";
import SidebarProvider from "./sidebar/provider";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen items-center justify-center pt-20 lg:pb-6 lg:pr-6 lg:pt-[104px]">
        <div className="w-full h-full font-bold bg-cerulean-900 lg:rounded-lg lg:border-2 lg:border-cerulean-800/25 overflow-y-scroll p-4">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
