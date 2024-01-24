"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface TimePickerContext {
  selectedStartTime: Date;
  setSelectedStartTime: Dispatch<SetStateAction<Date>>;
  selectedEndTime: Date;
  setSelectedEndTime: Dispatch<SetStateAction<Date>>;
}

export const TimePickerContext = createContext<TimePickerContext>({
  selectedStartTime: new Date(),
  setSelectedStartTime: () => {},
  selectedEndTime: new Date(),
  setSelectedEndTime: () => {},
});

export default function TimePickerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedStartTime, setSelectedStartTime] = useState<Date>(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState<Date>(new Date());

  return (
    <TimePickerContext.Provider
      value={{
        selectedStartTime,
        setSelectedStartTime,
        selectedEndTime,
        setSelectedEndTime,
      }}
    >
      {children}
    </TimePickerContext.Provider>
  );
}
