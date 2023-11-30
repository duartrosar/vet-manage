import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import DatePickerContext from "../context/context";

export default function DayTile({ day }: { day: number }) {
  const { currentDate, setCurrentDate } = useContext(DatePickerContext);

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-cerulean-100/25 text-cerulean-100 text-sm hover:bg-cerulean-800 hover:cursor-pointer ${
        currentDate.selectedDay === day ? "bg-cerulean-800" : "bg-cerulean-950"
      }`}
      onClick={() =>
        setCurrentDate({
          selectedDay: day,
          selectedMonth: currentDate.selectedMonth,
          selectedYear: currentDate.selectedYear,
        })
      }
    >
      {day}
    </div>
  );
}
