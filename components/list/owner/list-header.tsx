"use client";

import React from "react";
import SearchInput from "../search-input";
import OwnerForm from "@/components/forms/owner/owner-form";
import Form from "@/components/forms";
import { useAppDispatch } from "@/lib/hooks";
import { ownerSearchSlice } from "@/lib/redux/slices/owners-slice";
import DeleteForm from "@/components/forms/delete-form";

export default function OwnerListHeader() {
  const dispatch = useAppDispatch();
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const text = event.target.value;
    dispatch(ownerSearchSlice(text));
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
          <DeleteForm />
        </div>
      </div>
    </div>
  );
}
