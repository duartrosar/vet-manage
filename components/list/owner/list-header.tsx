"use client";

import React from "react";
import SearchInput from "../search-input";
import OwnerForm from "@/components/forms/owner";
import Form from "@/components/forms";
import { useAppDispatch } from "@/lib/hooks";
import { ownerSearch } from "@/lib/redux/slices/owners-slice";

export default function OwnerListHeader() {
  const dispatch = useAppDispatch();
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const text = event.target.value;
    dispatch(ownerSearch(text));
  }

  return (
    <div className="bg-cerulean-950 px-6 pt-[34px]">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-right text-2xl text-white">Owners</h1>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SearchInput handleSearch={handleSearch} />
          <Form type="owner" />
        </div>
      </div>
    </div>
  );
}
