import React, { Dispatch, SetStateAction, useContext } from "react";
import { MONTHS } from "../constants";
import DatePickerContext from "../context/context";
import { checkLeapYear, getDays } from "../utils";

export default function MonthTile({ month }: { month: number }) {
  const { currentDate, setCurrentDate } = useContext(DatePickerContext);

  const handleClick = () => {
    // Make sure the user can't select a day that doesn't exist in the selected month
    const days = getDays(currentDate.selectedYear, month + 1);

    const newDay =
      currentDate.selectedDay > days ? days : currentDate.selectedDay;

    setCurrentDate({
      selectedDay: newDay,
      selectedMonth: month,
      selectedYear: currentDate.selectedYear,
    });
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-cerulean-100/25  text-cerulean-100 text-sm hover:bg-cerulean-800 hover:cursor-pointer py-2 ${
        month === currentDate.selectedMonth
          ? "bg-cerulean-800"
          : "bg-cerulean-950"
      }`}
      onClick={handleClick}
    >
      {MONTHS[month]}
    </div>
  );
}
