import React, { Dispatch, SetStateAction, useContext } from "react";
import DatePickerContext from "../context/dp-context";
import { checkLeapYear, getDays } from "../utils";

export default function YearTile({ year }: { year: number }) {
  const { currentDate, setCurrentDate, setSelectedView } =
    useContext(DatePickerContext);

  const handleClick = () => {
    // Check if year is a leap year
    const isLeapyear = checkLeapYear(year);
    let newDay;
    // Make sure the user can't select a day that doesn't exist in the selected month
    if (!isLeapyear && currentDate.selectedMonth === 1) {
      const days = getDays(year, currentDate.selectedMonth + 1);
      newDay = currentDate.selectedDay > days ? days : currentDate.selectedDay;
    } else {
      newDay = currentDate.selectedDay;
    }

    setCurrentDate({
      selectedDay: newDay,
      selectedMonth: currentDate.selectedMonth,
      selectedYear: year,
    });

    setSelectedView("month");
  };

  return (
    <div
      className={`flex items-center justify-center rounded py-4 text-sm text-cerulean-100 transition duration-75 hover:cursor-pointer hover:bg-cerulean-800 ${
        year === currentDate?.selectedYear
          ? "bg-cerulean-800"
          : "bg-cerulean-950/75"
      }`}
      onClick={handleClick}
    >
      {year}
    </div>
  );
}
