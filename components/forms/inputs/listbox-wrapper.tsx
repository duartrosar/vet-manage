import { Combobox, Listbox } from "@headlessui/react";
import { Owner } from "@prisma/client";
import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";
import Image from "next/image";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { HiChevronUpDown } from "react-icons/hi2";

export default function ListboxWrapper({ owners }: { owners: Owner[] }) {
  const [index, setSelectedIndex] = useState<number>(0);
  const [query, setQuery] = useState("");

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
        <Combobox value={0} onChange={setSelectedIndex}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg border-2 border-cerulean-100/25 bg-transparent font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600">
              <Combobox.Input
                className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-gray-200 focus:ring-0"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 pr-2">
                <div className="flex items-center justify-between">
                  {/* <span className="flex items-center gap-3">
                  {owners[index] && owners[index]?.imageUrl ? (
                    <Image
                      className="flex-none rounded-full bg-cerulean-950"
                      src={owners[index]?.imageUrl}
                      width={50}
                      height={50}
                      alt="Profile picture"
                    />
                  ) : (
                    <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-cerulean-950">
                      <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
                    </span>
                  )}
                  {owners &&
                    `${owners[index].firstName} ${owners[index].lastName}`}
                </span> */}
                  <HiChevronUpDown />
                </div>
              </Combobox.Button>
            </div>
            <Combobox.Options className="absolute top-12 z-10 w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 px-2 py-2 text-sm">
              {filteredOwners?.map((owner) => (
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
              ))}
            </Combobox.Options>
          </div>
        </Combobox>
        {/* <input
          readOnly={readOnly}
          {...props}
          {...(register(inputId as Path<T>) as UseFormRegisterReturn)}
          className="rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 autofill:!bg-transparent hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
        />
        {error && (
          <span className="text-right text-xs font-bold text-red-500">
            {error.message}
          </span>
        )} */}
      </div>
    </>
  );
}
