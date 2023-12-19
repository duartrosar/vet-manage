"use client";

import { Owner } from "@prisma/client";
import React, { useRef, useState, useEffect } from "react";
import OwnerListHeader from "./list-header";
import TableRow from "../../table/table-row";
import { useDispatch } from "react-redux";
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
import { removeOwnerSlice } from "@/lib/redux/slices/owners-slice";
import { setFormIsOpen, setFormOwner } from "@/lib/redux/slices/form-slice";
import { propertiesOf } from "@/lib/utils";

export default function OwnersList({ owners }: { owners?: Owner[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const currentOwners = useAppSelector((state) => state.owners.owners);
  const dispatch = useAppDispatch();

  return (
    <>
      <OwnerListHeader />
      <div className="flex h-full flex-col">
        <div className="relative h-full w-full pt-[30px]" ref={ref}>
          <div
            className={`overflow-auto-y ${
              currentOwners.length === 0 ? "" : ""
            }`}
          >
            <div className="rounded-b-xl border-x border-b border-cerulean-800/50 bg-cerulean-950 pb-11">
              <Table>
                <TableHead
                  headers={[
                    "",
                    "Name",
                    "Phone Number",
                    "Date Of Birth",
                    "Gender",
                    "",
                  ]}
                />
                <TableBody>
                  {currentOwners?.map((owner, index) => (
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
                      <TableData>{owner.mobileNumber}</TableData>
                      <TableData>
                        {owner.dateOfBirth
                          ? format(owner.dateOfBirth, "dd/MM/yyyy")
                          : "N/A"}
                      </TableData>
                      <TableData>{owner.gender}</TableData>
                      <TableData>
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
                              dispatch(removeOwnerSlice(index));
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
