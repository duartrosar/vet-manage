import ContainerSkeleton from "@/components/container-skeleton";
import SideBar from "@/components/sidebar";
import { Providers } from "@/components/providers";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar";
import Container from "@/components/container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navbar />
      <div className="flex h-screen w-screen overflow-hidden bg-cerulean-950">
        <SideBar />
        <Container>{children}</Container>
      </div>
    </Providers>
  );
}
