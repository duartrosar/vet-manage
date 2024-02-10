import Owners from "@/components/list/owner/owners";
import OwnersListHeader from "@/components/list/owner/owners-list-header";
import { Suspense } from "react";
import ListSkeleton from "@/components/list/list-skeleton";
import RoleGate from "@/components/auth/role-gate";

export default function OwnersHome() {
  return (
    <RoleGate rolesAllowed={["ADMIN", "EMPLOYEE"]}>
      <OwnersListHeader />
      <Suspense fallback={<ListSkeleton />}>
        <Owners />
      </Suspense>
    </RoleGate>
  );
}
