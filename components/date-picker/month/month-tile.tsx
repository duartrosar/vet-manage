import React, { Dispatch, SetStateAction, useContext } from "react";
import { MONTHS } from "../constants";
import DatePickerContext from "../context/context";

export default function MonthTile({ month }: { month: number }) {
  const { currentDate, setCurrentDate } = useContext(DatePickerContext);
  const { selectedMonth, selectedYear } = currentDate;
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-cerulean-100/25  text-cerulean-100 text-sm hover:bg-cerulean-800 hover:cursor-pointer py-2 ${
        month === currentDate.selectedMonth
          ? "bg-cerulean-800"
          : "bg-cerulean-950"
      }`}
      onClick={() => {
        setCurrentDate({
          selectedDay: currentDate.selectedDay,
          selectedMonth: month,
          selectedYear: currentDate.selectedYear,
        });
      }}
    >
      {MONTHS[month]}
    </div>
  );
}
