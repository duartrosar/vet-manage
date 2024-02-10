import RoleGate from "@/components/auth/role-gate";
import ListSkeleton from "@/components/list/list-skeleton";
import Pets from "@/components/list/pet/pets";
import PetsListheader from "@/components/list/pet/pets-list-header";
import React, { Suspense } from "react";

export default function PetsHome() {
  return (
    <>
      <RoleGate rolesAllowed={["ADMIN", "EMPLOYEE"]}>
        <PetsListheader />
        <Suspense fallback={<ListSkeleton />}>
          <Pets />
        </Suspense>
      </RoleGate>
    </>
  );
}
