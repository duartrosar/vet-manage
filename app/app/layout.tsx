import SideBar from "@/components/sidebar/sidebar";
import { Providers } from "@/components/providers";
import React from "react";
import Navbar from "@/components/navbar";
import Container from "@/components/container";
import { getSessionRoles } from "@/lib/auth/session-helpers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roles = await getSessionRoles();

  if (!roles) {
    //TODO: Some error page
    return <></>;
  }

  return (
    <Providers>
      <Navbar />
      <div
        className={`${inter.className} flex h-screen w-screen bg-white dark:bg-cerulean-950`}
      >
        <SideBar roles={roles} />
        <Container>{children}</Container>
      </div>
    </Providers>
  );
}
