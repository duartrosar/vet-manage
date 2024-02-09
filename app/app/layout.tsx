import SideBar from "@/components/sidebar/sidebar";
import { Providers } from "@/components/providers";
import React from "react";
import Navbar from "@/components/navbar";
import Container from "@/components/container";
import { getSessionRoles } from "@/lib/auth/session-helpers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roles = await getSessionRoles();

  if (!roles) {
    // Some error page
    return <></>;
  }

  return (
    <Providers>
      <Navbar />
      <div className="flex h-screen w-screen bg-cerulean-950">
        <SideBar roles={roles} />
        <Container>{children}</Container>
      </div>
    </Providers>
  );
}
