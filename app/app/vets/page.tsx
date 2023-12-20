import VetsList from "@/components/list/vet/vets-list";
import { getVets } from "@/lib/db";
import React from "react";

export default async function VetsHome() {
  const { vets } = await getVets();

  return <VetsList vets={vets} />;
}
