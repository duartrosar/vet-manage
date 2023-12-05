import React, { Dispatch, SetStateAction, useContext } from "react";
import { View } from "../types";
import { MONTHS } from "../constants";
import DatePickerContext from "../context/dp-context";

export default function NavigationButton({ viewName }: { viewName: string }) {
  const { currentDate, selectedView, setSelectedView } =
    useContext(DatePickerContext);
  return (
    <div
      className={`flex-1 rounded-lg px-4 py-2 text-center text-sm hover:cursor-pointer hover:bg-cerulean-800 ${
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
