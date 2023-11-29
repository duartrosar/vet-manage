"use client";

import React, { useEffect, useState } from "react";
import DaySelection from "./day/day-selection";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import MonthSelection from "./month/month-selection";
import YearSelection from "./year/year-selection";
import Navigation from "./navigation/navigation";
import { View } from "./types";
import { MONTHS } from "./constants";

export const views: string[] = ["day", "month", "year"];

export default function DatePickerModal() {
  const [selectedView, setSelectedView] = useState<string>("day");
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  return (
    <div className="absolute left-0 -top-[293px] w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900">
      <div className="w-full px-2 pt-2">
        <Navigation
          views={views}
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
      </div>
      <div className="w-full p-2">
        {selectedView === "day" ? (
          <DaySelection
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        ) : selectedView === "month" ? (
          <MonthSelection
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        ) : (
          <YearSelection
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        )}
      </div>
    </div>
  );
}
