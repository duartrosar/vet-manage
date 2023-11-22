import SideBar from "@/components/sidebar";
import Providers from "@/components/sidebar/provider";
import React, { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <SideBar />
      {children}
    </Providers>
  );
}
