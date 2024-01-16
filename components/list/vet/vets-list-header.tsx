"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { vetSearchSlice } from "@/lib/redux/slices/vets-slice";
import React from "react";
import SearchInput from "../search-input";
import DeleteForm from "@/components/forms/delete-form";
import VetFormModal from "@/components/forms/vet/vet-modal";

export default function VetsListHeader() {
  const dispatch = useAppDispatch();

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const text = event.target.value;

    dispatch(vetSearchSlice(text));
  }

  return (
    <div className="bg-cerulean-950 px-6 pt-[34px]">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-right text-2xl text-white">Vets</h1>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SearchInput handleSearch={handleSearch} />
          <VetFormModal />
          <DeleteForm type="vet" />
        </div>
      </div>
    </div>
  );
}
