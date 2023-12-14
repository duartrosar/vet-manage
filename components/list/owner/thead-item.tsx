import React from "react";

export default function TheadItem({ headers }: { headers: string[] }) {
  return (
    <thead className=" text-gray-500">
      <tr className="">
        {headers.map((value, index) => (
          <th
            key={index}
            className="sticky top-0 h-20 border-y-2 border-cerulean-800/50 bg-cerulean-900 py-4 text-left shadow-xl"
          >
            {value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
