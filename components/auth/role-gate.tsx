import { checkRoles, getSessionRoles } from "@/lib/auth/session-helpers";
import React from "react";

export default async function RoleGate({
  children,
  rolesAllowed,
}: {
  children: React.ReactNode;
  rolesAllowed: ("ADMIN" | "VET" | "OWNER")[];
}) {
  const roles = await getSessionRoles();

  if (!roles) {
    // TODO: return unauthenticated error page
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-7xl text-white">unauthenticated</h1>
      </div>
    );
  }

  const isAllowed = checkRoles(rolesAllowed, roles);

  if (!isAllowed) {
    // TODO: return unauthorized error page
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-7xl text-white">unauthorized</h1>
      </div>
    );
  }

  return <>{children}</>;
}
