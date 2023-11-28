"use client";

import React, { useState } from "react";
import DaySelection from "./day-selection";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import MonthSelection from "./month-selection";
import YearSelection from "./year-selection";

export default function DatePickerModal() {
  enum Views {
    DAY = "day",
    MONTH = "month",
    YEAR = "year",
  }
  const [selectedView, setSelectedView] = useState<Views>(Views.DAY);

  return (
    <div className="absolute left-0 -top-[293px] w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900">
      <div className="w-full px-2 pt-2">
        <div className="flex items-center justify-around py-2 text-cerulean-100 bg-cerulean-950 rounded-lg border border-cerulean-100/25 px-2">
          {/* <div className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2">
            <GrFormPrevious className="text-sm" />
          </div> */}
          <div
            className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2 text-sm"
            onClick={() => {
              setSelectedView(Views.DAY);
            }}
          >
            28
          </div>
          <div
            className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2 text-sm"
            onClick={() => {
              setSelectedView(Views.MONTH);
            }}
          >
            November
          </div>
          <div
            className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2 text-sm"
            onClick={() => {
              setSelectedView(Views.YEAR);
            }}
          >
            2023
          </div>
          {/* <div className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2">
            <GrFormNext className="text-sm" />
          </div> */}
        </div>
      </div>
      <div className="w-full p-2">
        {selectedView === Views.DAY ? (
          <DaySelection />
        ) : selectedView === Views.MONTH ? (
          <MonthSelection />
        ) : (
          <YearSelection />
        )}
      </div>
    </div>
  );
}
