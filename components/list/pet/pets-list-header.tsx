"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { petSearchSlice } from "@/lib/redux/slices/pets-slice";
import React from "react";
import SearchInput from "../search-input";
import DeleteForm from "@/components/forms/delete-form";
import PetFormModal from "@/components/forms/pet/pet-modal";

export default function PetsListheader() {
  const dispatch = useAppDispatch();
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const text = event.target.value;
    dispatch(petSearchSlice(text));
  }
  return (
    <div className="bg-cerulean-950 px-6 pt-[34px]">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-right text-2xl text-white">Pets</h1>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SearchInput handleSearch={handleSearch} />
          <PetFormModal />
          <DeleteForm type="pet" />
        </div>
      </div>
    </div>
  );
}
