import React, { Dispatch, SetStateAction } from "react";
import { View } from "../types";
import NavigationButton from "./navigation-button";

export default function Navigation({
  views,
  selectedDay,
  selectedMonth,
  selectedYear,
  selectedView,
  setSelectedView,
}: {
  views: string[];
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  selectedView: string;
  setSelectedView: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center justify-around py-2 text-cerulean-100 bg-cerulean-950 rounded-lg border border-cerulean-100/25 px-2 gap-2">
      {/* <div className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2">
    <GrFormPrevious className="text-sm" />
  </div> */}
      {views.map((view, index) => (
        <NavigationButton
          key={index}
          viewName={view}
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
      ))}
      {/* <div className="rounded-lg hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2">
    <GrFormNext className="text-sm" />
  </div> */}
    </div>
  );
}
