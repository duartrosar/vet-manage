import Container from "@/components/container";
import Link from "next/link";
import React from "react";
import { IoPencil, IoPersonAdd, IoTrash } from "react-icons/io5";

export default function OwnersHome() {
  return (
    <Container>
      <div className="p-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/app/owners/create"
            className="flex items-center justify-start gap-2 px-3 py-2 transition rounded-lg shadow-md shadow-cerulean-950 hover:scale-105 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600"
          >
            <IoPersonAdd className="h-[20px] w-[20px] text-cerulean-400" />
            {/* New */}
          </Link>
          <h1 className="text-2xl text-right text-gray-500">Owners</h1>
        </div>
        <div className="flex items-center pl-1 rounded-lg shadow-md border-cerulean-500/25 shadow-cerulean-950">
          <IoSearch className="h-[20px] w-[20px] text-gray-500" />
          <input
            //   onChange={handleSearch}
            placeholder="Search"
            name="search"
            type="text"
            className="roundsed-lg hover:bg-cerulsean-800 w-full bg-transparent px-3 py-2 font-semibold text-gray-200 placeholder:text-gray-500 autofill:!bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="w-full rounded-2xl">
        <table className="w-full border-spacing-0">
          <thead>
            <tr className="bg-cerulean-600/25">
              <th className="px-4 py-3 text-left text-gray-500">Name</th>
              <th className="px-4 text-left text-gray-500">Phone Number</th>
              <th className="px-4 text-left text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr
                key={index}
                className={`border-b-2 border-cerulean-700/50 hover:bg-cerulean-700 ${
                  index % 2 === 0 ? "bg-cerulean-800/25" : ""
                }`}
              >
                <td className="px-4 py-4">
                  {owner.firstName} {owner.lastName}
                </td>
                <td className="px-4 py-4 text-gray-400">
                  {owner.mobileNumber}
                </td>
                <td className="h-full w-[20px] items-center justify-center px-4 py-4">
                  <div className="flex gap-2">
                    <Link href={`/owners/edit/${owner.id}`} target="_blank">
                      <IoPencil className="h-[20px] w-[20px] text-cerulean-500" />
                    </Link>
                    <Link href={`/owners/edit/${owner.id}`} target="_blank">
                      <IoTrash className="h-[20px] w-[20px] text-cerulean-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
