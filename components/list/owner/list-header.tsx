"use client";

import React from "react";
import SearchInput from "../search-input";
import OwnerForm from "@/components/forms/owner";
import Form from "@/components/forms";

export default function OwnerListHeader() {
  return (
    <div className="px-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-right text-2xl text-white">Owners</h1>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SearchInput />
          <Form type="owner" />
        </div>
      </div>
    </div>
  );
}
