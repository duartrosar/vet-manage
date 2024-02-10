import RoleGate from "@/components/auth/role-gate";
import React from "react";

export default function MyPetsPage() {
  return <RoleGate rolesAllowed={["CUSTOMER"]}>MyPetsPage</RoleGate>;
}
