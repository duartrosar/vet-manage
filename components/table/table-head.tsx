import { TableHeading } from "@/lib/types";
import clsx from "clsx";
import React from "react";

export default function TableHead({ headers }: { headers: TableHeading[] }) {
  return (
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
            {header.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
