import React from "react";

export default function DateSelector() {
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
        className="w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
      />
    </>
  );
}
