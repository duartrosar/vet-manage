import { getOwnersAmount } from "@/lib/db/actions/owner-actions";
import { getPetsAmount } from "@/lib/db/actions/pet-actions";
import { getVetsAmount } from "@/lib/db/actions/vet-actions";
import React from "react";
import DashboardEntitiesDisplay from "./dashboard-entities-display";

interface EntitiesAmountProps {
  type: "owner" | "vet" | "pet";
  title: string;
}

const amountFunctions = {
  owner: getOwnersAmount,
  vet: getVetsAmount,
  pet: getPetsAmount,
};

const urlPaths = {
  owner: "/app/owners",
  vet: "/app/vets",
  pet: "/app/pets",
};

export default async function DashBoardEntitiesAmount({
  type,
  title,
}: EntitiesAmountProps) {
  const fetchAmount = amountFunctions[type];

  const { amount } = await fetchAmount();

  if (amount) {
    return (
      <DashboardEntitiesDisplay
        amount={amount}
        title={title}
        urlPath={urlPaths[type]}
      />
    );
  }

  return (
    <div className="text-xl text-white">There are no {title} at the moment</div>
  );
}
