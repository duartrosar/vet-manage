import ContainerSkeleton from "@/components/container-skeleton";
import SideBar from "@/components/sidebar";
import { Providers } from "@/components/providers";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar";
import Container from "@/components/container";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navbar />
      <div className="flex h-screen w-screen overflow-hidden bg-cerulean-950">
        <Toaster
          closeButton
          expand
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "absolute right-0 z-[100]",
              closeButton: "fixed right-0 top-0",
            },
          }}
          duration={200000}
        />
        <SideBar />
        <Container>{children}</Container>
      </div>
    </Providers>
  );
}
