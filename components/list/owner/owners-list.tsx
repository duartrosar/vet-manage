"use client";

import { Owner } from "@prisma/client";
import React, { useRef, useEffect } from "react";
import TableRow from "../../table/table-row";
import { setOwners } from "@/lib/redux/slices/owners-slice";
import { useAppSelector } from "@/lib/hooks";
import TableHead from "../../table/table-head";
import Table from "@/components/table";
import TableBody from "@/components/table/table-body";
import TableData from "@/components/table/table-data";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";
import { IoPencil, IoTrash } from "react-icons/io5";
import { format } from "date-fns";
import { useAppDispatch } from "@/lib/hooks";
import {
  setDeleteFormIsOpen,
  setOwnerFormIsOpen,
  setFormOwner,
  setUserId,
} from "@/lib/redux/slices/form-slice";
import { TableHeading } from "@/lib/types";

export default function OwnersList({ owners }: { owners?: Owner[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (owners) {
      dispatch(setOwners(owners));
    }
  }, [dispatch, owners]);

  const currentOwners = useAppSelector((state) => state.owners.owners);
  const searchParams = useAppSelector((state) => state.owners.searchParams);
  const filteredOwners = currentOwners.filter((owner) => {
    // owner.firstName.toLowerCase().includes(searchParams.toLowerCase());
    const searchTerm = searchParams.toLowerCase().split(" ");

    return searchTerm.every((searchTerm) =>
      Object.values(owner).some((value) => {
        if (value instanceof Date) {
          // Convert date to string representation
          const dateString = format(value, "dd/MM/yyyy");
          console.log(dateString);
          return dateString.toLowerCase().includes(searchTerm);
        }

        return (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm)
        );
      }),
    );
  });

  // {
  //   "",
  //   "Name",
  //   "Phone Number",
  //   "Date Of Birth",
  //   "Gender",
  //   "",
  // }

  const headers: TableHeading[] = [
    { title: "", display: "" },
    { title: "Name", display: "" },
    { title: "Phone Number", display: "hidden md:table-cell" },
    { title: "Date Of Birth", display: "hidden lg:table-cell" },
    { title: "Gender", display: "hidden xl:table-cell" },
    { title: "", display: "" },
  ];

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="relative h-full w-full pt-[30px]" ref={ref}>
          <div className={`overflow-auto-y`}>
            <div className="rounded-b-xl border-x border-b border-cerulean-800/50 bg-cerulean-950 pb-11">
              <Table>
                <TableHead headers={headers} />
                <TableBody>
                  {filteredOwners?.map((owner, index) => (
                    <TableRow key={index}>
                      <TableData className="pl-6">
                        {owner?.imageUrl ? (
                          <Image
                            className="flex-none rounded-full bg-cerulean-950"
                            src={owner?.imageUrl}
                            width={50}
                            height={50}
                            alt="Profile picture"
                          />
                        ) : (
                          <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
                            <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
                          </span>
                        )}
                      </TableData>
                      <TableData>
                        {owner.firstName} {owner.lastName}
                        <span className="hidden text-sm text-cerulean-100/50 xs:block">
                          {owner.email}
                        </span>
                      </TableData>
                      <TableData className="hidden md:table-cell">
                        {owner.mobileNumber}
                      </TableData>
                      <TableData className="hidden lg:table-cell">
                        {owner.dateOfBirth
                          ? format(owner.dateOfBirth, "dd/MM/yyyy")
                          : "N/A"}
                      </TableData>
                      <TableData className="hidden xl:table-cell">
                        {owner.gender}
                      </TableData>
                      <TableData>
                        <span className="flex max-w-xs flex-row justify-end gap-2 pr-2">
                          <button
                            onClick={() => {
                              dispatch(setOwnerFormIsOpen(true));
                              dispatch(setFormOwner(owner));
                            }}
                            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 sm:px-3 sm:py-2 "
                          >
                            <IoPencil className="h-[20px] w-[20px]" />
                            <span className="hidden 2xl:block">Edit owner</span>
                          </button>
                          <button
                            onClick={() => {
                              dispatch(setDeleteFormIsOpen(true));
                              dispatch(setUserId(owner.userId));
                            }}
                            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 sm:px-3 sm:py-2 "
                          >
                            <IoTrash className="h-[20px] w-[20px]" />
                            <span className="hidden 2xl:block">
                              Delete owner
                            </span>
                          </button>
                        </span>
                      </TableData>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
