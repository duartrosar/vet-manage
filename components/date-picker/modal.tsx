"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import DaySelection from "./day/day-selection";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import MonthSelection from "./month/month-selection";
import YearSelection from "./year/year-selection";
import Navigation from "./navigation/navigation";
import { View } from "./types";
import { MONTHS } from "./constants";
import DatePickerContext from "./context/dp-context";
import { useWindowSize } from "@uidotdev/usehooks";

export default function DatePickerModal({ direction }: { direction: string }) {
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
