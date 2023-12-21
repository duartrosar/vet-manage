"use client";

import { useAppDispatch } from "@/lib/hooks";
import { setOwnerFormIsOpen } from "@/lib/redux/slices/form-slice";
import React from "react";
import { IoMdClose } from "react-icons/io";
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
  const dispatch = useAppDispatch();
  return (
    <div className="w-full max-w-6xl rounded-lg border-2 border-cerulean-100/25 bg-cerulean-950 shadow-lg">
      {type === "owner" && <OwnerFormHeader />}
      {type === "vet" && <VetFormHeader />}
      {type === "pet" && <PetFormHeader />}
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
