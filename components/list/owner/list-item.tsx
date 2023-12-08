"use client";

import { Owner } from "@prisma/client";
import React from "react";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";
import { IoPencil, IoTrash } from "react-icons/io5";
import { format } from "date-fns";
import { useAppDispatch } from "@/lib/hooks";
import { removeOwnerSlice } from "@/lib/redux/slices/owners-slice";

export default function ListItem({
  index,
  owner,
  ownersLength,
}: {
  index: number;
  owner: Owner;
  ownersLength: number;
}) {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`cursor-pointer border-x-2 border-b-2 border-cerulean-800/50 px-4 py-2 shadow-xl hover:border-cerulean-800 hover:bg-cerulean-700/50 hover:outline-cerulean-800 ${
        index % 2 === 0 ? "bg-cerulean-800/25" : "bg-cerulean-950"
      } ${index === 0 ? "rounded-t-xl border-t-2" : ""} ${
        index === ownersLength - 1 ? "rounded-b-xl" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between gap-5 py-2 lg:gap-10">
        <div className="flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full border-2 border-cerulean-800/50">
          {owner.imageUrl ? (
            <Image
              className="flex-none rounded-full"
              src={owner.imageUrl}
              width={50}
              height={50}
              alt="Profile picture"
            />
          ) : (
            <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
          )}
        </div>

        <div className="flex w-28 flex-none flex-col text-base font-normal text-white sm:w-48">
          {owner.firstName} {owner.lastName}
          <span className="hidden text-sm text-cerulean-100/50 xs:block">
            {owner.email}
          </span>
        </div>
        <div className="hidden w-32 flex-none text-base font-normal text-white sm:block md:w-48">
          {owner.mobileNumber}
        </div>
        <div className="hidden w-48 flex-none text-base font-normal text-white lg:block">
          {format(owner.dateOfBirth, "dd/MM/yyyy")}
        </div>
        <div className="flex w-9 flex-col justify-end gap-2 xs:w-32 xs:flex-row 2xl:w-72">
          <button
            onClick={() => {}}
            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 sm:px-3 sm:py-2 "
          >
            <IoPencil className="h-[20px] w-[20px]" />
            <span className="hidden 2xl:block">Edit owner</span>
          </button>
          <button
            onClick={() => {
              dispatch(removeOwnerSlice(index));
            }}
            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 sm:px-3 sm:py-2 "
          >
            <IoTrash className="h-[20px] w-[20px]" />
            <span className="hidden 2xl:block">Delete owner</span>
          </button>
        </div>
      </div>
    </div>
  );
}
