"use client";

import React from "react";
import SearchInput from "../search-input";
import OwnerForm from "@/components/forms/owner";

export default function OwnerListHeader() {
  return (
    <div className="px-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-right text-2xl text-white">Owners</h1>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SearchInput />
          <OwnerForm />
        </div>
        {/* <div className="rounded-t-lg border border-cerulean-800/50 bg-cerulean-800/50 py-2 pl-6 pr-4 pt-4 shadow-xl">
          <div className="flex w-full items-center justify-between gap-5 lg:gap-10">
            <div className="min-w-[50px]"></div>
            <div className="w-28 text-base font-semibold text-gray-500 sm:w-48">
              Name
            </div>
            <div className="hidden w-32 text-base font-semibold text-gray-500 sm:block md:w-48">
              Phone Number
            </div>
            <div className="hidden w-48 text-base font-semibold text-gray-500 lg:block">
              Date of birth
            </div>
            <div className="pointer-events-none w-9 select-none text-start text-base font-semibold text-gray-500 text-transparent xs:w-32 2xl:w-72">
              hello
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
