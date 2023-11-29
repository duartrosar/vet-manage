import React, { Dispatch, SetStateAction } from "react";

export default function YearTile({
  year,
  selectedYear,
  setSelectedYear,
}: {
  year: number;
  selectedYear: number;
  setSelectedYear: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-cerulean-100/25 bg-cerulean-950 text-cerulean-100 text-sm hover:bg-cerulean-700 hover:cursor-pointer py-2 ${
        year === selectedYear ? "bg-cerulean-700" : ""
      }`}
      onClick={() => {
        setSelectedYear(year);
      }}
    >
      {year}
    </div>
  );
}
