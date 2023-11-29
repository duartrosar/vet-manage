import React, { Dispatch, SetStateAction, useState } from "react";
import MonthTile from "./month-tile";
import { MONTHS } from "../constants";

export default function MonthSelection({
  selectedMonth,
  setSelectedMonth,
}: {
  selectedMonth: number;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
}) {
  // const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <div className="grid grid-cols-4 w-full gap-1 h-[228px]">
      {MONTHS.map((month, index) => (
        <MonthTile
          key={index}
          month={index}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      ))}
    </div>
  );
}
