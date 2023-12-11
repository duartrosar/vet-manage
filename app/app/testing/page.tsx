import OwnersList from "@/components/list/owner/list";
import { getOwners } from "@/lib/data";
import React from "react";

export default async function Testing() {
  const { owners } = await getOwners();
  return (
    <div>
      <OwnersList owners={owners} />
    </div>
  );
}
