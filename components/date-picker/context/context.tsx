import { createContext, Dispatch, SetStateAction } from "react";

export interface CurrentDate {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
}

export interface DatePickerContextValue {
  selectedView: string;
  setSelectedView: Dispatch<SetStateAction<string>>;
  currentDate: CurrentDate;
  setCurrentDate: Dispatch<SetStateAction<CurrentDate>>;
}

const DatePickerContext = createContext<DatePickerContextValue>({
  selectedView: "day",
  setSelectedView: () => {},
  currentDate: {
    selectedDay: new Date().getMonth(),
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
  },
  setCurrentDate: () => {},
});

export default DatePickerContext;
