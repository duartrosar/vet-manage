import Container from "@/components/container";
import FormStateProvider from "@/components/forms/context/form-provider";
import FormBase from "@/components/forms/form-base";
import OwnerForm from "@/components/forms/owner";
import { createOwner, getOwners } from "@/lib/data";
import { data } from "@/lib/mockup/mockup";
import { randomFill } from "crypto";
import Image from "next/image";
import Link from "next/link";
import List from "@/components/list";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { IoPencil, IoAdd, IoSearch, IoTrash } from "react-icons/io5";
import OwnersList from "@/components/list/owner/list";

export default async function OwnersHome() {
  const { owners } = await getOwners();

  return (
    <Container>
      <FormStateProvider>
        <OwnersList owners={owners} />
      </FormStateProvider>
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
