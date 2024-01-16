import { getPets } from "@/lib/db/actions/pet-actions";
import React from "react";
import PetsList from "./pets-list";

export default async function Pets() {
  const { pets } = await getPets();

  // TODO: Remove this line this is just for testing
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return <PetsList pets={pets} />;
}
