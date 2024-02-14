import RoleGate from "@/components/auth/role-gate";
import React from "react";

export default function MyPetsPage() {
  return <RoleGate rolesAllowed={["OWNER"]}>MyPetsPage</RoleGate>;
}
