"use client";

import React, { useState } from "react";
import DatePickerContext, { CurrentDate } from "./dp-context";

export default function DatePickerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedView, setSelectedView] = useState<string>("year");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const selectedDay = -1;
  const selectedMonth = -1;
  const selectedYear = -1;

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
        dropdownOpen: dropdownOpen,
        setDropdownOpen: setDropdownOpen,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
}
