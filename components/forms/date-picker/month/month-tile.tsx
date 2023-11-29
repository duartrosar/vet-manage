import React, { Dispatch, SetStateAction } from "react";
import { MONTHS } from "../constants";

export default function MonthTile({
  month,
  selectedMonth,
  setSelectedMonth,
}: {
  month: number;
  selectedMonth: number;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-cerulean-100/25 bg-cerulean-950 text-cerulean-100 text-sm hover:bg-cerulean-700 hover:cursor-pointer py-2 ${
        month === selectedMonth ? "bg-cerulean-700" : ""
      }`}
      onClick={() => {
        setSelectedMonth(month);
      }}
    >
      {MONTHS[month]}
    </div>
  );
}
