"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import DaySelection from "./day/day-selection";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import MonthSelection from "./month/month-selection";
import YearSelection from "./year/year-selection";
import Navigation from "./navigation/navigation";
import { View } from "./types";
import { MONTHS } from "./constants";
import DatePickerContext from "./context/context";
import { useWindowSize } from "@uidotdev/usehooks";

export const views: string[] = ["year", "month", "day"];

export default function DatePickerModal({ direction }: { direction: string }) {
  const { selectedView } = useContext(DatePickerContext);

  return (
    <div
      className={`absolute left-0 w-full min-h-[310px] rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 z-10 ${
        direction === "up" ? "-top-[293px]" : "top-20"
      }`}
    >
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
