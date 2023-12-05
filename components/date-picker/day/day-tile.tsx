import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import DatePickerContext from "../context/dp-context";

export default function DayTile({
  day,
  monthOffset,
}: {
  day: number;
  monthOffset: number;
}) {
  const { currentDate, setCurrentDate, setDropdownOpen } =
    useContext(DatePickerContext);

  const handleClick = () => {
    // make sure the months wrap around
    let newMonth = currentDate.selectedMonth + monthOffset;
    let newYear = currentDate.selectedYear;

    // if the user clicked a tile from the next month and that month
    // is December, change month to January and increment the year
    // else if user click a tile from the previous year and tha month
    // is January, change month to December and decrement the year
    if (monthOffset === 1 && currentDate.selectedMonth === 11) {
      newMonth = 0;
      newYear++;
    } else if (monthOffset === -1 && currentDate.selectedMonth === 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrentDate({
      selectedDay: day,
      selectedMonth: newMonth,
      selectedYear: newYear,
    });

    setDropdownOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg text-sm hover:cursor-pointer hover:bg-cerulean-800  ${
        currentDate.selectedDay === day && monthOffset === 0
          ? "bg-cerulean-800"
          : "bg-cerulean-950"
      } ${
        monthOffset !== 0 ? "text-cerulean-500 opacity-50" : "text-cerulean-100"
      }`}
      onClick={handleClick}
    >
      {day}
    </div>
  );
}
