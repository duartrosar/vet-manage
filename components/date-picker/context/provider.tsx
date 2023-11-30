"use client";

import React, { useEffect, useState } from "react";
import DatePickerContext, {
  CurrentDate,
  DatePickerContextValue,
} from "./context";

export default function DatePickerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedView, setSelectedView] = useState<string>("day");
  const selectedDay = new Date().getDate();
  const selectedMonth = new Date().getMonth();
  const selectedYear = new Date().getFullYear();

  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    selectedDay: selectedDay,
    selectedMonth: selectedMonth,
    selectedYear: selectedYear,
  });

  return (
    <DatePickerContext.Provider
      value={{
        selectedView: selectedView,
        setSelectedView: setSelectedView,
        currentDate: currentDate,
        setCurrentDate: setCurrentDate,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
}
