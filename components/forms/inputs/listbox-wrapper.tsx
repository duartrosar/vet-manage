"use client";

import { Combobox, Listbox } from "@headlessui/react";
import { Owner } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import Image from "next/image";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { HiChevronUpDown } from "react-icons/hi2";
import { FieldError } from "react-hook-form";

export default function ListboxWrapper({
  owners,
  onChange,
  value,
  error,
}: {
  owners: Owner[];
  onChange: any;
  value: number;
  error: FieldError | undefined;
}) {
  const [owner, setOwner] = useState<Owner>(owners[0]);
  const [index, setSelectedIndex] = useState<number>(0);
  const [ownerName, setOwnerName] = useState<string>("");
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   // const ownerName = `${owners[index].firstName} ${owners[index].lastName}`;
  //   // setOwnerName(ownerName);
  //   console.log(selectedOwner);
  // }, [selectedOwner]);

  const filteredOwners = owners.filter((owner) => {
    // owner.firstName.toLowerCase().includes(searchParams.toLowerCase());
    const searchTerm = query.toLowerCase().split(" ");

    return searchTerm.every((searchTerm) =>
      Object.values(owner).some((value) => {
        return (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm)
        );
      }),
    );
  });

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="pl-3 text-sm font-bold text-gray-500">Owner</label>
        <Combobox value={value} onChange={onChange}>
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg border-2 border-cerulean-100/25 bg-transparent font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600">
              <Combobox.Input
                placeholder="Select an owner"
                className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-gray-200 focus:ring-0"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(selectedOwner: number) => {
                  const owner = owners.find(
                    (owner) => owner.id === selectedOwner,
                  );

                  return `${owner?.firstName} ${owner?.lastName}`;
                }}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 pr-2">
                <div className="flex items-center justify-between">
                  <HiChevronUpDown />
                </div>
              </Combobox.Button>
            </div>
            <Combobox.Options className="absolute top-12 z-10 w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 px-2 py-2 text-sm">
              {filteredOwners.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-200">
                  No owners were found.
                </div>
              ) : (
                filteredOwners?.map((owner) => (
                  <Combobox.Option
                    key={owner.id}
                    value={owner.id}
                    className="cursor-pointer rounded-lg px-3 py-2 transition hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md "
                  >
                    <div className="flex items-center gap-3">
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
                      {owners && (
                        <span className=" text-gray-400">
                          {owner.firstName} {owner.lastName}
                        </span>
                      )}
                    </div>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
        {error && (
          <span className="text-right text-xs font-bold text-red-500">
            {error.message}
          </span>
        )}
      </div>
    </>
  );
}
