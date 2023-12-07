"use client";

import { Owner } from "@prisma/client";
import React from "react";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";
import { IoPencil, IoTrash } from "react-icons/io5";
import { format } from "date-fns";
import { useAppDispatch } from "@/lib/hooks";
import { removeOwner } from "@/lib/redux/slices/owners-slice";
import { setFormIsOpen, setFormOwner } from "@/lib/redux/slices/form-slice";

export default function TrListItem({
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
    <tr
      className={`cursor-pointer bg-cerulean-800/25 px-4 shadow-xl hover:border-cerulean-800 hover:bg-cerulean-700/50 hover:outline-cerulean-800 ${
        index % 2 === 0 ? "bg-cerulean-800/25" : ""
      } ${index === ownersLength - 1 ? "" : ""}`}
    >
      <td className="h-20 w-14 border-b-2 border-cerulean-800/50 py-5 pl-2 pr-4">
        {owner.imageUrl ? (
          <Image
            className="flex-none rounded-full bg-cerulean-950"
            src={owner.imageUrl}
            width={50}
            height={50}
            alt="Profile picture"
          />
        ) : (
          <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
            <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
          </span>
        )}
      </td>
      <td className="border-b-2 border-cerulean-800/50">
        {owner.firstName} {owner.lastName}
        <span className="hidden text-sm text-cerulean-100/50 xs:block">
          {owner.email}
        </span>
      </td>
      <td className="hidden border-b-2 border-cerulean-800/50 sm:table-cell">
        {owner.mobileNumber}
      </td>
      <td className="hidden border-b-2 border-cerulean-800/50 md:table-cell">
        {format(owner.dateOfBirth, "dd/MM/yyyy")}
      </td>
      <td className="hidden border-b-2 border-cerulean-800/50 lg:table-cell">
        {owner.gender}
      </td>
      <td className=" border-b-2 border-cerulean-800/50">
        <span className="flex max-w-xs flex-row justify-end gap-2 pr-2">
          <button
            onClick={() => {
              dispatch(setFormIsOpen(true));
              dispatch(setFormOwner(owner));
            }}
            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 sm:px-3 sm:py-2 "
          >
            <IoPencil className="h-[20px] w-[20px]" />
            <span className="hidden 2xl:block">Edit owner</span>
          </button>
          <button
            onClick={() => {
              dispatch(removeOwner(index));
            }}
            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 sm:px-3 sm:py-2 "
          >
            <IoTrash className="h-[20px] w-[20px]" />
            <span className="hidden 2xl:block">Delete owner</span>
          </button>
        </span>
      </td>
    </tr>
  );
}
