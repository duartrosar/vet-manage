import SideBar from "@/components/sidebar";
import Providers from "@/components/sidebar/provider";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Providers>
        <SideBar />
        {children}
      </Providers>
    </div>
  );
}
