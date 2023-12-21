import { useAppDispatch } from "@/lib/hooks";
import { setPetFormIsOpen } from "@/lib/redux/slices/form-slice";
import React from "react";
import { IoMdClose } from "react-icons/io";

export default function PetFormHeader() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between border-b border-cerulean-100/25 px-4 py-4 shadow-xl">
      <h1 className="text-xl text-cerulean-100">New Pet</h1>
      <button
        onClick={() => {
          dispatch(setPetFormIsOpen(false));
        }}
        type="button"
        className="cursor-pointer rounded-lg p-1 text-cerulean-100/50 hover:bg-cerulean-800 hover:text-cerulean-100 hover:shadow-md"
      >
        <IoMdClose className="h-5 w-5" />
      </button>
    </div>
  );
}
