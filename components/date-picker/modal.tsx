"use client";

import React, { useContext } from "react";
import DaySelection from "./day/day-selection";
import MonthSelection from "./month/month-selection";
import YearSelection from "./year/year-selection";
import Navigation from "./navigation/navigation";
import DatePickerContext from "./context/dp-context";

export default function DatePickerModal() {
  const { selectedView } = useContext(DatePickerContext);

  return (
    <div className="p-2">
      <div className="w-full">
        <Navigation />
      </div>
      <div className="w-full">
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
