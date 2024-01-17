"use client";

import React from "react";
import OwnerFormHeader from "./owner/owner-form-header";
import VetFormHeader from "./vet/vet-form-header";
import PetFormHeader from "./pet/pet-form-header";

export default function FormContainer({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "owner" | "vet" | "pet";
}) {
  return (
    <div className="h-screen max-h-screen w-screen max-w-5xl overflow-y-auto border-0 border-cerulean-100/25 bg-cerulean-950 py-12 shadow-lg md:h-full md:w-[90vw] md:overflow-y-hidden md:rounded-lg md:py-0 lg:border-2 landscape:overflow-y-scroll">
      {type === "owner" && <OwnerFormHeader />}
      {type === "vet" && <VetFormHeader />}
      {type === "pet" && <PetFormHeader />}
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
