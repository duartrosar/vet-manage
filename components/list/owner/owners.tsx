import { getOwners } from "@/lib/db/actions/owner-actions";
import React from "react";
import OwnersList from "./owners-list";

export default async function Owners() {
  const { owners } = await getOwners();

  // TODO: Remove this line this is just for testing
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return <OwnersList owners={owners} />;
}
