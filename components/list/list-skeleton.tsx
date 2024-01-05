import Table from "@/components/table";
import TableBody from "@/components/table/table-body";
import TableData from "@/components/table/table-data";
import TableHead from "@/components/table/table-head";
import TableRow from "@/components/table/table-row";
import { TableHeading } from "@/lib/types";
import clsx from "clsx";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoPencil, IoTrash } from "react-icons/io5";

export default function ListSkeleton() {
  const headers: TableHeading[] = [
    { title: "", display: "" },
    { title: "Name", display: "" },
    { title: "Phone Number", display: "hidden md:table-cell" },
    { title: "Date Of Birth", display: "hidden lg:table-cell" },
    { title: "Gender", display: "hidden xl:table-cell" },
    { title: "", display: "" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="relative h-full w-full pt-[30px]">
        <div className={`overflow-auto-y`}>
          <div className="rounded-b-xl border-x border-b border-cerulean-800/50 bg-cerulean-950 pb-11">
            <Table>
              <thead className=" text-gray-500">
                <tr className="">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className={clsx(
                        "sticky top-0 h-20 border-y-2 border-cerulean-800/50 bg-cerulean-900 py-4 text-left shadow-xl",
                        header.display,
                      )}
                    >
                      <span className="w-full animate-pulse rounded-lg bg-cerulean-700/25 text-transparent">
                        {header.title}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <TableBody>
                {[1, 2, 3, 4].map((index) => (
                  <tr className="bg-cerulean-800/25 px-8 shadow-xl" key={index}>
                    <TableData className="animate-pulse pl-6">
                      <span className="flex h-[50px] w-[50px] animate-pulse items-center justify-center rounded-full bg-cerulean-700/25">
                        {/* <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" /> */}
                      </span>
                    </TableData>
                    <TableData className="text-transparent">
                      <span className="animate-pulse rounded-lg bg-cerulean-700/25">
                        firstName lastName
                      </span>
                      <span className="hidden animate-pulse rounded-lg bg-cerulean-700/25 text-sm xs:block">
                        fakeemail@email.com
                      </span>
                    </TableData>
                    <TableData className="hidden text-transparent md:table-cell ">
                      <span className="w-full animate-pulse rounded-lg bg-cerulean-700/25">
                        +0000000000000
                      </span>
                    </TableData>
                    <TableData className="hidden text-transparent lg:table-cell">
                      <span className="animate-pulse rounded-lg bg-cerulean-700/25">
                        dd/mm/yyy
                      </span>
                    </TableData>
                    <TableData className="hidden text-transparent xl:table-cell">
                      <span className="animate-pulse rounded-lg bg-cerulean-700/25">
                        Male
                      </span>
                    </TableData>
                    <TableData>
                      <span className="flex max-w-xs flex-row justify-end gap-2 pr-2">
                        <button className="text-xm flex animate-pulse items-center justify-start gap-2 rounded-lg bg-cerulean-700/25 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition sm:px-3 sm:py-2">
                          <IoPencil className="h-[20px] w-[20px] text-transparent" />
                          <span className="hidden text-transparent 2xl:block">
                            Edit owner
                          </span>
                        </button>
                        <button className="text-xm flex animate-pulse items-center justify-start gap-2 rounded-lg bg-cerulean-700/25 px-2 py-1 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition sm:px-3 sm:py-2">
                          <IoTrash className="h-[20px] w-[20px] text-transparent" />
                          <span className="hidden text-transparent 2xl:block">
                            Delete owner
                          </span>
                        </button>
                      </span>
                    </TableData>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
