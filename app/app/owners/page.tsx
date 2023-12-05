import Container from "@/components/container";
import FormStateProvider from "@/components/forms/context/form-provider";
import FormBase from "@/components/forms/form-base";
import OwnerForm from "@/components/forms/owner";
import EntitiesList from "@/components/users/entities-list";
import { createOwner, getOwners } from "@/lib/data";
import { data } from "@/lib/mockup/mockup";
import { randomFill } from "crypto";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { IoPencil, IoAdd, IoSearch, IoTrash } from "react-icons/io5";

export default async function OwnersHome() {
  const { owners } = await getOwners();
  return (
    <Container>
      <Suspense fallback={<div></div>}>
        <FormStateProvider>
          <div className="px-6">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-right text-2xl text-white">Owners</h1>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-lg border-2 border-cerulean-500/25 pl-2 shadow-md shadow-cerulean-950 hover:bg-cerulean-800">
                  <IoSearch className="h-[20px] w-[20px] text-gray-500" />
                  <input
                    //   onChange={handleSearch}
                    placeholder="Search"
                    name="search"
                    type="text"
                    className="w-full rounded-lg bg-transparent px-3 py-3 font-semibold text-gray-200 placeholder:text-gray-500 autofill:!bg-transparent focus:outline-none"
                  />
                </div>
                <FormBase type="owner" />
              </div>
              <div className="rounded-t-lg border border-cerulean-800/50 bg-cerulean-800/50 py-2 pl-6 pr-4 pt-4 shadow-xl">
                <div className="flex w-full items-center justify-between gap-10">
                  <div className="w-[50px]"></div>
                  <div className="w-48 flex-none text-base font-semibold text-gray-500">
                    Name
                  </div>
                  <div className="hidden w-48 flex-none text-base font-semibold text-gray-500 md:block">
                    Phone Number
                  </div>
                  <div className="hidden w-48 flex-none text-base font-semibold text-gray-500 md:flex">
                    Date of birth
                  </div>
                  <div className="hidden w-72 flex-none text-start text-base font-semibold text-gray-500 md:flex">
                    Action
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col">
            <EntitiesList owners={owners} />
          </div>
        </FormStateProvider>
      </Suspense>
    </Container>
  );
}

{
  /* <table className="w-full border-spacing-0">
          <thead>
            <tr className="bg-cerulean-600/25">
              <th className="px-4 py-3 text-left text-gray-500"></th>
              <th className="px-4 py-3 text-left text-gray-500">Name</th>
              <th className="px-4 text-left text-gray-500">Phone Number</th>
              <th className="px-4 text-left text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr
                key={owner.id}
                className={`border-b-2 text-cerulean-100 border-cerulean-700/50 hover:bg-cerulean-700 ${
                  index % 2 === 0 ? "bg-cerulean-800/25" : ""
                }`}
              >
                <td className="px-4 py-4">
                  <div className="">
                    <Image
                      className="rounded-full"
                      src={owner.imageurl}
                      width={50}
                      height={50}
                      alt="Profile picture"
                    />
                  </div>
                </td>
                <td className="px-4 py-4">{owner.name}</td>
                <td className="px-4 py-4 text-gray-400">{owner.phoneNumber}</td>
                <td className="h-full w-[20px] items-center justify-center px-4 py-4">
                  <div className="flex gap-2">
                    <Link href={`/owners/edit/{owner.id}`} target="_blank">
                      <IoPencil className="h-[20px] w-[20px] text-cerulean-500" />
                    </Link>
                    <Link href={`/owners/edit/{owner.id`} target="_blank">
                      <IoTrash className="h-[20px] w-[20px] text-cerulean-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */
}
