import React from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchInput() {
  return (
    <div className="flex items-center rounded-lg border-2 border-cerulean-500/25 pl-2 shadow-md shadow-cerulean-950 hover:bg-cerulean-800">
      <IoSearch className="h-[20px] w-[20px] text-gray-500" />
      <input
        //   onChange={handleSearch}
        placeholder="Search"
        name="search"
        type="text"
        className="w-full rounded-lg bg-transparent px-3 py-3 font-semibold text-gray-200 placeholder:text-gray-500 autofill:!bg-transparent focus:outline-none"
      />
    </div>
  );
}
