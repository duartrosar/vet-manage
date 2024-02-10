import RoleGate from "@/components/auth/role-gate";
import ListSkeleton from "@/components/list/list-skeleton";
import Vets from "@/components/list/vet/vets";
import VetsListHeader from "@/components/list/vet/vets-list-header";
import { Suspense } from "react";

export default function VetsHome() {
  return (
    <>
      <RoleGate rolesAllowed={["ADMIN", "EMPLOYEE"]}>
        <VetsListHeader />
        <Suspense fallback={<ListSkeleton />}>
          <Vets />
        </Suspense>
      </RoleGate>
    </>
  );
}
