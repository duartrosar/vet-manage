import React from "react";
import { CurrentDate } from "./context/dp-context";

interface DateDisplayerProps {
  currentDate: CurrentDate;
}

export default function CurrentDateDisplayer({
  currentDate,
}: DateDisplayerProps) {
  // if selectedDay is less than 0, display placeholder
  // otherwise if, selectedDay is less than 10 add a "0" behind
  // otherwise, display selectedDay
  const day =
    currentDate.selectedDay < 0
      ? "dd"
      : currentDate.selectedDay < 10
        ? "0" + currentDate.selectedDay
        : currentDate.selectedDay;

  // if selectedMonth is less than 0, display placeholder
  // otherwise if, selectedMonth is less than 9 add a "0" behind
  // otherwise, display selectedMonth
  const month =
    currentDate.selectedMonth < 0
      ? "mm"
      : currentDate.selectedMonth < 9
        ? `0` + (currentDate.selectedMonth + 1)
        : currentDate.selectedMonth + 1;

  // if selectedYear is less than 0, display placeholder
  // otherwise, display selectedYear
  const year = currentDate.selectedYear < 0 ? "yyyy" : currentDate.selectedYear;

  return <>{`${day}/${month}/${year}`}</>;
}
