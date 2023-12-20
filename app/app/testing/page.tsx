import OwnersList from "@/components/list/owner/owners-list";
import { getOwners } from "@/lib/db";
import React from "react";

export default async function Testing() {
  const { owners } = await getOwners();
  return (
    <div>
      <OwnersList owners={owners} />
    </div>
  );
}
