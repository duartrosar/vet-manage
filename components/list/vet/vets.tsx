import { getVets } from "@/lib/db/actions";
import React from "react";
import VetsList from "./vets-list";

export default async function Vets() {
  const { vets } = await getVets();

  // TODO: Remove this line this is just for testing
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return <VetsList vets={vets} />;
}
