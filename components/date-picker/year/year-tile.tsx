import React, { Dispatch, SetStateAction, useContext } from "react";
import DatePickerContext from "../context/context";

export default function YearTile({ year }: { year: number }) {
  const { currentDate, setCurrentDate } = useContext(DatePickerContext);
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-cerulean-100/25  text-cerulean-100 text-sm hover:bg-cerulean-800 hover:cursor-pointer py-2 ${
        year === currentDate.selectedYear
          ? "bg-cerulean-800"
          : "bg-cerulean-950"
      }`}
      onClick={() => {
        setCurrentDate({
          selectedDay: currentDate.selectedDay,
          selectedMonth: currentDate.selectedMonth,
          selectedYear: year,
        });
      }}
    >
      {year}
    </div>
  );
}
