import React, { useRef, useState } from "react";
import DatePickerModal from "./modal";

export default function DatePickerContainer() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <label
        htmlFor="dateOfBirth"
        className="pl-3 text-sm font-bold text-gray-500"
      >
        Date Of Birth
      </label>
      <input
        name="dateOfBirth"
        type="date"
        className="w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 hidden"
      />
      <div
        id="toggler"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex min-h-[44px] cursor-pointer items-center justify-between rounded-lg  border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`}
      ></div>
      {dropdownOpen && <DatePickerModal />}
    </>
  );
}
