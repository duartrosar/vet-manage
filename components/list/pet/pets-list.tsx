"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPets } from "@/lib/redux/slices/pets-slice";
import { TableHeading } from "@/lib/types";
import { Pet } from "@prisma/client";
import Image from "next/image";
import React, { useEffect } from "react";
import PetsListheader from "./pets-list-header";
import Table from "@/components/table";
import TableHead from "@/components/table/table-head";
import TableBody from "@/components/table/table-body";
import TableRow from "@/components/table/table-row";
import TableData from "@/components/table/table-data";
import { FaUser } from "react-icons/fa6";
import {
  setDeleteFormIsOpen,
  setFormPet,
  setPetFormIsOpen,
} from "@/lib/redux/slices/form-slice";
import { IoPaw, IoPencil, IoTrash } from "react-icons/io5";

export default function PetsList({ pets }: { pets: Pet[] }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pets) {
      dispatch(setPets(pets));
    }
  }, []);

  const currentPets = useAppSelector((state) => state.pets.pets);
  const searchParams = useAppSelector((state) => state.pets.searchParams);
  const filteredPets = currentPets.filter((pet) => {
    // pet.firstName.toLowerCase().includes(searchParams.toLowerCase());
    const searchTerm = searchParams.toLowerCase().split(" ");

    return searchTerm.every((searchTerm) =>
      Object.values(pet).some((value) => {
        return (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm)
        );
      }),
    );
  });

  const headers: TableHeading[] = [
    { title: "", display: "" },
    { title: "Name", display: "" },
    { title: "Type", display: "hidden md:table-cell" },
    { title: "", display: "" },
  ];

  return (
    <>
      <PetsListheader />
      <div className="flex h-full flex-col">
        <div className="relative h-full w-full pt-[30px]">
          <div className={`overflow-auto-y`}>
            <div className="rounded-b-xl border-x border-b border-cerulean-800/50 bg-cerulean-950 pb-11">
              <Table>
                <TableHead headers={headers} />
                <TableBody>
                  {filteredPets?.map((pet, index) => (
                    <TableRow key={index}>
                      <TableData className="pl-6">
                        {pet?.imageUrl ? (
                          <Image
                            className="flex-none rounded-full bg-cerulean-950"
                            src={pet?.imageUrl}
                            width={50}
                            height={50}
                            alt="Profile picture"
                          />
                        ) : (
                          <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
                            <IoPaw className="h-[30px] w-[30px] text-cerulean-500/50" />
                          </span>
                        )}
                      </TableData>
                      <TableData>{pet.name}</TableData>
                      <TableData className="hidden md:table-cell">
                        {pet.type}
                      </TableData>
                      {/* <TableData className="hidden xl:table-cell">
                        {pet.gender}
                      </TableData> */}
                      <TableData>
                        <span className="flex max-w-xs flex-row justify-end gap-2 pr-2">
                          <button
                            onClick={() => {
                              dispatch(setPetFormIsOpen(true));
                              dispatch(setFormPet(pet));
                            }}
                            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 sm:px-3 sm:py-2 "
                          >
                            <IoPencil className="h-[20px] w-[20px]" />
                            <span className="hidden 2xl:block">Edit pet</span>
                          </button>
                          <button
                            onClick={() => {
                              dispatch(setDeleteFormIsOpen(true));
                              dispatch(setFormPet(pet));
                            }}
                            className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 sm:px-3 sm:py-2 "
                          >
                            <IoTrash className="h-[20px] w-[20px]" />
                            <span className="hidden 2xl:block">Delete pet</span>
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
