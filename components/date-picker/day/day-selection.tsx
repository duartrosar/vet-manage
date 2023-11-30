import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import DayTile from "./day-tile";
import { WEEKDAYS } from "../constants";
import BlankDayTile from "./blank-day-tile";
import DatePickerContext from "../context/context";

export default function DaySelection() {
  const { currentDate } = useContext(DatePickerContext);

  // Get day of the week that is the fisrt of the month
  let date = new Date(
    `${currentDate.selectedMonth + 1}/${1}/${currentDate.selectedYear}`,
  );
  const firstOfMonth = date.getDay();

  // Get days in current month
  let days = new Date(
    currentDate.selectedYear,
    currentDate.selectedMonth + 1,
    0,
  ).getDate();

  const dayTiles: number[] = [];
  const blankTilesBefore: number[] = [];
  const blankTilesAfter: number[] = [];

  for (let i = 0; i < firstOfMonth; i++) {
    blankTilesBefore.push(0);
  }

  for (let i = 1; i <= days; i++) {
    dayTiles.push(i);
  }

  for (let i = 0; i < 42 - (days + firstOfMonth); i++) {
    blankTilesAfter.push(0);
  }

  return (
    <>
      <div className="grid grid-cols-7 w-full gap-1">
        {WEEKDAYS.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg text-cerulean-100/50 text-sm mb-2"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="h-[200px] grid grid-cols-7 w-full gap-1">
        {blankTilesBefore.map((value, index) => (
          <BlankDayTile key={index} />
        ))}
        {dayTiles.map((value, index) => (
          <DayTile day={value} key={index} />
        ))}
        {blankTilesAfter.map((value, index) => (
          <BlankDayTile key={index} />
        ))}
      </div>
    </>
  );
}
