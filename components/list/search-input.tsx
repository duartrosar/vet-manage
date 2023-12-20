"use client";

import { useAppDispatch } from "@/lib/hooks";
import { ownerSearchSlice } from "@/lib/redux/slices/owners-slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchInput({
  handleSearch,
}: {
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex w-96 items-center rounded-lg border-2 border-cerulean-500/25 pl-2 shadow-md shadow-cerulean-950 hover:bg-cerulean-800">
      <IoSearch className="h-[18px] w-[18px] text-gray-500" />
      <input
        onChange={handleSearch}
        placeholder="Search"
        name="search"
        type="text"
        className="w-full rounded-lg bg-transparent px-3 py-2 font-semibold text-gray-200 placeholder:text-gray-500 autofill:!bg-transparent focus:outline-none"
      />
    </div>
  );
}
