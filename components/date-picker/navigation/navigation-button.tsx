import React, { Dispatch, SetStateAction, useContext } from "react";
import { View } from "../types";
import { MONTHS } from "../constants";
import DatePickerContext from "../context/context";

export default function NavigationButton({ viewName }: { viewName: string }) {
  const { currentDate, selectedView, setSelectedView } =
    useContext(DatePickerContext);
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
        ? currentDate.selectedDay
        : viewName === "month"
        ? MONTHS[currentDate.selectedMonth]
        : currentDate.selectedYear}
    </div>
  );
}
