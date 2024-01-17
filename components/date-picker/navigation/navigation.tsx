import React, { Dispatch, SetStateAction, useContext } from "react";
import { View } from "../types";
import NavigationButton from "./navigation-button";
import DatePickerContext from "../context/dp-context";
import { MONTHS } from "../constants";

export default function Navigation() {
  const { currentDate, selectedView, setSelectedView } =
    useContext(DatePickerContext);

  const views: View[] = [
    { name: "year", value: currentDate.selectedYear, placeholder: "yyyy" },
    { name: "month", value: currentDate.selectedMonth, placeholder: "mm" },
    { name: "day", value: currentDate.selectedDay, placeholder: "dd" },
  ];
  const day = currentDate.selectedDay;
  const month = currentDate.selectedMonth;
  const year = currentDate.selectedYear;

  return (
    <div className="flex items-center justify-around gap-1 rounded-md border border-cerulean-700/25 bg-cerulean-950 p-1 text-cerulean-100 shadow-md">
      <NavigationButton name="day" value="Day" />
      <NavigationButton name="month" value="Month" />
      <NavigationButton name="year" value="Year" />
    </div>
  );
}
