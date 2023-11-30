"use client";

import React, { useContext, useEffect, useState } from "react";
import DaySelection from "./day/day-selection";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import MonthSelection from "./month/month-selection";
import YearSelection from "./year/year-selection";
import Navigation from "./navigation/navigation";
import { View } from "./types";
import { MONTHS } from "./constants";
import DatePickerContext from "./context/context";

export const views: string[] = ["day", "month", "year"];

export default function DatePickerModal() {
  const { selectedView } = useContext(DatePickerContext);

  return (
    <div className="absolute left-0 -top-[293px] w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900">
      <div className="w-full px-2 pt-2">
        <Navigation views={views} />
      </div>
      <div className="w-full p-2">
        {selectedView === "day" ? (
          <DaySelection />
        ) : selectedView === "month" ? (
          <MonthSelection />
        ) : (
          <YearSelection />
        )}
      </div>
    </div>
  );
}
