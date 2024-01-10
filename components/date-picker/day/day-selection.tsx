import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import DayTile from "./day-tile";
import { WEEKDAYS } from "../constants";
import BlankDayTile from "./blank-day-tile";
import DatePickerContext from "../context/dp-context";
import { getDays } from "../utils";

export default function DaySelection() {
  const { currentDate } = useContext(DatePickerContext);

  // Get day of the week that is the fisrt of the month
  let date = new Date(
    `${currentDate.selectedMonth + 1}/${1}/${currentDate.selectedYear}`,
  );
  const firstOfMonth = date.getDay();

  // We pass selectedMonth + 1 because months are 0 indexed
  let days = getDays(currentDate.selectedYear, currentDate.selectedMonth + 1);

  // Get how many the days the previous and next month have
  let prevDays = getDays(currentDate.selectedYear, currentDate.selectedMonth);
  let nextDays = getDays(
    currentDate.selectedYear,
    currentDate.selectedMonth + 2,
  );

  const dayTiles: number[] = [];
  const prevMonthDayTiles: number[] = [];
  const nextMonthDayTiles: number[] = [];

  for (let i = firstOfMonth - 1; i >= 0; i--) {
    let day = prevDays - i;
    prevMonthDayTiles.push(day);
  }

  for (let i = 1; i <= days; i++) {
    dayTiles.push(i);
  }

  for (let i = 0; i < 42 - (days + firstOfMonth); i++) {
    nextMonthDayTiles.push(i + 1);
  }

  return (
    <div className="pt-2">
      <div className="grid w-full grid-cols-7 gap-1">
        {WEEKDAYS.map((value, index) => (
          <div
            key={index}
            className="mb-2 flex items-center justify-center rounded-lg text-xs text-cerulean-100/50"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-7 gap-1">
        {prevMonthDayTiles.map((day, index) => (
          <DayTile key={index} day={day} monthOffset={-1} />
        ))}
        {dayTiles.map((day, index) => (
          <DayTile day={day} key={index} monthOffset={0} />
        ))}
        {nextMonthDayTiles.map((day, index) => (
          <DayTile key={index} day={day} monthOffset={1} />
        ))}
      </div>
    </div>
  );
}
