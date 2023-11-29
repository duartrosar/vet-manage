import React, { Dispatch, SetStateAction } from "react";
import { View } from "../types";
import { MONTHS } from "../constants";

export default function NavigationButton({
  viewName,
  selectedDay,
  selectedMonth,
  selectedYear,
  selectedView,
  setSelectedView,
}: {
  viewName: string;
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  selectedView: string;
  setSelectedView: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      className={`rounded-lg flex-1 text-center hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2 text-sm ${
        viewName === selectedView ? "bg-cerulean-800" : ""
      }`}
      onClick={() => {
        setSelectedView(viewName);
      }}
    >
      {viewName === "day"
        ? selectedDay
        : viewName === "month"
        ? MONTHS[selectedMonth]
        : selectedYear}
    </div>
  );
}
