import React, { Dispatch, SetStateAction, useContext } from "react";
import { MONTHS } from "../constants";
import DatePickerContext from "../context/dp-context";
import { checkLeapYear, getDays } from "../utils";

export default function MonthTile({ month }: { month: number }) {
  const { currentDate, setCurrentDate, setSelectedView } =
    useContext(DatePickerContext);

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

    setSelectedView("day");
  };

  return (
    <div
      className={`flex items-center justify-center rounded py-4 text-sm text-cerulean-100 transition duration-75 hover:cursor-pointer hover:bg-cerulean-800 ${
        month === currentDate?.selectedMonth
          ? "bg-cerulean-800"
          : "bg-cerulean-950/75"
      }`}
      onClick={handleClick}
    >
      {MONTHS[month]}
    </div>
  );
}
