import Owners from "@/components/list/owner/owners";
import OwnersListHeader from "@/components/list/owner/owners-list-header";
import { Suspense } from "react";
import ListSkeleton from "@/components/list/list-skeleton";

export default function OwnersHome() {
  return (
    <>
      <OwnersListHeader />
      <Suspense fallback={<ListSkeleton />}>
        <Owners />
      </Suspense>
    </>
  );
}
