"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setVets } from "@/lib/redux/slices/vets-slice";
import { Vet } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import React, { useEffect } from "react";
import VetsListHeader from "./vets-list-header";
import Table from "@/components/table";
import TableHead from "@/components/table/table-head";
import TableBody from "@/components/table/table-body";
import TableRow from "@/components/table/table-row";
import TableData from "@/components/table/table-data";
import { IoPencil, IoTrash } from "react-icons/io5";
import {
  setDeleteFormIsOpen,
  setUserId,
  setVetFormIsOpen,
} from "@/lib/redux/slices/form-slice";
import { FaUser } from "react-icons/fa6";

export default function VetsList({ vets }: { vets?: Vet[] }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vets) {
      dispatch(setVets(vets));
    }
  }, [dispatch, vets]);

  const currentVets = useAppSelector((state) => state.vets.vets);
  const searchParams = useAppSelector((state) => state.vets.searchParams);
  const filteredVets = currentVets.filter((vet) => {
    const searchTerm = searchParams.toLowerCase().split(" ");

    return searchTerm.every((searchTerm) =>
      Object.values(vet).some((value) => {
        if (value instanceof Date) {
          const dateString = format(value, "dd/MM/yyyy");

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

  function setFormvet(vet: {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    gender: string | null;
    email: string;
    mobileNumber: string | null;
    address: string | null;
    imageUrl: string | null;
    userId: number;
  }): any {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <VetsListHeader />
      <div className="flex h-full flex-col">
        <div className="relative h-full w-full pt-[30px]">
          <div className={`overflow-auto-y`}>
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
                  {filteredVets?.map((vet, index) => (
                    <TableRow key={index}>
                      <TableData className="pl-6">
                        {vet?.imageUrl ? (
                          <Image
                            className="flex-none rounded-full bg-cerulean-950"
                            src={vet?.imageUrl}
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
                        {vet.firstName} {vet.lastName}
                        <span className="hidden text-sm text-cerulean-100/50 xs:block">
                          {vet.email}
                        </span>
                      </TableData>
                      <TableData>{vet.mobileNumber}</TableData>
                      <TableData>
                        {vet.dateOfBirth
                          ? format(vet.dateOfBirth, "dd/MM/yyyy")
                          : "N/A"}
                      </TableData>
                      <TableData>{vet.gender}</TableData>
                      <TableData>
                        <span className="flex max-w-xs flex-row justify-end gap-2 pr-2">
                          <button
                            onClick={() => {
                              // TODO: Separate bewtween owner form and vet form
                              dispatch(setVetFormIsOpen(true));
                              dispatch(setFormvet(vet));
                            }}
                            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 sm:px-3 sm:py-2 "
                          >
                            <IoPencil className="h-[20px] w-[20px]" />
                            <span className="hidden 2xl:block">Edit vet</span>
                          </button>
                          <button
                            onClick={() => {
                              dispatch(setDeleteFormIsOpen(true));
                              dispatch(setUserId(vet.userId));
                            }}
                            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 sm:px-3 sm:py-2 "
                          >
                            <IoTrash className="h-[20px] w-[20px]" />
                            <span className="hidden 2xl:block">Delete vet</span>
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
